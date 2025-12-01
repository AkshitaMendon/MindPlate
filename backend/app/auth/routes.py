from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.auth.utils import hash_password, verify_password, create_access_token
from datetime import datetime, timedelta
from app.utils.email_utils import send_reset_email
import random
# router = APIRouter(
#     prefix="/auth",
#     tags=["Auth"]
# )
router = APIRouter(tags=["Auth"])

# -------------------
# SIGNUP
# -------------------
@router.post("/signup", response_model=schemas.TokenResponse)
def signup(user: schemas.UserSignup, db: Session = Depends(get_db)):

    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = hash_password(user.password)
    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"user_id": new_user.id})

    return {
        "access_token": token,
        "token_type": "bearer",
        "has_profile": False,
        # "name":new_user.name,
        # "email":new_user.email
    }


# -------------------
# LOGIN
# -------------------
@router.post("/login", response_model=schemas.TokenResponse)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    found = db.query(models.User).filter(models.User.email == user.email).first()
    if not found:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, found.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"user_id": found.id})

    # Check if profile exists
    existing_profile = db.query(models.Profile).filter(
        models.Profile.user_id == found.id
    ).first() 
    has_profile=existing_profile is not None

    return {
        "access_token": token,
        "token_type": "bearer",
        "has_profile": has_profile,
    }

def generate_otp():
    return str(random.randint(100000, 999999))


@router.post("/forgot-password")
def forgot_password(data: schemas.ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Email not registered")

    otp = generate_otp()
    user.reset_otp = otp
    user.otp_expiry = datetime.utcnow() + timedelta(minutes=10)
    db.commit()

    send_reset_email(user.email, otp)

    return {"message": "OTP sent to email"}


@router.post("/verify-otp")
def verify_otp(data: schemas.VerifyOtpRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Email not found")

    if user.reset_otp != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    if datetime.utcnow() > user.otp_expiry:
        raise HTTPException(status_code=400, detail="OTP expired")

    return {"message": "OTP verified"}


@router.post("/reset-password")
def reset_password(data: schemas.ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Email not found")

    hashed = hash_password(data.new_password)
    user.password = hashed
    user.reset_otp = None
    user.otp_expiry = None

    db.commit()

    return {"message": "Password updated successfully"}