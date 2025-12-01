# from sqlalchemy import Column, Integer, String
# from .database import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String(100), nullable=False)
#     email = Column(String(150), unique=True, index=True, nullable=False)
#     password = Column(String(200), nullable=False)

from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    reset_otp = Column(String, nullable=True)
    otp_expiry = Column(DateTime, nullable=True)


    # NEW - one-to-one relationship
    profile = relationship("Profile", back_populates="user", uselist=False)
    meal_plan = relationship("MealPlan", back_populates="user", uselist=False)

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    age = Column(Integer)
    height = Column(Float)
    weight = Column(Float)
    gender = Column(String(20))
    bmi = Column(Float)   # <-- ADD THIS LINE
    bmi_category = Column(String(50))
    mental_health_focus = Column(String(100))
    origin = Column(String(100))
    residence = Column(String(100))






# class Profile(Base):
#     __tablename__ = "profiles"

#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

#     # add your profile fields from earlier
#     age = Column(Integer, nullable=True)
#     height = Column(Float, nullable=True)
#     weight = Column(Float, nullable=True)
#     gender = Column(String(20), nullable=True)
#     activity_level = Column(String(50), nullable=True)
#     diet_type = Column(String(50), nullable=True)
#     allergies = Column(String(300), nullable=True)

    # NEW - relationship back to the User
    user = relationship("User", back_populates="profile")
class MealPlan(Base):
    __tablename__ = "meal_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    breakfast = Column(Text, nullable=False)
    lunch = Column(Text, nullable=False)
    dinner = Column(Text, nullable=False)

    user = relationship("User", back_populates="meal_plan")
