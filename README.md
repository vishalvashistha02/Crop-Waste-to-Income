# AgriWasteX - AI Crop Waste Marketplace

Full-stack platform for farmers to sell crop waste, predict prices with AI, and earn green rewards.  
**Single URL Deployment** — Frontend, Backend, and ML models run as one service.

---

## Quick Start (Local Development)

### Prerequisites
- **Node.js** >= 18
- **Python** >= 3.8 with `pip`

### 1. Install Python ML Dependencies
```bash
cd ml-service
pip install -r requirements.txt
```

### 2. Train the Price Model (first time only)
```bash
cd ml-service
python train_price_model.py
```

### 3. Install & Build Everything
```bash
# From project root:
npm run build
```
This installs frontend deps and builds the React production bundle into `frontend/dist/`.

### 4. Install Backend Dependencies
```bash
cd backend
npm install
```

### 5. Start the Server
```bash
# From project root:
npm start
```

Open **http://localhost:5000** — React UI + API + ML predictions all from one URL! 🎉

---

## Architecture

```
User Browser
    ↓
http://localhost:5000  (single URL)
    ↓
Express Server (backend/server.js)
    ├── Static Files → frontend/dist/ (React SPA)
    ├── /api/* → Express routes (data APIs)
    └── /api/predict, /api/price-prediction-ml, etc.
            ↓
        Python child_process → ml-service/cli_runner.py
            ↓
        ML Models (scikit-learn, numpy)
```

**Before**: 3 separate servers (React :5173, Express :5000, FastAPI :8000)  
**After**: 1 server serving everything from port 5000

---

## API Endpoints

### Data APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/listings` | All crop waste listings |
| POST | `/api/listings` | Create a new listing |
| GET | `/api/buyers` | Buyer marketplace |
| GET | `/api/centers` | Processing centers |
| POST | `/api/scan` | Basic waste scan |
| GET | `/api/shared-pickup` | Shared pickup groups |
| GET | `/api/impact` | Platform impact stats |
| GET | `/api/loan-score` | Loan eligibility |
| GET | `/api/rewards` | Green rewards |
| GET | `/api/price-prediction` | Simple price prediction |
| GET | `/api/gis-alerts` | Satellite/GIS alerts |

### ML-Powered APIs (Python Integration)
| Method | Endpoint | Description | ML Model |
|--------|----------|-------------|----------|
| POST | `/api/predict` | AI waste type detection | Image Predictor |
| POST | `/api/price-prediction-ml` | ML price prediction | Random Forest Regressor |
| POST | `/api/shared-pickup-ml` | Pickup clustering | K-Means Clustering |
| POST | `/api/green-score` | Green score calculation | Decision Tree |
| POST | `/api/impact-ml` | Environmental impact | Impact Calculator |

---

## Features
- **AI Price Prediction** — Real Random Forest Regressor model trained on synthetic crop waste data
- **AI Crop Waste Scanner** — Image-based waste type detection
- **Shared Pickup System** — K-Means clustering for optimized logistics
- **Green Rewards Program** — Points, levels, and redemption
- **Farmer Dashboard** — Listing management and analytics
- **Impact Dashboard** — Government & NGO environmental metrics
- **Instant Loan Eligibility / Green Score** — ML-powered scoring
- **Cooperative Selling** — Group listings for better prices
- **Satellite + GIS Monitoring** — Pollution hotspot alerts
- **Voice Assistant** — Hindi voice input demo

---

## Deploy on Render / Railway

### Render (Recommended)
1. Push to GitHub
2. Create a **Web Service** on Render
3. Settings:
   - **Build Command**: `cd ml-service && pip install -r requirements.txt && cd .. && npm run build && cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Environment Variables**:
     - `PORT` = `10000` (Render assigns this)
     - `NODE_ENV` = `production`
     - `PYTHON_CMD` = `python3`

### Railway
1. Push to GitHub
2. Create a new project from repo
3. Settings:
   - **Build Command**: `cd ml-service && pip install -r requirements.txt && cd .. && npm run build && cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Variables**: Same as Render

### Environment Variables
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `DATABASE_URL` | - | Database connection string |
| `MODEL_PATH` | `../ml-service/models` | Path to ML model files |
| `PYTHON_CMD` | `python` | Python executable name |
| `NODE_ENV` | - | Set to `production` for deployment |

---

## ML Model Details
- **Algorithm**: Random Forest Regressor (scikit-learn Pipeline)
- **Features**: wasteType, quantityKg, qualityGrade, location, season, demandLevel
- **Encoding**: OneHotEncoder via ColumnTransformer
- **Dataset**: 300+ synthetic rows in `ml-service/data/crop_waste_price_data.csv`
- **Output**: `ml-service/models/price_model.pkl`

---

## Project Structure
```
agriwastex/
├── package.json          # Root scripts: build, start
├── frontend/
│   ├── src/main.jsx      # React SPA
│   ├── src/style.css     # Styles
│   ├── dist/             # Production build (served by Express)
│   └── vite.config.js
├── backend/
│   ├── server.js         # Express server (API + static + ML bridge)
│   ├── .env              # Environment variables
│   └── package.json
└── ml-service/
    ├── cli_runner.py     # CLI bridge for Node.js integration
    ├── train_price_model.py
    ├── models/price_model.pkl
    ├── data/crop_waste_price_data.csv
    └── utils/
        ├── price_predictor.py
        ├── image_predictor.py
        ├── pickup_clustering.py
        ├── green_score.py
        └── impact_calculator.py
```
