# AgriWasteX - AI Crop Waste Marketplace

Full-stack platform for farmers to sell crop waste, predict prices with AI, and earn green rewards.

## Run ML Service (Price Prediction API)
```bash
cd ml-service
pip install -r requirements.txt
python train_price_model.py
uvicorn main:app --reload --port 8000
```
ML API: http://localhost:8000

### ML Endpoints
- `POST /ml/predict-price` — Random Forest price prediction
- `POST /ml/detect-waste` — AI waste type detection
- `POST /ml/shared-pickup` — Shared pickup clustering
- `POST /ml/green-score` — Green score calculation
- `POST /ml/impact` — Environmental impact estimation

## Run Backend
```bash
cd backend
npm install
npm run dev
```
Backend: http://localhost:5000

## Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

## Features Included
- **AI Price Prediction** — Real Random Forest Regressor model trained on synthetic crop waste data
- AI Crop Waste Scanner demo
- Shared Pickup System
- Pollution Saved Meter
- Satellite + GIS Monitoring mock
- Instant Loan Eligibility / Green Score
- Green Rewards Program
- Cooperative Selling
- Waste-to-Product Recommendation
- Voice Assistant demo
- Waste Processing Centers
- Government & NGO Dashboard

## ML Model Details
- **Algorithm**: Random Forest Regressor (scikit-learn Pipeline)
- **Features**: wasteType, quantityKg, qualityGrade, location, season, demandLevel
- **Encoding**: OneHotEncoder via ColumnTransformer
- **Dataset**: 300+ synthetic rows in `ml-service/data/crop_waste_price_data.csv`
- **Output**: `ml-service/models/price_model.pkl`
