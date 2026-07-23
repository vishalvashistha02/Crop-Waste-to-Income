import pandas as pd
import numpy as np
import joblib
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = r"C:\Users\hp\Downloads\AgriWasteX_Price_Prediction_Dataset_5000.xlsx"
MODEL_DIR = os.path.join(BASE_DIR, "models")
os.makedirs(MODEL_DIR, exist_ok=True)

MODEL_PATH = os.path.join(MODEL_DIR, "price_prediction_model.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "encoders.pkl")

print("1. Loading dataset...")
try:
    df = pd.read_excel(DATA_PATH)
except Exception as e:
    print(f"Error loading dataset: {e}")
    exit(1)

print("Columns in dataset:", df.columns.tolist())

print("\n2. Validating dataset...")
missing_values = df.isnull().sum()
if missing_values.sum() > 0:
    print("Missing values found:")
    print(missing_values[missing_values > 0])
    df = df.dropna()
else:
    print("No missing values found.")

print("\n3. Converting Date column...")
if 'Date' in df.columns:
    df['Date'] = pd.to_datetime(df['Date'])
    df['Year'] = df['Date'].dt.year
    df['Month'] = df['Date'].dt.month
    df['Day'] = df['Date'].dt.day
    df.drop('Date', axis=1, inplace=True)
else:
    print("Date column not found! Available columns:", df.columns.tolist())

print("\n4. Encoding categorical columns...")
categorical_cols = df.select_dtypes(include=['object']).columns.tolist()
encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    encoders[col] = le

print("Categorical columns encoded:", categorical_cols)

# We want to predict Price_per_KG or similar. Let's assume the target column is 'Price_per_KG' or 'Price'
target_col = 'Price_per_KG'
if target_col not in df.columns:
    # check for other names
    possible_targets = [c for c in df.columns if 'price' in c.lower()]
    if possible_targets:
        target_col = possible_targets[0]
        print(f"Target column '{target_col}' selected.")
    else:
        print("Could not find a price column to predict!")
        exit(1)

X = df.drop(columns=[target_col])
y = df[target_col]

print("\n5. Splitting dataset...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"Train size: {len(X_train)}, Test size: {len(X_test)}")

print("\n6. Training RandomForestRegressor...")
model = RandomForestRegressor(n_estimators=100, max_depth=15, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

print("\n7. Evaluating model...")
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print(f"MAE:  {mae:.4f}")
print(f"RMSE: {rmse:.4f}")
print(f"R²:   {r2:.4f}")

print("\n8. Feature Importance...")
feature_importances = pd.DataFrame({'Feature': X.columns, 'Importance': model.feature_importances_})
feature_importances = feature_importances.sort_values(by='Importance', ascending=False)
print(feature_importances.head(10))

print("\n9 & 10. Saving model and encoders...")
joblib.dump(model, MODEL_PATH)
joblib.dump(encoders, ENCODER_PATH)
joblib.dump(X.columns.tolist(), os.path.join(MODEL_DIR, "features.pkl"))
print(f"Saved model to {MODEL_PATH}")
print(f"Saved encoders to {ENCODER_PATH}")
print("Training Complete!")
