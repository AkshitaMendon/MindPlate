from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.model_loader import load_model
from app.inference import generate_mealplan

# NEW IMPORTS 👇
from app.database import Base, engine
from app.auth.routes import router as auth_router
from app.profile.routes import router as profile_router
from app.mealplan.routes import router as mealplan_router



# ---------------------------------------
# FASTAPI APP
# ---------------------------------------
app = FastAPI(
    title="MindPlate - Backend API",
    version="1.0.0"
)

# ---------------------------------------
# CORS (Allow frontend Expo to connect)
# ---------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------
# DATABASE SETUP (Creates tables)
# ---------------------------------------
Base.metadata.create_all(bind=engine)


# ---------------------------------------
# AUTH ROUTES
# ---------------------------------------
app.include_router(auth_router, prefix="/auth")

# ---------------------------------------
# PROFILE ROUTES
# ---------------------------------------
app.include_router(profile_router)

app.include_router(mealplan_router)


# ---------------------------------------
# MEAL PLAN MODEL LOADING
# ---------------------------------------
# model, tokenizer = load_model()


# ---------------------------------------
# ROUTES
# ---------------------------------------
@app.get("/")
async def root():
    return {"message": "MindPlate API is running 🚀"}


# @app.post("/generate_mealplan")
# async def generate(data: dict):
#     try:
#         result = generate_mealplan(model, tokenizer, data)
#         return {"meal_plan": result}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate_mealplan")
async def generate(data: dict):
    try:
        result = generate_mealplan(data)
        return {"meal_plan": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
