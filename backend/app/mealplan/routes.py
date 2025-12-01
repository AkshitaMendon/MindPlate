# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app.database import get_db
# from app.auth.dependencies import get_current_user
# from app.mealplan.models import MealPlan
# from app.schemas import MealPlanData

# router = APIRouter(prefix="/mealplan", tags=["Meal Plans"])


# @router.post("/save")
# def save_mealplan(data: MealPlanData, db: Session = Depends(get_db), user=Depends(get_current_user)):

#     existing = db.query(MealPlan).filter(MealPlan.user_id == user.id).first()

#     if existing:
#         existing.breakfast = data.breakfast
#         existing.lunch = data.lunch
#         existing.dinner = data.dinner
#     else:
#         new_plan = MealPlan(
#             user_id=user.id,
#             breakfast=data.breakfast,
#             lunch=data.lunch,
#             dinner=data.dinner
#         )
#         db.add(new_plan)

#     db.commit()
#     return {"message": "Meal plan saved successfully"}


# @router.get("/me")
# def get_user_mealplan(db: Session = Depends(get_db), user=Depends(get_current_user)):
#     plan = db.query(MealPlan).filter(MealPlan.user_id == user.id).first()
#     if not plan:
#         return None
#     return plan

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth.utils import get_current_user
from app.models import MealPlan
from app.schemas import MealPlanSave
import json

router = APIRouter(prefix="/mealplan", tags=["Meal Plans"])


@router.post("/save")
def save_mealplan(payload: MealPlanSave, db: Session = Depends(get_db)):
    user_id = payload.user_id
    plan = payload.meal_plan

    breakfast = json.dumps(plan["breakfast"])
    lunch = json.dumps(plan["lunch"])
    dinner = json.dumps(plan["dinner"])

    existing = db.query(MealPlan).filter(MealPlan.user_id == user_id).first()

    if existing:
        existing.breakfast = breakfast
        existing.lunch = lunch
        existing.dinner = dinner
    else:
        new_plan = MealPlan(
            user_id=user_id,
            breakfast=breakfast,
            lunch=lunch,
            dinner=dinner
        )
        db.add(new_plan)

    db.commit()
    # return {"message": "saved"}
    return {
    "breakfast": json.loads(existing.breakfast if existing else breakfast),
    "lunch": json.loads(existing.lunch if existing else lunch),
    "dinner": json.loads(existing.dinner if existing else dinner)
}

@router.get("/{user_id}")
def get_mealplan(user_id: int, db: Session = Depends(get_db)):
    record = db.query(MealPlan).filter(MealPlan.user_id == user_id).first()
    if not record:
        return None

    return {
        "breakfast": json.loads(record.breakfast),
        "lunch": json.loads(record.lunch),
        "dinner": json.loads(record.dinner)
    }


@router.get("/me")
def get_user_mealplan(db: Session = Depends(get_db), user=Depends(get_current_user)):
    plan = db.query(MealPlan).filter(MealPlan.user_id == user.id).first()
    if not plan:
        return None
    return plan
