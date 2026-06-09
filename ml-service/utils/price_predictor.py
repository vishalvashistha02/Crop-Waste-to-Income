"""
AgriWasteX – Price Predictor Utility
Loads the trained RandomForest pipeline and returns price predictions.
"""

import os
import joblib
import pandas as pd

BASE_DIR   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "price_model.pkl")

# Cache the model in memory after first load
_model = None


def _load_model():
    """Load (and cache) the trained price model."""
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                "Price model not found. "
                "Please run `python train_price_model.py` first."
            )
        _model = joblib.load(MODEL_PATH)
    return _model


def predict_crop_waste_price(input_data: dict) -> dict:
    """
    Predict the price per kg for a crop waste listing.

    Parameters
    ----------
    input_data : dict
        Keys: wasteType, quantityKg, qualityGrade, location, season, demandLevel

    Returns
    -------
    dict with keys:
        predictedPricePerKg, estimatedIncome, modelUsed, confidenceNote
    """
    model = _load_model()

    # Build a single-row DataFrame matching training feature order
    features = pd.DataFrame([{
        "wasteType":    input_data.get("wasteType", "Paddy Straw"),
        "qualityGrade": input_data.get("qualityGrade", "B"),
        "location":     input_data.get("location", "Mathura"),
        "season":       input_data.get("season", "Winter"),
        "demandLevel":  input_data.get("demandLevel", "Medium"),
        "quantityKg":   float(input_data.get("quantityKg", 100)),
    }])

    predicted_price  = round(float(model.predict(features)[0]), 2)
    quantity_kg      = float(input_data.get("quantityKg", 100))
    estimated_income = round(predicted_price * quantity_kg, 2)

    return {
        "predictedPricePerKg": predicted_price,
        "estimatedIncome":     estimated_income,
        "modelUsed":           "Random Forest Regressor",
        "confidenceNote":      (
            "Prediction based on trained synthetic crop waste price dataset"
        ),
    }
