"""
AgriWasteX ML Backend – FastAPI Service
Start: uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from utils.image_predictor  import predict_waste_image
from predict import predict_price
from utils.pickup_clustering import cluster_pickups
from utils.green_score       import calculate_green_score
from utils.impact_calculator import calculate_impact

app = FastAPI(title="AgriWasteX ML Backend", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Request / Response Models ────────────────────────────────────────────────

class PriceInput(BaseModel):
    Crop: str = None
    Waste_Type: str = None
    Weight: float = None
    Moisture: float = None
    Quality_Grade: str = None
    State: str = None
    District: str = None
    Mandi: str = None
    Season: str = None
    Demand_Level: str = None
    Supply_Level: str = None
    Distance_to_Buyer: float = None
    Storage_Days: float = None
    Weather: str = None
    Transportation_Cost: float = None
    Processing_Type: str = None
    Nearby_Processing_Plant: str = None

class FarmerLocation(BaseModel):
    name:       str
    village:    str
    latitude:   float
    longitude:  float
    quantityKg: float

class PickupInput(BaseModel):
    farmers:          List[FarmerLocation]
    truckCapacityKg:  float

class GreenScoreInput(BaseModel):
    farmerName:        str
    totalWasteSoldKg:  float
    completedPickups:  int
    cancelledPickups:  int
    co2SavedKg:        float
    rewardPoints:      float

class ImpactInput(BaseModel):
    wasteKg:       float
    numberOfSales: int

# ─── Endpoints ────────────────────────────────────────────────────────────────

@app.post("/ml/detect-waste")
async def detect_waste(file: UploadFile = File(...)):
    return predict_waste_image(file.filename)


@app.post("/ml/predict-price")
def get_price(input_data: PriceInput):
    """
    Predict crop waste price per kg using a trained Random Forest model.

    Returns predictedPricePerKg, estimatedIncome, modelUsed, confidenceNote.
    If the model file is missing, returns a helpful error message.
    """
    try:
        input_dict = input_data.dict(by_alias=True)
        # Convert keys back to the expected ones with spaces
        formatted_input = {k.replace('_', ' '): v for k, v in input_dict.items()}
        
        predicted_price = predict_price(formatted_input)
        weight = formatted_input.get("Weight") or 100
        estimated_income = round(predicted_price * weight, 2)
        
        return {
            "predictedPricePerKg": round(predicted_price, 2),
            "estimatedIncome": estimated_income,
            "modelUsed": "Random Forest Regressor (New Dataset)",
            "confidenceNote": "High accuracy model trained on real-time mandi prices"
        }
    except FileNotFoundError as e:
        raise HTTPException(
            status_code=503,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction error: {str(e)}",
        )


@app.post("/ml/shared-pickup")
def get_shared_pickup(input_data: PickupInput):
    return cluster_pickups(input_data.dict())


@app.post("/ml/green-score")
def get_green_score(input_data: GreenScoreInput):
    return calculate_green_score(input_data.dict())


@app.post("/ml/impact")
def get_impact(input_data: ImpactInput):
    return calculate_impact(input_data.dict())


@app.get("/")
def root():
    return {
        "service":  "AgriWasteX ML Backend",
        "version":  "2.0.0",
        "status":   "running",
        "endpoints": [
            "POST /ml/predict-price",
            "POST /ml/detect-waste",
            "POST /ml/shared-pickup",
            "POST /ml/green-score",
            "POST /ml/impact",
        ],
    }
