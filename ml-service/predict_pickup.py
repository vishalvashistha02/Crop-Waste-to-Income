import pandas as pd
import numpy as np
import joblib
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models')

MODEL_PATH = os.path.join(MODEL_DIR, 'pickup_cluster_model.pkl')
SCALER_PATH = os.path.join(MODEL_DIR, 'pickup_scaler.pkl')

def load_models():
    if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
        raise FileNotFoundError("Models not found. Please run train_pickup_model.py first.")
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    return model, scaler

def predict_cluster(farmer_data):
    """
    Predicts the cluster for a given farmer.
    farmer_data should be a dictionary with keys: Latitude, Longitude, Waste_Weight_KG
    """
    model, scaler = load_models()
    
    # Convert to DataFrame to ensure correct shape and feature names
    df = pd.DataFrame([farmer_data])
    
    # Ensure correct column order
    features = ['Latitude', 'Longitude', 'Waste_Weight_KG']
    
    for feature in features:
        if feature not in df.columns:
            raise ValueError(f"Missing required feature: {feature}")
            
    X = df[features]
    
    # Scale features
    X_scaled = scaler.transform(X)
    
    # Predict cluster
    cluster_id = model.predict(X_scaled)[0]
    
    return cluster_id

if __name__ == "__main__":
    try:
        # Test the model with 5 different farmer records
        test_farmers = [
            {"Farmer_Name": "Test Farmer 1", "Latitude": 27.5, "Longitude": 77.7, "Waste_Weight_KG": 500},
            {"Farmer_Name": "Test Farmer 2", "Latitude": 28.9, "Longitude": 77.7, "Waste_Weight_KG": 1500},
            {"Farmer_Name": "Test Farmer 3", "Latitude": 26.8, "Longitude": 80.9, "Waste_Weight_KG": 200},
            {"Farmer_Name": "Test Farmer 4", "Latitude": 25.4, "Longitude": 82.9, "Waste_Weight_KG": 1200},
            {"Farmer_Name": "Test Farmer 5", "Latitude": 29.9, "Longitude": 77.5, "Waste_Weight_KG": 800}
        ]
        
        print("Testing predict_pickup.py with 5 sample farmers:\n")
        
        for farmer in test_farmers:
            input_data = {
                "Latitude": farmer["Latitude"],
                "Longitude": farmer["Longitude"],
                "Waste_Weight_KG": farmer["Waste_Weight_KG"]
            }
            cluster_id = predict_cluster(input_data)
            print(f"Farmer: {farmer['Farmer_Name']:15} | Lat: {farmer['Latitude']:5.1f} | Lon: {farmer['Longitude']:5.1f} | Weight: {farmer['Waste_Weight_KG']:4} KG -> Cluster ID: {cluster_id}")
            
    except Exception as e:
        print(f"Error during prediction: {e}")
        sys.exit(1)
