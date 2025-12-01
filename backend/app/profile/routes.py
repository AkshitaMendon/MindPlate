# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app.database import SessionLocal
# from app import models, schemas

# router = APIRouter(prefix="/profile", tags=["Profile"])

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# @router.post("/create", response_model=schemas.ProfileResponse)
# def create_profile(profile: schemas.ProfileCreate, db: Session = Depends(get_db)):

#     existing = db.query(models.Profile).filter(models.Profile.user_id == profile.user_id).first()
#     if existing:
#         raise HTTPException(status_code=400, detail="Profile already exists")

#     new_profile = models.Profile(**profile.dict())
#     db.add(new_profile)
#     db.commit()
#     db.refresh(new_profile)
#     return new_profile


# @router.get("/{user_id}", response_model=schemas.ProfileResponse)
# def get_profile(user_id: int, db: Session = Depends(get_db)):
#     profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
#     if not profile:
#         raise HTTPException(status_code=404, detail="Profile not found")
#     return profile


# @router.put("/update/{user_id}", response_model=schemas.ProfileResponse)
# def update_profile(user_id: int, update_data: schemas.ProfileBase, db: Session = Depends(get_db)):
#     profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
#     if not profile:
#         raise HTTPException(status_code=404, detail="Profile not found")

#     for key, value in update_data.dict().items():
#         setattr(profile, key, value)

#     db.commit()
#     db.refresh(profile)
#     return profile

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas
from app.auth.utils import get_current_user   # ✅ NEW

router = APIRouter(prefix="/profile", tags=["Profile"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create", response_model=schemas.ProfileResponse)
def create_profile(
    profile: schemas.ProfileBase,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)   # ✅ GET USER FROM TOKEN
):
    user_id = current_user["user_id"]                # ✅ USER ID FROM TOKEN

    existing = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Profile already exists")

    new_profile = models.Profile(
        user_id=user_id,
        **profile.dict()
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile


@router.get("/me", response_model=schemas.ProfileResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["user_id"]

    profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.put("/update", response_model=schemas.ProfileResponse)
def update_profile(
    update_data: schemas.ProfileBase,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["user_id"]

    profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    for key, value in update_data.dict().items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile
