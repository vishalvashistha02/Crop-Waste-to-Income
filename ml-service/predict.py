import joblib
import pandas as pd
import numpy as np
import os
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")
MODEL_PATH = os.path.join(MODEL_DIR, "price_prediction_model.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "encoders.pkl")
FEATURES_PATH = os.path.join(MODEL_DIR, "features.pkl")

# Lazy loading of models to improve performance
_model = None
_encoders = None
_features = None

def _load_artifacts():
    global _model, _encoders, _features
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError("Model not found. Please run train_model.py first.")
        _model = joblib.load(MODEL_PATH)
        _encoders = joblib.load(ENCODER_PATH)
        _features = joblib.load(FEATURES_PATH)

def predict_price(input_data: dict) -> float:
    """
    input_data should contain:
    - Crop
    - Waste Type
    - Weight
    - Moisture
    - Quality Grade
    - State
    - District
    - Mandi
    - Season
    - Demand Level
    - Supply Level
    - Distance to Buyer
    - Storage Days
    - Weather
    - Transportation Cost
    - Processing Type
    - Nearby Processing Plant
    """
    _load_artifacts()
    
    # Mapping user friendly names to dataset column names
    mapping = {
        "Crop": "Crop",
        "Waste Type": "Waste_Type",
        "Weight": "Weight_KG",
        "Moisture": "Moisture_Percentage",
        "Quality Grade": "Quality_Grade",
        "State": "State",
        "District": "District",
        "Mandi": "Mandi",
        "Season": "Season",
        "Demand Level": "Demand_Level",
        "Supply Level": "Supply_Level",
        "Distance to Buyer": "Distance_to_Buyer_KM",
        "Storage Days": "Storage_Days",
        "Weather": "Weather",
        "Transportation Cost": "Transportation_Cost",
        "Processing Type": "Processing_Type",
        "Nearby Processing Plant": "Nearby_Processing_Plant"
    }
    
    # Prepare DataFrame for single row
    row = {}
    for user_key, df_key in mapping.items():
        val = input_data.get(user_key)
        if val is None and df_key not in _encoders:
            val = 0.0 # Default for numerical
        elif val is None and df_key in _encoders:
            # Pick the most common or first class
            val = _encoders[df_key].classes_[0]
        row[df_key] = val
        
    # Add Year, Month, Day defaults (today)
    now = datetime.now()
    row['Year'] = now.year
    row['Month'] = now.month
    row['Day'] = now.day
    
    df = pd.DataFrame([row])
    
    # Encoding
    for col, encoder in _encoders.items():
        if col in df.columns:
            # Handle unseen labels by assigning the first class or a known label
            val = df[col].astype(str).values[0]
            if val not in encoder.classes_:
                val = encoder.classes_[0]
            df[col] = encoder.transform([val])[0]
            
    # Ensure column order matches training
    df = df[_features]
    
    predicted_price = _model.predict(df)[0]
    return float(predicted_price)

if __name__ == "__main__":
    sample = {
        "Crop": "Wheat",
        "Waste Type": "Wheat Straw",
        "Weight": 500,
        "Moisture": 12,
        "Quality Grade": "A",
        "State": "Punjab",
        "District": "Ludhiana",
        "Mandi": "Mandi A",
        "Season": "Rabi",
        "Demand Level": "High",
        "Supply Level": "Low",
        "Distance to Buyer": 50,
        "Storage Days": 5,
        "Weather": "Clear",
        "Transportation Cost": 1500,
        "Processing Type": "Baling",
        "Nearby Processing Plant": "Yes"
    }
    print("Predicted Price:", predict_price(sample))
