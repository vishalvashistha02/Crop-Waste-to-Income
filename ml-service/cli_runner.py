"""
AgriWasteX – CLI Runner for Node.js Integration
Usage: python cli_runner.py <operation> '<json_payload>'

Operations:
  predict_price    – Random Forest price prediction
  detect_waste     – AI waste type detection (mock)
  shared_pickup    – K-Means pickup clustering
  green_score      – Green score calculation
  impact           – Environmental impact estimation
"""

import sys
import json
import os

# Ensure ml-service root is on the path so "utils" package resolves
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from utils.image_predictor   import predict_waste_image
from predict   import predict_price
from utils.pickup_clustering import cluster_pickups
from utils.green_score       import calculate_green_score
from utils.impact_calculator import calculate_impact


def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Usage: python cli_runner.py <operation> '<json_payload>'"}))
        sys.exit(1)

    operation = sys.argv[1]
    try:
        payload = json.loads(sys.argv[2])
    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"Invalid JSON payload: {str(e)}"}))
        sys.exit(1)

    try:
        if operation == "predict_price":
            # Formatting keys if necessary
            formatted_input = {k.replace('_', ' '): v for k, v in payload.items()}
            predicted_price = predict_price(formatted_input)
            weight = formatted_input.get("Weight", 100)
            result = {
                "predictedPricePerKg": round(predicted_price, 2),
                "estimatedIncome": round(predicted_price * weight, 2),
                "modelUsed": "Random Forest Regressor (New Dataset)",
                "confidenceNote": "High accuracy model trained on real-time mandi prices"
            }
        elif operation == "detect_waste":
            filename = payload.get("filename", "unknown.jpg")
            result = predict_waste_image(filename)
        elif operation == "shared_pickup":
            result = cluster_pickups(payload)
        elif operation == "green_score":
            result = calculate_green_score(payload)
        elif operation == "impact":
            result = calculate_impact(payload)
        else:
            result = {"error": f"Unknown operation: {operation}"}

        print(json.dumps(result))
    except FileNotFoundError as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": f"ML error: {str(e)}"}))
        sys.exit(1)


if __name__ == "__main__":
    main()
