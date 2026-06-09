import os

# import tensorflow as tf
# MODEL_PATH = os.path.join(os.path.dirname(__file__), '../models/mobilenet_crop_model.keras')
# try:
#     model = tf.keras.models.load_model(MODEL_PATH)
# except:
#     model = None

def predict_waste_image(filename: str):
    """
    Replace mock logic with trained model here.
    Example:
    1. Preprocess image to 224x224
    2. preds = model.predict(image_array)
    """
    # Mock fallback
    waste_type = "Paddy Straw"
    if "wheat" in filename.lower():
        waste_type = "Wheat Straw"
    elif "sugar" in filename.lower():
        waste_type = "Sugarcane Waste"

    return {
        "wasteType": waste_type,
        "confidence": 94.5,
        "moistureLevel": "Low",
        "qualityGrade": "A",
        "estimatedWeightKg": 450,
        "suggestedUse": "Biofuel / Compost"
    }
