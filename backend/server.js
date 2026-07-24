const express = require('express');
const cors = require('cors');
const path = require('path');
const { execFile } = require('child_process');
const multer = require('multer');
const fs = require('fs');
const os = require('os');

// Load .env if dotenv is available
try { require('dotenv').config(); } catch (e) { /* dotenv not installed, use defaults */ }

const app = express();
const PORT = process.env.PORT || 5000;
const PYTHON_CMD = process.env.PYTHON_CMD || 'python';
const ML_SERVICE_DIR = path.join(__dirname, '..', 'ml-service');
const CLI_RUNNER = path.join(ML_SERVICE_DIR, 'cli_runner.py');

// Multer for file uploads (AI Scanner)
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// ─── Middleware ──────────────────────────────────────────────────────────────

// Serve the built React frontend
const DIST = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(DIST));

// CORS: allow same-origin in production, allow dev origins during development
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? false  // same-origin, no CORS headers needed
    : ['http://localhost:5173', 'http://localhost:5000', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());

// ─── Helper: Run Python ML CLI ──────────────────────────────────────────────
// Uses a temp file to pass the JSON payload to Python.
// This avoids Windows shell quote-mangling when JSON is passed as a CLI argument.

function runML(operation, payload) {
  return new Promise((resolve, reject) => {
    // Write payload to a temp file
    const tmpFile = path.join(os.tmpdir(), `agriwastex_${Date.now()}_${Math.random().toString(36).slice(2)}.json`);
    try {
      fs.writeFileSync(tmpFile, JSON.stringify(payload), 'utf8');
    } catch (writeErr) {
      return reject(new Error(`Failed to write temp file: ${writeErr.message}`));
    }

    const args = [CLI_RUNNER, operation, '--file', tmpFile];
    execFile(PYTHON_CMD, args, { cwd: ML_SERVICE_DIR, timeout: 60000 }, (err, stdout, stderr) => {
      // Always clean up the temp file
      try { fs.unlinkSync(tmpFile); } catch (_) {}

      if (err) {
        console.error(`[ML ${operation}] Error:`, err.message);
        if (stderr) console.error(`[ML ${operation}] Stderr:`, stderr);
        return reject(new Error(stderr || err.message));
      }
      try {
        const result = JSON.parse(stdout);
        if (result.error) return reject(new Error(result.error));
        resolve(result);
      } catch (parseErr) {
        console.error(`[ML ${operation}] Parse error. stdout:`, stdout);
        reject(new Error('Failed to parse ML output'));
      }
    });
  });
}

// ─── In-Memory Data ─────────────────────────────────────────────────────────

let listings = [
  { id: 1, farmer: 'Farmer A', wasteType: 'Paddy Straw', quantity: 100, location: 'Mathura', pricePerKg: 3, grade: 'A', status: 'Available' },
  { id: 2, farmer: 'Farmer B', wasteType: 'Wheat Straw', quantity: 200, location: 'Mathura', pricePerKg: 2.5, grade: 'B', status: 'Available' },
  { id: 3, farmer: 'Farmer C', wasteType: 'Sugarcane Waste', quantity: 300, location: 'Agra', pricePerKg: 2, grade: 'A', status: 'Available' }
];

const buyers = [
  { id: 1, name: 'Green Biofuel Plant', type: 'Biofuel Plant', accepts: ['Paddy Straw', 'Wheat Straw'], location: 'Mathura', rate: '₹3/kg' },
  { id: 2, name: 'Eco Compost Unit', type: 'Compost Unit', accepts: ['Sugarcane Waste', 'Cotton Waste'], location: 'Agra', rate: '₹2.5/kg' },
  { id: 3, name: 'PaperCraft Industry', type: 'Paper Industry', accepts: ['Wheat Straw', 'Cotton Waste'], location: 'Delhi NCR', rate: '₹4/kg' },
  { id: 4, name: 'Biogas Energy Center', type: 'Biogas Plant', accepts: ['Paddy Straw', 'Sugarcane Waste'], location: 'Aligarh', rate: '₹3.2/kg' }
];

const centers = [
  { id: 1, name: 'Mathura Biochar Center', process: 'Biochar', location: 'Mathura', distance: '8 km' },
  { id: 2, name: 'Agra Briquette Hub', process: 'Briquettes', location: 'Agra', distance: '32 km' },
  { id: 3, name: 'Village Compost Unit', process: 'Compost', location: 'Laxmi Nagar', distance: '5 km' }
];

// ─── Existing Data API Routes ───────────────────────────────────────────────

app.get('/api/listings', (req, res) => res.json(listings));

