from pydantic import BaseModel, EmailStr, constr

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    has_profile: bool

class ProfileBase(BaseModel):
    age: int
    gender: str
    height: float
    weight: float
    bmi: float
    bmi_category: str
    mental_health_focus: str
    origin: str              
    residence: str  


class ProfileCreate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class MealPlanSave(BaseModel):
    user_id: int
    meal_plan: dict

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class VerifyOtpRequest(BaseModel):
    email: str
    otp: str

class ResetPasswordRequest(BaseModel):
    email: str
    new_password: str
