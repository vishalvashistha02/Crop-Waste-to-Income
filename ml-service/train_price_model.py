"""
AgriWasteX - Crop Waste Price Prediction Model Training Script
Run: python train_price_model.py
"""

import os
import pandas as pd
import numpy as np
import joblib

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, r2_score

# ─── Paths ────────────────────────────────────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
DATA_PATH  = os.path.join(BASE_DIR, "data", "crop_waste_price_data.csv")
MODEL_DIR  = os.path.join(BASE_DIR, "models")
MODEL_PATH = os.path.join(MODEL_DIR, "price_model.pkl")

os.makedirs(MODEL_DIR, exist_ok=True)

# ─── Load Dataset ─────────────────────────────────────────────────────────────
print("[1/5] Loading dataset...")
df = pd.read_csv(DATA_PATH)
print(f"      Rows: {len(df)}  |  Columns: {list(df.columns)}")

# ─── Features & Target ────────────────────────────────────────────────────────
CATEGORICAL = ["wasteType", "qualityGrade", "location", "season", "demandLevel"]
NUMERICAL   = ["quantityKg"]
TARGET      = "pricePerKg"

X = df[CATEGORICAL + NUMERICAL]
y = df[TARGET]

# ─── Train / Test Split ───────────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"      Train: {len(X_train)}  |  Test: {len(X_test)}")

# ─── Preprocessing Pipeline ───────────────────────────────────────────────────
preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore", sparse_output=False),
            CATEGORICAL,
        )
    ],
    remainder="passthrough",   # passes numerical columns through unchanged
)

# ─── Full Pipeline ────────────────────────────────────────────────────────────
pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "regressor",
            RandomForestRegressor(
                n_estimators=200,
                max_depth=10,
                min_samples_split=4,
                min_samples_leaf=2,
                random_state=42,
                n_jobs=-1,
            ),
        ),
    ]
)

# ─── Train ────────────────────────────────────────────────────────────────────
print("\n[2/5] Training Random Forest Regressor...")
pipeline.fit(X_train, y_train)
print("      Training complete!")

# ─── Evaluate ─────────────────────────────────────────────────────────────────
y_pred = pipeline.predict(X_test)
mae    = mean_absolute_error(y_test, y_pred)
r2     = r2_score(y_test, y_pred)

print(f"\n[3/5] Model Evaluation")
print(f"      MAE  : {mae:.4f}")
print(f"      R2   : {r2:.4f}")

# ─── Save Model ───────────────────────────────────────────────────────────────
joblib.dump(pipeline, MODEL_PATH)
print(f"\n[4/5] Model saved -> {MODEL_PATH}")

# ─── Quick Sanity Check ───────────────────────────────────────────────────────
print("\n[5/5] Sanity check prediction:")
sample = pd.DataFrame([{
    "wasteType":    "Paddy Straw",
    "quantityKg":   500,
    "qualityGrade": "A",
    "location":     "Mathura",
    "season":       "Winter",
    "demandLevel":  "High",
}])
price = pipeline.predict(sample)[0]
print(f"      Paddy Straw | 500 kg | Grade A | Mathura | Winter | High demand")
print(f"      Predicted price  : Rs {price:.2f}/kg")
print(f"      Estimated income : Rs {price * 500:,.2f}")
print("\nDone! You can now start the API server:")
print("   uvicorn main:app --reload --port 8000")
