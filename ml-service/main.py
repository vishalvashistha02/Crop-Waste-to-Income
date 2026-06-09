"""
AgriWasteX ML Backend – FastAPI Service
Start: uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from utils.image_predictor  import predict_waste_image
from utils.price_predictor  import predict_crop_waste_price
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
    wasteType:    str
    quantityKg:   float
    qualityGrade: str
    location:     str
    season:       str
    demandLevel:  str

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
        result = predict_crop_waste_price(input_data.dict())
        return result
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
