def calculate_impact(data: dict):
    waste_kg = data.get("wasteKg", 0)
    
    co2_saved = waste_kg * 1.5
    trees_eq = co2_saved / 21
    points = waste_kg * 0.1
    carbon_credits = co2_saved / 1000
    
    return {
        "co2SavedKg": round(co2_saved, 2),
        "treesEquivalent": round(trees_eq),
        "rewardPoints": round(points),
        "carbonCredits": round(carbon_credits, 2)
    }
