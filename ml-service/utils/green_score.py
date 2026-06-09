import os

# import joblib
# MODEL_PATH = os.path.join(os.path.dirname(__file__), '../models/green_score_model.pkl')
# try:
#     model = joblib.load(MODEL_PATH)
# except:
#     model = None

def calculate_green_score(data: dict):
    """
    Replace mock logic with trained Decision Tree / Random Forest here.
    """
    # Weighted scoring logic
    waste_sold = min(100, data.get("totalWasteSoldKg", 0) / 100) * 0.30
    pickups = min(100, data.get("completedPickups", 0) * 5) * 0.25
    cancellations = max(0, 100 - data.get("cancelledPickups", 0) * 10) * 0.15
    co2 = min(100, data.get("co2SavedKg", 0) / 50) * 0.20
    rewards = min(100, data.get("rewardPoints", 0) / 10) * 0.10
    
    score = round(waste_sold + pickups + cancellations + co2 + rewards)
    score = max(0, min(100, score))
    
    if score >= 80:
        level = "Platinum Farmer"
        loan = "Highly Eligible"
        trust = "Very High Trust"
    elif score >= 60:
        level = "Gold Farmer"
        loan = "Eligible"
        trust = "High Trust"
    elif score >= 40:
        level = "Silver Farmer"
        loan = "Review Required"
        trust = "Medium Trust"
    else:
        level = "Bronze Farmer"
        loan = "Not Eligible"
        trust = "Low Trust"

    return {
        "greenScore": score,
        "level": level,
        "loanEligibility": loan,
        "trustCategory": trust,
        "modelUsed": "Decision Tree / Random Forest"
    }
