import os
import joblib
import pandas as pd
import numpy as np
import warnings

warnings.filterwarnings('ignore')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, 'models')
DATA_DIR = os.path.join(BASE_DIR, 'data')

MODEL_PATH = os.path.join(MODEL_DIR, 'pickup_cluster_model.pkl')
SCALER_PATH = os.path.join(MODEL_DIR, 'pickup_scaler.pkl')
DATASET_PATH = os.path.join(DATA_DIR, 'AgriWasteX_Shared_Pickup_Dataset_5000.csv')

_model = None
_scaler = None
_dataset = None
_dataset_clusters = None

def _load_resources():
    global _model, _scaler, _dataset, _dataset_clusters
    if _model is None:
        if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH) or not os.path.exists(DATASET_PATH):
            raise FileNotFoundError("Models or dataset not found. Please train the K-Means model first.")
        
        _model = joblib.load(MODEL_PATH)
        _scaler = joblib.load(SCALER_PATH)
        _dataset = pd.read_csv(DATASET_PATH)
        
        # Pre-calculate clusters for the dataset to speed up queries
        features = ['Latitude', 'Longitude', 'Waste_Weight_KG']
        X = _dataset[features].copy()
        
        # Handle missing values in dataset
        X.fillna(X.mean(numeric_only=True), inplace=True)
        
        X_scaled = _scaler.transform(X)
        _dataset_clusters = _model.predict(X_scaled)

def cluster_pickups(data: dict):
    """
    Accepts new farmer data and returns shared pickup details based on K-Means clustering.
    Input expected:
    {
      "farmer_name": "Ramesh",
      "village": "Raya",
      "latitude": 27.4924,
      "longitude": 77.6737,
      "waste_weight": 450,
      "crop": "Paddy"
    }
    """
    try:
        # Validate input
        lat = float(data.get("latitude"))
        lon = float(data.get("longitude"))
        weight = float(data.get("waste_weight") or data.get("Waste_Weight_KG"))
    except (TypeError, ValueError):
        raise ValueError("Invalid or missing input features (latitude, longitude, waste_weight).")

    _load_resources()

    # Create input DataFrame
    input_df = pd.DataFrame([{
        'Latitude': lat,
        'Longitude': lon,
        'Waste_Weight_KG': weight
    }])
    
    # Scale input
    input_scaled = _scaler.transform(input_df)
    
    # Predict cluster
    cluster_id = int(_model.predict(input_scaled)[0])
    
    # Find nearby farmers in the same cluster
    cluster_indices = np.where(_dataset_clusters == cluster_id)[0]
    
    nearby_farmers = len(cluster_indices) + 1 # +1 for the new farmer
    
    # Get a list of up to 5 actual farmers to display in the UI
    cluster_df = _dataset.iloc[cluster_indices]
    
    # Calculate a rough distance from the new farmer to all others in cluster (just using Euclidean for display purposes)
    cluster_df['rough_distance'] = np.sqrt(
        (cluster_df['Latitude'] - lat)**2 + (cluster_df['Longitude'] - lon)**2
    ) * 111 # rough km conversion
    
    # Sort by distance and take top 5
    closest_farmers_df = cluster_df.sort_values('rough_distance').head(5)
    
    nearby_farmer_list = []
    cluster_lats = [lat]
    cluster_lons = [lon]
    
    for _, row in closest_farmers_df.iterrows():
        nearby_farmer_list.append({
            "name": row['Farmer_Name'],
            "village": row['Village'],
            "weight": row['Waste_Weight_KG'],
            "distance_km": round(row['rough_distance'], 1),
            "lat": row['Latitude'],
            "lon": row['Longitude']
        })
        cluster_lats.append(row['Latitude'])
        cluster_lons.append(row['Longitude'])
        
    cluster_center = {
        "lat": sum(cluster_lats) / len(cluster_lats),
        "lon": sum(cluster_lons) / len(cluster_lons)
    }
    
    # Calculate total waste (dataset cluster waste + new farmer waste)
    cluster_waste = cluster_df['Waste_Weight_KG'].sum()
    total_waste = round(cluster_waste + weight, 2)
    
    # Recommended vehicle based on total waste
    if total_waste <= 500:
        recommended_vehicle = "Mini Truck"
    elif total_waste <= 1500:
        recommended_vehicle = "Truck"
    else:
        recommended_vehicle = "Large Truck"
        
    # Calculate costs and impact dynamically
    # Assuming standard rates for Indian logistics
    base_cost_per_kg = 0.6 # ₹0.6 per kg pickup cost
    estimated_pickup_cost = round(total_waste * base_cost_per_kg)
    cost_per_farmer = round(estimated_pickup_cost / nearby_farmers)
    
    # Estimate distance (heuristics: ~1.2 km between farmers on average)
    distance = f"{round(nearby_farmers * 1.2, 1)} km"
    
    # Environmental and financial impact
    co2_saved = f"{round(total_waste * 0.15)} kg"
    # Money saved by sharing pickup instead of individual transport
    individual_cost_estimate = nearby_farmers * 1500 # If they hired individually at 1500 each
    money_saved = f"₹{individual_cost_estimate - estimated_pickup_cost}"

    return {
        "cluster_id": cluster_id,
        "nearby_farmers": nearby_farmers,
        "nearby_farmer_list": nearby_farmer_list,
        "cluster_center": cluster_center,
        "total_waste": total_waste,
        "recommended_vehicle": recommended_vehicle,
        "estimated_pickup_cost": estimated_pickup_cost,
        "cost_per_farmer": cost_per_farmer,
        "distance": distance,
        "co2_saved": co2_saved,
        "money_saved": money_saved
    }