app.post('/api/listings', (req, res) => {
  const item = { id: Date.now(), status: 'Available', ...req.body };
  listings.unshift(item);
  res.status(201).json(item);
});

app.get('/api/buyers', (req, res) => res.json(buyers));
app.get('/api/centers', (req, res) => res.json(centers));

app.post('/api/scan', (req, res) => {
  const wasteType = req.body.wasteType || 'Paddy Straw';
  const quantity = Number(req.body.quantity || 500);
  const price = wasteType.includes('Wheat') ? 2.5 : wasteType.includes('Cotton') ? 4 : 3;
  res.json({
    wasteType,
    moistureLevel: '14%',
    qualityGrade: quantity > 300 ? 'A' : 'B',
    estimatedWeight: `${quantity} kg`,
    expectedSellingPrice: `₹${price}/kg`,
    expectedIncome: `₹${quantity * price}`,
    recommendedProduct: wasteType.includes('Paddy') ? 'Biofuel' : wasteType.includes('Sugarcane') ? 'Ethanol/Compost' : wasteType.includes('Wheat') ? 'Packaging/Paper' : 'Paper Industry',
    carbonSaved: `${(quantity * 0.15).toFixed(1)} kg CO₂`
  });
});

// New shared-pickup endpoint that calls the Python ML Service
app.post('/api/shared-pickup', async (req, res) => {
  try {
    // Expected input: { farmer_name, village, latitude, longitude, waste_weight, crop }
    if (!req.body.latitude || !req.body.longitude || !req.body.waste_weight) {
      return res.status(400).json({ error: "Missing required fields: latitude, longitude, and waste_weight." });
    }
    const result = await runML('shared_pickup', req.body);
    res.json(result);
  } catch (err) {
    console.error("Shared Pickup ML Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/impact', (req, res) => {
  const totalWaste = listings.reduce((sum, x) => sum + Number(x.quantity || 0), 0);
  res.json({
    wasteRecycled: `${totalWaste} kg`,
    co2Saved: `${(totalWaste * 0.15).toFixed(1)} kg`,
    treesEquivalent: Math.round(totalWaste / 20),
    farmersRegistered: 128,
    incomeGenerated: `₹${listings.reduce((sum, x) => sum + Number(x.quantity || 0) * Number(x.pricePerKg || 0), 0)}`,
    pollutionHotspots: ['Mathura Rural', 'Agra Border', 'Aligarh Road']
  });
});

app.get('/api/loan-score', (req, res) => res.json({ greenScore: 86, eligibility: 'Eligible', loanAmount: '₹50,000', interestBenefit: '1.5% lower interest' }));
app.get('/api/rewards', (req, res) => res.json({ points: 1250, redeem: ['Seeds Discount', 'Fertilizer Coupon', 'Farm Equipment Voucher'] }));
app.get('/api/price-prediction', (req, res) => res.json({ currentPrice: '₹3/kg', afterTwoWeeks: '₹4.5/kg', suggestion: 'Store if safe, price may increase.' }));
app.get('/api/gis-alerts', (req, res) => res.json([{ area: 'Mathura Rural', alert: 'Possible stubble burning detected', risk: 'High' }, { area: 'Agra Border', alert: 'Smoke hotspot detected', risk: 'Medium' }]));

// ─── ML-Powered API Routes (internally calling Python) ──────────────────────

// POST /api/predict — AI Waste Detection (file upload)
app.post('/api/predict', upload.single('file'), async (req, res) => {
  try {
    const filename = req.file ? req.file.originalname : 'unknown.jpg';
    const result = await runML('detect_waste', { filename });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/price-prediction-ml — ML Price Prediction
app.post('/api/price-prediction-ml', async (req, res) => {
  try {
    const result = await runML('predict_price', req.body);
    res.json(result);
  } catch (err) {
    const status = err.message.includes('model') || err.message.includes('not found') ? 503 : 500;
    res.status(status).json({ error: err.message, detail: err.message });
  }
});

// POST /api/shared-pickup-ml — Replaced by POST /api/shared-pickup above

// POST /api/green-score — ML Green Score
app.post('/api/green-score', async (req, res) => {
  try {
    const result = await runML('green_score', req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/impact-ml — ML Impact Calculator
app.post('/api/impact-ml', async (req, res) => {
  try {
    const result = await runML('impact', req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── SPA Catch-All ──────────────────────────────────────────────────────────
// Serve index.html for any non-API route (React SPA)
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(DIST, 'index.html'));
});

// ─── Start Server ───────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`\n🌿 AgriWasteX running at http://localhost:${PORT}\n`));
