const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve the built React frontend
const DIST = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(DIST));

app.use(cors());

const http = require('http');
app.use('/ml', (req, res) => {
  const proxyReq = http.request({
    host: 'localhost',
    port: 8000,
    path: (req.url === '/' || req.url === '') ? '/' : `/ml${req.url}`,
    method: req.method,
    headers: {
      ...req.headers,
      host: 'localhost:8000'
    }
  }, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });
  
  req.pipe(proxyReq);
  
  proxyReq.on('error', (err) => {
    res.status(500).json({ error: 'Failed to connect to ML service: ' + err.message });
  });
});

app.use(express.json());

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

app.get('/api/shared-pickup', (req, res) => {
  const mathura = listings.filter(x => x.location.toLowerCase().includes('mathura'));
  const total = mathura.reduce((sum, x) => sum + Number(x.quantity || 0), 0);
  res.json({ group: mathura, totalQuantity: `${total} kg`, truckRequired: total >= 500 ? 'Mini Truck' : 'Small Pickup', estimatedCostSaved: '₹1,800' });
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

// Catch-all: serve index.html for any non-API route (React SPA)
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, () => console.log(`\n🌿 AgriWasteX running at http://localhost:${PORT}\n`));
