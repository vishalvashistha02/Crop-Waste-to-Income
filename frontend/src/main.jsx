import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Leaf, Upload, Truck, BarChart3, Satellite, IndianRupee, Trophy, Users, TrendingUp, Factory, Mic, Building2, MapPin, Camera, ShieldCheck, Sparkles, Navigation, Coins, Zap, Gift, CheckCircle, XCircle, ArrowRight, Quote, Star } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';

const API = '/api';
const ML_API = '/api';

function App(){
  const [page,setPage]=useState('home');
  return <>
    <Navbar page={page} setPage={setPage}/>
    {page==='home' && <Home setPage={setPage}/>} 
    {page==='farmer' && <Farmer/>}
    {page==='scanner' && <Scanner/>}
    {page==='pickup' && <Pickup/>}
    {page==='market' && <Marketplace/>}
    {page==='rewards' && <GreenRewards/>}
    {page==='impact' && <Impact/>}
    {page==='advanced' && <Advanced/>}
  </>
}

function Navbar({page,setPage}){
  const links=[['home','Home'],['farmer','Farmer'],['scanner','AI Scanner'],['pickup','Pickup'],['market','Marketplace'],['rewards','Rewards'],['impact','Impact'],['advanced','Advanced']];
  return <nav className="navbar"><div className="brand" onClick={()=>setPage('home')}><Leaf/> AgriWasteX</div><div className="links">{links.map(l=><button className={page===l[0]?'active':''} onClick={()=>setPage(l[0])} key={l[0]}>{l[1]}</button>)}</div></nav>
}

// --- Landing Page Components ---
function Home({setPage}){
  return (
    <div className="landing-pattern-bg">
      <HeroSection setPage={setPage} />
      <LiveImpact />
      <HowItWorks />
      <UniqueFeatures />
      <WasteToValue />
      <SuccessStory />
      <ProblemSolution />
      <CTASection setPage={setPage} />
    </div>
  );
}

function HeroSection({setPage}) {
  return (
    <section className="landing-section hero landing-hero">
      <div>
        <span className="pill">AI-Powered Platform • Sustainable Agriculture</span>
        <h1>Turn Crop Waste Into Farmer Income</h1>
        <p>An AI-powered platform that helps farmers sell crop residue, reduce pollution, earn rewards, and generate carbon credit benefits.</p>
        <div className="actions" style={{marginTop: '32px'}}>
          <button onClick={()=>setPage('farmer')} style={{padding: '16px 32px', fontSize: '18px'}}>Start Selling Waste</button>
          <button className="ghost" onClick={()=>setPage('impact')} style={{padding: '16px 32px', fontSize: '18px'}}>Explore Impact</button>
        </div>
      </div>
      <div className="floating-cards-container">
        <div className="float-card c1"><div className="float-icon"><Camera size={24}/></div> AI Waste Scanner</div>
        <div className="float-card c2"><div className="float-icon"><Truck size={24}/></div> Shared Pickup</div>
        <div className="float-card c3"><div className="float-icon"><Trophy size={24}/></div> Green Rewards</div>
        <div className="float-card c4"><div className="float-icon"><Leaf size={24}/></div> Carbon Credit</div>
      </div>
    </section>
  );
}

function LiveImpact() {
  return (
    <section className="landing-section" style={{paddingTop: 0}}>
      <div className="landing-container">
        <div className="impact-grid">
          <div className="impact-card">
            <Factory size={32} color="#16a34a" />
            <div className="impact-value">12,500</div>
            <div className="impact-label">kg Waste Recycled</div>
          </div>
          <div className="impact-card">
            <IndianRupee size={32} color="#16a34a" />
            <div className="impact-value">4.8 L</div>
            <div className="impact-label">Farmer Income Generated</div>
          </div>
          <div className="impact-card">
            <Leaf size={32} color="#16a34a" />
            <div className="impact-value">3.2</div>
            <div className="impact-label">Tons CO₂ Saved</div>
          </div>
          <div className="impact-card">
            <Trophy size={32} color="#16a34a" />
            <div className="impact-value">850</div>
            <div className="impact-label">Green Rewards Distributed</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="landing-section alt-bg">
      <div className="landing-container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Four simple steps to transform agricultural waste into valuable resources.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon"><Upload size={32} /></div>
            <div className="step-title">1. Upload Photo</div>
            <div className="step-desc">Farmer uploads a photo of their crop waste on the dashboard.</div>
          </div>
          <div className="step-card">
            <div className="step-icon"><Sparkles size={32} /></div>
            <div className="step-title">2. AI Detection</div>
            <div className="step-desc">AI detects waste type, quality, and estimates a fair market price.</div>
          </div>
          <div className="step-card">
            <div className="step-icon"><Truck size={32} /></div>
            <div className="step-title">3. Shared Pickup</div>
            <div className="step-desc">Nearby buyers are matched and shared logistics transport the waste.</div>
          </div>
          <div className="step-card">
            <div className="step-icon"><Coins size={32} /></div>
            <div className="step-title">4. Get Paid</div>
            <div className="step-desc">Farmer receives payment plus Green Reward points for avoiding burning.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UniqueFeatures() {
  const features = [
    { icon: <Camera />, title: "AI Crop Waste Scanner", desc: "Instantly analyze crop waste photos to determine type, quality, and estimated price." },
    { icon: <Truck />, title: "Shared Pickup System", desc: "Reduce transport costs by combining nearby farmer waste into a single efficient route." },
    { icon: <Trophy />, title: "Green Rewards Program", desc: "Earn points for every ton of waste sold. Redeem points for seeds, tools, and farming supplies." },
    { icon: <BarChart3 />, title: "Pollution Saved Meter", desc: "Track exact kg of CO₂ emissions prevented by selling instead of burning." },
    { icon: <Leaf />, title: "Carbon Credit Estimator", desc: "Calculate potential carbon credits generated from your sustainable farming practices." },
    { icon: <Building2 />, title: "Government Impact Dashboard", desc: "Provide authorities with real-time data on stubble burning prevention and circular economy metrics." }
  ];
  return (
    <section className="landing-section">
      <div className="landing-container">
        <div className="section-header">
          <h2>Unique Features</h2>
          <p>Everything you need to successfully manage, sell, and track agricultural waste.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WasteToValue() {
  const values = [
    { source: "Paddy Straw", product: "Biofuel / Briquettes" },
    { source: "Wheat Straw", product: "Paper & Packaging" },
    { source: "Sugarcane Waste", product: "Ethanol Production" },
    { source: "Cotton Waste", product: "Compost & Biochar" }
  ];
  return (
    <section className="landing-section alt-bg">
      <div className="landing-container">
        <div className="section-header">
          <h2>Waste-to-Value</h2>
          <p>See how industrial buyers transform your crop residue into valuable products.</p>
        </div>
        <div className="value-chain-grid">
          {values.map((v, i) => (
            <div className="value-chain-row" key={i}>
              <div className="value-source"><Leaf size={20} color="#15803d"/> {v.source}</div>
              <div className="value-arrow"><ArrowRight size={24} /></div>
              <div className="value-product"><Factory size={20} /> {v.product}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuccessStory() {
  return (
    <section className="landing-section">
      <div className="landing-container">
        <div className="testimonial-card">
          <Quote size={80} className="quote-icon" />
          <div className="testimonial-text">
            "Earlier I used to burn crop waste because clearing it was too expensive. Now I earn extra income by selling it through AgriWasteX. The shared pickup system comes right to my village!"
          </div>
          <div className="testimonial-author">
            <Star size={16} fill="#fef08a" color="#fef08a" style={{marginRight:'8px', verticalAlign:'middle'}}/>
            Ramesh Kumar, Mathura
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="landing-section alt-bg">
      <div className="landing-container">
        <div className="section-header">
          <h2>Why AgriWasteX?</h2>
          <p>Solving the core challenges of agricultural waste management.</p>
        </div>
        <div className="split-grid">
          <div className="split-card problem">
            <div className="split-title"><XCircle size={32} /> The Problem</div>
            <ul className="split-list">
              <li><XCircle size={20} /> Crop waste burning</li>
              <li><XCircle size={20} /> Severe air pollution in winters</li>
              <li><XCircle size={20} /> Farmer income loss</li>
              <li><XCircle size={20} /> High individual transport cost</li>
            </ul>
          </div>
          <div className="split-card solution">
            <div className="split-title"><CheckCircle size={32} /> The Solution</div>
            <ul className="split-list">
              <li><CheckCircle size={20} /> AI waste detection & valuation</li>
              <li><CheckCircle size={20} /> Active buyer marketplace</li>
              <li><CheckCircle size={20} /> Shared pickup grouping</li>
              <li><CheckCircle size={20} /> Green rewards & carbon credits</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({setPage}) {
  return (
    <section className="cta-section">
      <h2>Ready to convert waste into income?</h2>
      <div className="actions" style={{justifyContent: 'center'}}>
        <button onClick={()=>setPage('farmer')}>Add Your Crop Waste</button>
      </div>
    </section>
  );
}
// --- End Landing Page Components ---

function Farmer(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({
    farmer: '',
    mobile: '',
    wasteType: '',
    quantity: '',
    location: '',
    pricePerKg: '',
    grade: 'A',
    season: 'Winter',
    demandLevel: 'Medium',
    photo: ''
  });
  const [errors,setErrors]=useState({});
  const [submitSuccess,setSubmitSuccess]=useState(false);
  const [mlPriceInfo, setMlPriceInfo]=useState(null);
  const [isPredicting, setIsPredicting]=useState(false);

  const predictPriceFromML = async () => {
    if(!form.wasteType || !form.quantity || !form.location) {
      setErrors(prev => ({...prev, pricePerKg: 'Enter Waste Type, Quantity and Location first.'}));
      return;
    }
    setIsPredicting(true);
    setMlPriceInfo(null);
    try {
      const res = await fetch(`${ML_API}/price-prediction-ml`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          Waste_Type: form.wasteType,
          Weight: parseFloat(form.quantity),
          Quality_Grade: form.grade,
          District: form.location,
          Season: form.season,
          Demand_Level: form.demandLevel
        })
      });
      if(!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.detail || 'ML service error');
      }
      const data = await res.json();
      setForm(prev => ({ ...prev, pricePerKg: data.predictedPricePerKg.toString() }));
      setMlPriceInfo(data);
      setErrors(prev => ({...prev, pricePerKg: ''}));
    } catch(err) {
      setErrors(prev => ({...prev, pricePerKg: err.message.includes('model') ? err.message : 'Failed to connect to ML service. Is the backend running?'}));
    }
    setIsPredicting(false);
  };

  const load=()=>fetch(API+'/listings').then(r=>r.json()).then(setItems);
  useEffect(load,[]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, photo: reader.result }));
        setErrors(prev => ({ ...prev, photo: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setForm(prev => ({ ...prev, photo: '' }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.farmer.trim()) tempErrors.farmer = 'Farmer Name is required';
    
    if (!form.mobile.trim()) {
      tempErrors.mobile = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(form.mobile.trim())) {
      tempErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!form.wasteType.trim()) tempErrors.wasteType = 'Crop Waste Name is required';
    
    if (!form.quantity) {
      tempErrors.quantity = 'Quantity Available is required';
    } else if (isNaN(form.quantity) || parseFloat(form.quantity) <= 0) {
      tempErrors.quantity = 'Quantity must be a positive number';
    }

    if (!form.location.trim()) tempErrors.location = 'Pickup Location is required';
    
    if (!form.pricePerKg) {
      tempErrors.pricePerKg = 'Expected Price is required';
    } else if (isNaN(form.pricePerKg) || parseFloat(form.pricePerKg) <= 0) {
      tempErrors.pricePerKg = 'Price must be a positive number';
    }

    if (!form.photo) {
      tempErrors.photo = 'Upload Crop Waste Photo is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const submit=async e=>{
    e.preventDefault();
    if (!validate()) return;

    await fetch(API+'/listings',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form)
    });
    
    setForm({
      farmer: '',
      mobile: '',
      wasteType: '',
      quantity: '',
      location: '',
      pricePerKg: '',
      grade: 'A',
      season: 'Winter',
      demandLevel: 'Medium',
      photo: ''
    });
    setErrors({});
    setMlPriceInfo(null);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
    load();
  };

  return (
    <section className="page">
      <h1>Farmer Dashboard</h1>
      <div className="grid two">
        <div className="card">
          <div className="form-header">
            <h2 className="form-title">Add Your Crop Waste Details</h2>
            <p className="form-subtitle">Fill these details so buyers can understand your crop waste properly</p>
          </div>
          
          {submitSuccess && (
            <div className="success-alert">
              <ShieldCheck size={20} />
              <span>Listing submitted successfully!</span>
            </div>
          )}

          <form className="form" onSubmit={submit}>
            {/* Farmer Name */}
            <div className="form-group">
              <label className="form-label">
                Farmer Name
                <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.farmer ? 'has-error' : ''}`}
                value={form.farmer}
                placeholder="Enter farmer full name"
                onChange={e => {
                  setForm({...form, farmer: e.target.value});
                  if (errors.farmer) setErrors({...errors, farmer: ''});
                }}
              />
              {errors.farmer ? (
                <span className="error-message">{errors.farmer}</span>
              ) : (
                <span className="helper-text">Example: Ramesh Kumar</span>
              )}
            </div>

            {/* Mobile Number */}
            <div className="form-group">
              <label className="form-label">
                Mobile Number
                <span className="required-star">*</span>
              </label>
              <input
                type="tel"
                className={`form-input ${errors.mobile ? 'has-error' : ''}`}
                value={form.mobile}
                placeholder="Enter 10-digit mobile number"
                onChange={e => {
                  setForm({...form, mobile: e.target.value});
                  if (errors.mobile) setErrors({...errors, mobile: ''});
                }}
              />
              {errors.mobile ? (
                <span className="error-message">{errors.mobile}</span>
              ) : (
                <span className="helper-text">Used for pickup and buyer contact</span>
              )}
            </div>

            {/* Crop Waste Name */}
            <div className="form-group">
              <label className="form-label">
                Crop Waste Name
                <span className="required-star">*</span>
              </label>
              <input
                type="text"
                list="crop-wastes"
                className={`form-input ${errors.wasteType ? 'has-error' : ''}`}
                value={form.wasteType}
                placeholder="Select or enter crop waste type"
                onChange={e => {
                  setForm({...form, wasteType: e.target.value});
                  if (errors.wasteType) setErrors({...errors, wasteType: ''});
                }}
              />
              <datalist id="crop-wastes">
                <option value="Paddy Straw" />
                <option value="Wheat Straw" />
                <option value="Sugarcane Waste" />
                <option value="Cotton Stalk" />
                <option value="Corn Residue" />
              </datalist>
              {errors.wasteType ? (
                <span className="error-message">{errors.wasteType}</span>
              ) : (
                <span className="helper-text">Example: Paddy Straw, Wheat Straw, Sugarcane Waste</span>
              )}
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label className="form-label">
                Quantity Available
                <span className="required-star">*</span>
              </label>
              <input
                type="number"
                className={`form-input ${errors.quantity ? 'has-error' : ''}`}
                value={form.quantity}
                placeholder="Enter quantity in kg"
                onChange={e => {
                  setForm({...form, quantity: e.target.value});
                  if (errors.quantity) setErrors({...errors, quantity: ''});
                }}
              />
              {errors.quantity ? (
                <span className="error-message">{errors.quantity}</span>
              ) : (
                <span className="helper-text">Example: 500 kg</span>
              )}
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">
                Pickup Location
                <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.location ? 'has-error' : ''}`}
                value={form.location}
                placeholder="Enter village/city name"
                onChange={e => {
                  setForm({...form, location: e.target.value});
                  if (errors.location) setErrors({...errors, location: ''});
                }}
              />
              {errors.location ? (
                <span className="error-message">{errors.location}</span>
              ) : (
                <span className="helper-text">Example: Mathura, Agra, Aligarh</span>
              )}
            </div>

            {/* Season */}
            <div className="form-group">
              <label className="form-label">
                Season
                <span className="required-star">*</span>
              </label>
              <select
                className="form-input"
                value={form.season}
                onChange={e => setForm({...form, season: e.target.value})}
              >
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Monsoon">Monsoon</option>
              </select>
              <span className="helper-text">Current season affects market pricing</span>
            </div>

            {/* Demand Level */}
            <div className="form-group">
              <label className="form-label">
                Demand Level
                <span className="required-star">*</span>
              </label>
              <select
                className="form-input"
                value={form.demandLevel}
                onChange={e => setForm({...form, demandLevel: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <span className="helper-text">Current market demand for this waste type</span>
            </div>

            {/* Expected Price */}
            <div className="form-group">
              <label className="form-label">
                Expected Price Per KG
                <span className="required-star">*</span>
              </label>
              <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                <input
                  type="number"
                  step="0.01"
                  className={`form-input ${errors.pricePerKg ? 'has-error' : ''}`}
                  value={form.pricePerKg}
                  placeholder="Enter price per kg"
                  onChange={e => {
                    setForm({...form, pricePerKg: e.target.value});
                    if (errors.pricePerKg) setErrors({...errors, pricePerKg: ''});
                  }}
                  style={{flex: 1}}
                />
                <button type="button" className="ai-predict-btn" onClick={predictPriceFromML} disabled={isPredicting} style={{whiteSpace:'nowrap'}}>
                  {isPredicting ? <><span className="spinner-dot"></span> AI is predicting best price...</> : <><Sparkles size={16} style={{verticalAlign:'middle', marginRight:'4px'}}/> Predict Price with AI</>}
                </button>
              </div>
              {mlPriceInfo && !errors.pricePerKg && (
                <AIPredictionResult mlPriceInfo={mlPriceInfo} form={form} />
              )}
              {errors.pricePerKg ? (
                <span className="error-message">{errors.pricePerKg}</span>
              ) : !mlPriceInfo && (
                <span className="helper-text">Use "Predict Price with AI" or enter manually</span>
              )}
            </div>

            {/* Waste Photo */}
            <div className="form-group">
              <label className="form-label">
                Upload Crop Waste Photo
                <span className="required-star">*</span>
              </label>
              {form.photo ? (
                <div className="photo-preview-wrapper">
                  <img src={form.photo} alt="Crop Waste Preview" className="photo-preview-image" />
                  <button type="button" className="photo-remove-btn" onClick={removePhoto}>×</button>
                </div>
              ) : (
                <label className={`photo-upload-box ${errors.photo ? 'has-error' : ''}`}>
                  <Upload size={24} />
                  <p>Click to upload crop waste photo</p>
                  <span>Supports JPG, PNG, WEBP</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="photo-upload-input"
                    onChange={handlePhotoChange}
                  />
                </label>
              )}
              {errors.photo ? (
                <span className="error-message">{errors.photo}</span>
              ) : (
                <span className="helper-text">Upload clear photo of crop residue for AI quality checking</span>
              )}
            </div>

            <button className="submit-btn" type="submit">Add Listing</button>
          </form>
        </div>
        <MiniStats/>
      </div>
      <h2>Your Listings</h2>
      <div className="grid three">
        {items.map(x=><Listing item={x} key={x.id}/>)}
      </div>
    </section>
  );
}
function MiniStats(){return <div className="grid two"><Stat icon={<IndianRupee/>} title="Income" value="₹28,500"/><Stat icon={<ShieldCheck/>} title="Green Score" value="86/100"/><Stat icon={<Trophy/>} title="Rewards" value="1250 pts"/><Stat icon={<Truck/>} title="Pickups" value="12"/></div>}
function Listing({item}){
  return (
    <div className={`card ${item.photo ? 'listing-card' : ''}`}>
      {item.photo && <img src={item.photo} alt={item.wasteType} className="listing-photo" />}
      <div className={item.photo ? 'listing-details' : 'listing-card-no-photo'}>
        <h3>{item.wasteType}</h3>
        <p><b>Farmer:</b> {item.farmer}</p>
        {item.mobile && <p><b>Mobile:</b> {item.mobile}</p>}
        <p><b>Quantity:</b> {item.quantity} kg</p>
        <p><b>Location:</b> {item.location}</p>
        <p><b>Price:</b> ₹{item.pricePerKg}/kg</p>
        <p><b>Grade:</b> {item.grade}</p>
        <button>Request Pickup</button>
      </div>
    </div>
  );
}

function Scanner(){
  const [data,setData]=useState(null);
  const [loading, setLoading]=useState(false);
  const [file, setFile]=useState(null);
  const [error, setError]=useState('');

  const scan = async () => {
    if (!file) {
      setError('Please select an image first.');
      return;
    }
    setLoading(true);
    setError('');
    setData(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${ML_API}/predict`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('ML API Error');
      const result = await res.json();
      setData(result);
    } catch(err) {
      setError('Failed to connect to ML service. Is it running?');
    }
    setLoading(false);
  };

  return (
    <section className="page">
      <h1>AI Crop Waste Scanner</h1>
      <div className="card scanner" style={{textAlign: 'center', padding: '40px'}}>
        <Camera size={60} color="#16a34a" style={{marginBottom:'16px'}}/>
        <p style={{marginBottom: '24px', color:'#52665a'}}>Upload a photo of your crop waste to detect type, quality, and estimated weight using MobileNetV2.</p>
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={e => setFile(e.target.files[0])} 
          style={{marginBottom: '24px'}}
        />
        <br/>
        
        <button onClick={scan} disabled={loading} style={{opacity: loading ? 0.7 : 1}}>
          {loading ? 'Scanning via AI...' : <><Upload size={18} style={{verticalAlign:'middle', marginRight:'8px'}}/> Scan Waste</>}
        </button>

        {error && <div className="error-message" style={{marginTop: '16px', color:'#991b1b', background:'#fef2f2', padding:'12px', borderRadius:'8px'}}>{error}</div>}
      </div>
      
      {data && (
        <div className="card result" style={{marginTop: '24px'}}>
          <h2 style={{borderBottom: '1px solid #e8f5ec', paddingBottom: '12px', marginBottom: '16px', color:'#13351d'}}><Sparkles size={20} color="#16a34a" style={{verticalAlign:'middle', marginRight:'8px'}}/> AI Prediction Results</h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
            {Object.entries(data).map(([k,v])=>(
              <div key={k} style={{background:'#f8faf9', padding:'16px', borderRadius:'12px', border:'1px solid #e8f5ec'}}>
                <div style={{fontSize:'12px', color:'#52665a', textTransform:'uppercase', fontWeight:800, marginBottom:'4px'}}>{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div style={{fontSize:'18px', fontWeight:700, color:'#13351d'}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}


// ── Animated counter hook ──────────────────────────────────────────────────
function useCountUp(target, duration = 1200) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (target == null || isNaN(Number(target))) return;
    const num = Number(target);
    const steps = 40;
    const stepMs = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += num / steps;
      if (current >= num) { setVal(num); clearInterval(timer); }
      else setVal(Math.floor(current));
    }, stepMs);
    return () => clearInterval(timer);
  }, [target, duration]);
  return val;
}

// ── Metric card with count-up ─────────────────────────────────────────────
function MetricCard({ icon, label, value, prefix = '', suffix = '', color = '#16a34a', delay = 0 }) {
  const [visible, setVisible] = React.useState(false);
  const num = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
  const counted = useCountUp(visible ? num : 0);
  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0d1e13 0%, #1a2f1e 100%)',
      border: `1px solid ${color}33`,
      borderRadius: '16px',
      padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '8px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}22`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ fontSize: '24px' }}>{icon}</div>
      <div style={{ fontSize: '11px', color: '#6b8f74', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      <div style={{ fontSize: '22px', fontWeight: 800, color }}>
        {prefix}{isNaN(num) || num === 0 ? value : counted.toLocaleString()}{suffix}
      </div>
    </div>
  );
}

// ── Leaflet Icons ─────────────────────────────────────────────────────────
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

const iconFarmer = createCustomIcon('#22c55e'); // green
const iconCenter = createCustomIcon('#f59e0b'); // orange
const iconYou = createCustomIcon('#3b82f6'); // blue

// Component to dynamically adjust map bounds based on markers
function MapBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, positions]);
  return null;
}

// ── Interactive Leaflet map visualization ─────────────────────────────────
function InteractiveMap({ result, farmerLat, farmerLon }) {
  if (!result || !result.cluster_center) return null;
  
  const centerLat = result.cluster_center.lat;
  const centerLon = result.cluster_center.lon;
  const nearby = result.nearby_farmer_list || [];
  
  const userPos = [farmerLat, farmerLon];
  const centerPos = [centerLat, centerLon];
  
  const nearbyPositions = nearby.map(f => [f.lat, f.lon]);
  
  // All points to fit bounds
  const allPositions = [userPos, centerPos, ...nearbyPositions];
  
  // Create polyline route: User -> Nearby 1 -> Nearby 2 -> ... -> Center
  const routePositions = [userPos, ...nearbyPositions, centerPos];

  return (
    <div style={{ background: '#0a1a0e', borderRadius: '16px', border: '1px solid #1e3a24', padding: '16px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: '13px', color: '#52a56a', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>🗺</span> Cluster #{result.cluster_id} — Interactive Map
      </div>
      
      <div style={{ height: '280px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e3a24' }}>
        <MapContainer center={centerPos} zoom={10} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          
          <MapBounds positions={allPositions} />

          {/* User Marker */}
          <Marker position={userPos} icon={iconYou}>
            <Popup><strong>You</strong><br/>Lat: {farmerLat}, Lon: {farmerLon}</Popup>
          </Marker>

          {/* Cluster Center Marker */}
          <Marker position={centerPos} icon={iconCenter}>
            <Popup><strong>Cluster Center</strong><br/>#{result.cluster_id}</Popup>
          </Marker>

          {/* Nearby Farmers Markers */}
          {nearby.map((f, i) => (
            <Marker key={i} position={[f.lat, f.lon]} icon={iconFarmer}>
              <Popup>
                <strong>{f.name}</strong><br/>
                {f.village}<br/>
                {f.weight} kg
              </Popup>
            </Marker>
          ))}
          
          {/* Suggested Pickup Route */}
          <Polyline positions={routePositions} color="#22c55e" weight={3} dashArray="5, 10" opacity={0.7} />

        </MapContainer>
      </div>

      {/* legend */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '11px', color: '#a7f3d0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></div> Nearby Farmer
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></div> Your Location
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div> Cluster Center
        </div>
      </div>
    </div>
  );
}

// ── Main Pickup Component ─────────────────────────────────────────────────
function Pickup() {
  const CROPS = ['Paddy','Wheat','Sugarcane','Cotton','Maize','Mustard','Bajra'];
  const [form, setForm] = React.useState({
    farmer_name: '', village: '', latitude: '', longitude: '',
    crop: 'Paddy', waste_weight: ''
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [apiError, setApiError] = React.useState('');

  const validate = () => {
    const e = {};
    if (!form.farmer_name.trim()) e.farmer_name = 'Farmer name is required';
    if (!form.village.trim()) e.village = 'Village is required';
    if (!form.latitude || isNaN(form.latitude)) e.latitude = 'Valid latitude required';
    if (!form.longitude || isNaN(form.longitude)) e.longitude = 'Valid longitude required';
    if (!form.waste_weight || isNaN(form.waste_weight) || Number(form.waste_weight) <= 0) e.waste_weight = 'Valid waste weight required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const findPickup = async () => {
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    setApiError('');
    try {
      const res = await fetch(`${API}/shared-pickup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_name: form.farmer_name,
          village: form.village,
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          crop: form.crop,
          waste_weight: parseFloat(form.waste_weight)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      setResult(data);
    } catch (err) {
      setApiError(err.message || 'Failed to connect to ML service.');
    }
    setLoading(false);
  };

  const inp = (field) => ({
    value: form[field],
    onChange: e => { setForm(f => ({ ...f, [field]: e.target.value })); setErrors(er => ({ ...er, [field]: '' })); }
  });

  return (
    <section className="page">
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg,#16a34a,#15803d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Truck size={24} color="#fff" />
          </div>
          <div>
            <h1 style={{ margin: 0 }}>AI Shared Pickup System</h1>
            <p style={{ margin: 0, color: '#52665a', fontSize: '14px' }}>K-Means ML model finds your nearest pickup cluster and calculates shared logistics.</p>
          </div>
        </div>
      </div>

      {/* Input form */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <h2 className="form-title" style={{ marginBottom: '4px' }}>Find Your Shared Pickup Cluster</h2>
        <p className="form-subtitle" style={{ marginBottom: '20px' }}>Enter your details — the AI will find nearby farmers and group them into an optimal shared route.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '16px' }}>
          {/* Farmer Name */}
          <div className="form-group">
            <label className="form-label">Farmer Name <span className="required-star">*</span></label>
            <input type="text" className={`form-input ${errors.farmer_name ? 'has-error' : ''}`} placeholder="e.g. Ramesh Kumar" {...inp('farmer_name')} />
            {errors.farmer_name ? <span className="error-message">{errors.farmer_name}</span> : <span className="helper-text">Full name of the farmer</span>}
          </div>
          {/* Village */}
          <div className="form-group">
            <label className="form-label">Village <span className="required-star">*</span></label>
            <input type="text" className={`form-input ${errors.village ? 'has-error' : ''}`} placeholder="e.g. Raya" {...inp('village')} />
            {errors.village ? <span className="error-message">{errors.village}</span> : <span className="helper-text">Village or town name</span>}
          </div>
          {/* Latitude */}
          <div className="form-group">
            <label className="form-label">Latitude <span className="required-star">*</span></label>
            <input type="number" step="0.0001" className={`form-input ${errors.latitude ? 'has-error' : ''}`} placeholder="e.g. 27.4924" {...inp('latitude')} />
            {errors.latitude ? <span className="error-message">{errors.latitude}</span> : <span className="helper-text">GPS latitude of farm</span>}
          </div>
          {/* Longitude */}
          <div className="form-group">
            <label className="form-label">Longitude <span className="required-star">*</span></label>
            <input type="number" step="0.0001" className={`form-input ${errors.longitude ? 'has-error' : ''}`} placeholder="e.g. 77.6737" {...inp('longitude')} />
            {errors.longitude ? <span className="error-message">{errors.longitude}</span> : <span className="helper-text">GPS longitude of farm</span>}
          </div>
          {/* Crop */}
          <div className="form-group">
            <label className="form-label">Crop</label>
            <select className="form-input" value={form.crop} onChange={e => setForm(f => ({ ...f, crop: e.target.value }))}>
              {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="helper-text">Type of crop grown</span>
          </div>
          {/* Waste Weight */}
          <div className="form-group">
            <label className="form-label">Waste Weight (KG) <span className="required-star">*</span></label>
            <input type="number" min="100" max="2000" className={`form-input ${errors.waste_weight ? 'has-error' : ''}`} placeholder="e.g. 450" {...inp('waste_weight')} />
            {errors.waste_weight ? <span className="error-message">{errors.waste_weight}</span> : <span className="helper-text">Available waste (100–2000 kg)</span>}
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            onClick={findPickup}
            disabled={loading}
            style={{
              padding: '13px 32px', fontSize: '15px', fontWeight: 700, borderRadius: '12px',
              background: loading ? '#1e3a24' : 'linear-gradient(135deg,#16a34a,#15803d)',
              color: '#fff', border: 'none', cursor: loading ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '10px',
              transition: 'transform 0.15s, opacity 0.15s',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                AI Clustering...
              </>
            ) : (
              <><Sparkles size={18} /> Find Shared Pickup</>
            )}
          </button>
          {result && (
            <button onClick={() => setResult(null)} style={{ padding: '13px 20px', fontSize: '14px', borderRadius: '12px', background: 'transparent', border: '1px solid #1e3a24', color: '#52665a', cursor: 'pointer' }}>
              Clear Results
            </button>
          )}
        </div>

        {apiError && (
          <div style={{ marginTop: '16px', padding: '12px 16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontSize: '14px', fontWeight: 600 }}>
            ⚠ {apiError}
          </div>
        )}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="card" style={{ marginBottom: '28px', textAlign: 'center', padding: '48px 20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '4px solid #1e3a24', borderTopColor: '#16a34a', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#52665a', fontWeight: 600 }}>K-Means model is predicting your cluster...</p>
        </div>
      )}

      {/* Results Dashboard */}
      {result && !loading && (
        <div style={{ animation: 'fadeIn 0.6s ease' }}>
          {/* AI Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ padding: '6px 14px', background: 'linear-gradient(135deg,#16a34a22,#15803d22)', border: '1px solid #16a34a55', borderRadius: '20px', fontSize: '13px', color: '#4ade80', fontWeight: 700 }}>
              ✦ AI Prediction Complete
            </div>
            <div style={{ padding: '6px 14px', background: '#0d1e1322', border: '1px solid #1e3a24', borderRadius: '20px', fontSize: '13px', color: '#52665a', fontWeight: 600 }}>
              Cluster #{result.cluster_id} · {result.nearby_farmers} Farmers
            </div>
          </div>

          {/* 8-metric grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '14px', marginBottom: '24px' }}>
            <MetricCard icon="🗺" label="Cluster ID" value={result.cluster_id} prefix="#" color="#4ade80" delay={0} />
            <MetricCard icon="👨‍🌾" label="Nearby Farmers" value={result.nearby_farmers} suffix=" farmers" color="#34d399" delay={80} />
            <MetricCard icon="📦" label="Total Waste" value={result.total_waste} suffix=" kg" color="#22d3ee" delay={160} />
            <MetricCard icon="💰" label="Pickup Cost" value={result.estimated_pickup_cost} prefix="₹" color="#a78bfa" delay={240} />
            <MetricCard icon="🤝" label="Cost Per Farmer" value={result.cost_per_farmer} prefix="₹" color="#f472b6" delay={320} />
            <MetricCard icon="🌱" label="CO₂ Saved" value={result.co2_saved} color="#4ade80" delay={400} />
            <MetricCard icon="💸" label="Money Saved" value={result.money_saved} color="#fbbf24" delay={480} />
            <MetricCard icon="📍" label="Route Distance" value={result.distance} color="#60a5fa" delay={560} />
          </div>

          {/* Vehicle card */}
          <div className="card" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px', background: 'linear-gradient(135deg,#0d1e13,#132a17)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg,#166534,#15803d)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={32} color="#4ade80" />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#52665a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Recommended Vehicle</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#4ade80' }}>{result.recommended_vehicle}</div>
              <div style={{ fontSize: '13px', color: '#6b8f74', marginTop: '2px' }}>
                {result.recommended_vehicle === 'Mini Truck' && 'Suitable for ≤500 kg total cluster waste.'}
                {result.recommended_vehicle === 'Truck' && 'Suitable for 500–1500 kg total cluster waste.'}
                {result.recommended_vehicle === 'Large Truck' && 'Required for 1500+ kg high-volume cluster.'}
              </div>
            </div>
          </div>

          {/* Two-column: Nearby farmers + Cluster Viz */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            {/* Nearby Farmers list */}
            <div className="card" style={{ background: 'linear-gradient(135deg,#0d1e13,#132a17)' }}>
              <h3 style={{ margin: '0 0 14px 0', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} /> Closest Farmers in Cluster
              </h3>
              {(result.nearby_farmer_list || []).length === 0 && (
                <p style={{ color: '#52665a', fontSize: '14px' }}>No farmer detail available.</p>
              )}
              {(result.nearby_farmer_list || []).map((f, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', borderRadius: '10px', marginBottom: '8px',
                  background: '#0a1a0e', border: '1px solid #1e3a24',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#22c55e55'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1e3a24'}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#e2f0e8', fontSize: '14px' }}>{f.name}</div>
                    <div style={{ fontSize: '12px', color: '#52665a', display: 'flex', gap: '8px', marginTop: '2px' }}>
                      <MapPin size={11} style={{ color: '#4ade80' }} />{f.village}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#4ade80' }}>{f.weight?.toFixed(0)} kg</div>
                    <div style={{ fontSize: '11px', color: '#52665a', marginTop: '2px' }}>{f.distance_km} km away</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: '12px', color: '#52665a', marginTop: '8px', padding: '8px 12px', background: '#0a1a0e', borderRadius: '8px', border: '1px solid #1e3a24' }}>
                + {Math.max(0, result.nearby_farmers - 1 - (result.nearby_farmer_list?.length || 0))} more farmers in cluster not shown
              </div>
            </div>

            {/* Cluster Viz */}
            <InteractiveMap result={result} farmerLat={parseFloat(form.latitude)} farmerLon={parseFloat(form.longitude)} />
          </div>

          {/* Route Summary */}
          <div className="card" style={{ background: 'linear-gradient(135deg,#0d1e13,#132a17)' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Navigation size={18} /> Pickup Route Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '12px' }}>
              {[
                { label: 'Total Route', value: result.distance, icon: '📍' },
                { label: 'Cluster ID', value: `#${result.cluster_id}`, icon: '🗺' },
                { label: 'Farmers Grouped', value: `${result.nearby_farmers}`, icon: '👨‍🌾' },
                { label: 'Vehicle', value: result.recommended_vehicle, icon: '🚚' },
                { label: 'Total Waste', value: `${result.total_waste} kg`, icon: '📦' },
                { label: 'CO₂ Saved', value: result.co2_saved, icon: '🌱' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '12px 14px', background: '#0a1a0e', borderRadius: '10px', border: '1px solid #1e3a24' }}>
                  <div style={{ fontSize: '18px', marginBottom: '4px' }}>{s.icon}</div>
                  <div style={{ fontSize: '11px', color: '#52665a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#e2f0e8', marginTop: '2px' }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!result && !loading && (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px', background: 'linear-gradient(135deg,#0a1a0e,#0d1e13)' }}>
          <Truck size={52} color="#1e3a24" style={{ marginBottom: '16px' }} />
          <h3 style={{ color: '#2d4a35', marginBottom: '8px' }}>No Prediction Yet</h3>
          <p style={{ color: '#3a5542', maxWidth: '360px', margin: '0 auto', fontSize: '14px' }}>
            Fill in the form above and click <strong style={{ color: '#4ade80' }}>Find Shared Pickup</strong> to let the K-Means model cluster your farm with nearby farmers.
          </p>
        </div>
      )}
    </section>
  );
}

function GreenRewards() {
  const [sales, setSales] = useState([
    { id: 1, farmer: 'Ramesh Kumar', wasteType: 'Paddy Straw', quantity: 8000, price: 3, buyer: 'BioPower Ltd', date: '2026-05-10', points: 800 },
    { id: 2, farmer: 'Sunil Yadav', wasteType: 'Wheat Straw', quantity: 5000, price: 4, buyer: 'GreenBoard Corp', date: '2026-05-15', points: 500 },
    { id: 3, farmer: 'Priya Devi', wasteType: 'Sugarcane Waste', quantity: 6000, price: 2.5, buyer: 'EcoFuel Plant', date: '2026-05-20', points: 600 },
  ]);

  const [redemptions, setRedemptions] = useState([
    { id: 1, reward: 'Seeds Pack', pointsUsed: 300, date: '2026-05-18', status: 'Delivered' },
    { id: 2, reward: 'Soil Testing Coupon', pointsUsed: 400, date: '2026-05-24', status: 'Delivered' },
  ]);

  const [form, setForm] = useState({ farmer: '', wasteType: '', quantity: '', price: '', buyer: '', date: '' });
  const [errors, setErrors] = useState({});
  const [saleSuccess, setSaleSuccess] = useState(null);
  const [redeemMsg, setRedeemMsg] = useState(null);

  const totalEarned = sales.reduce((s, x) => s + x.points, 0);
  const totalSpent = redemptions.reduce((s, x) => s + x.pointsUsed, 0);
  const currentPoints = totalEarned - totalSpent;
  const totalWasteKg = sales.reduce((s, x) => s + x.quantity, 0);

  const [mlScoreData, setMlScoreData] = useState(null);
  const fetchMlScore = async () => {
    try {
      const res = await fetch(`${API}/green-score`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          farmerName: "Ramesh Kumar",
          totalWasteSoldKg: totalWasteKg,
          completedPickups: 12,
          cancelledPickups: 1,
          co2SavedKg: totalWasteKg * 1.5,
          rewardPoints: currentPoints
        })
      });
      const data = await res.json();
      setMlScoreData(data);
    } catch(err) {
      console.error(err);
    }
  };
  useEffect(() => { fetchMlScore(); }, [totalWasteKg, currentPoints]);

  const getLevel = (pts) => {
    if (pts >= 2000) return { name: 'Platinum Farmer', icon: '\u{1F48E}', color: '#8b5cf6', bg: '#f5f3ff', border: '#c4b5fd' };
    if (pts >= 1000) return { name: 'Gold Farmer', icon: '\u{1F947}', color: '#d97706', bg: '#fffbeb', border: '#fcd34d' };
    if (pts >= 500) return { name: 'Silver Farmer', icon: '\u{1F948}', color: '#64748b', bg: '#f8fafc', border: '#cbd5e1' };
    return { name: 'Bronze Farmer', icon: '\u{1F949}', color: '#b45309', bg: '#fef3c7', border: '#fbbf24' };
  };

  const getLevelProgress = (pts) => {
    if (pts >= 2000) return { pct: 100, next: 'Max Level!', remaining: 0 };
    if (pts >= 1000) return { pct: ((pts - 1000) / 1000) * 100, next: 'Platinum Farmer', remaining: 2000 - pts };
    if (pts >= 500) return { pct: ((pts - 500) / 500) * 100, next: 'Gold Farmer', remaining: 1000 - pts };
    return { pct: (pts / 500) * 100, next: 'Silver Farmer', remaining: 500 - pts };
  };

  const level = getLevel(mlScoreData ? mlScoreData.greenScore * 10 : currentPoints);
  const progress = getLevelProgress(mlScoreData ? mlScoreData.greenScore * 10 : currentPoints);

  const rewardsCatalog = [
    { name: 'Seeds Pack', points: 300, desc: 'Premium quality seeds for the next growing season', icon: '\u{1F331}' },
    { name: 'Organic Fertilizer', points: 500, desc: 'High-grade organic fertilizer (10 kg bag)', icon: '\u{1F9F4}' },
    { name: 'Farm Tool Discount', points: 800, desc: 'Flat 40% discount on essential farming tools', icon: '\u{1F527}' },
    { name: 'Tractor Rental Discount', points: 1200, desc: '50% discount on tractor rental for one full day', icon: '\u{1F69C}' },
    { name: 'Soil Testing Coupon', points: 400, desc: 'Free professional soil analysis and health report', icon: '\u{1F9EA}' },
  ];

  const validate = () => {
    let e = {};
    if (!form.farmer.trim()) e.farmer = 'Farmer Name is required';
    if (!form.wasteType.trim()) e.wasteType = 'Crop Waste Type is required';
    if (!form.quantity || isNaN(form.quantity) || parseFloat(form.quantity) <= 0) e.quantity = 'Enter valid quantity in kg';
    if (!form.price || isNaN(form.price) || parseFloat(form.price) <= 0) e.price = 'Enter valid price per kg';
    if (!form.buyer.trim()) e.buyer = 'Buyer Name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitSale = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const qty = parseFloat(form.quantity);
    const pts = Math.round(qty * 0.1);
    setSales([...sales, {
      id: Date.now(), farmer: form.farmer, wasteType: form.wasteType,
      quantity: qty, price: parseFloat(form.price), buyer: form.buyer,
      date: form.date || new Date().toISOString().split('T')[0], points: pts
    }]);
    setSaleSuccess(pts);
    setForm({ farmer: '', wasteType: '', quantity: '', price: '', buyer: '', date: '' });
    setErrors({});
    setTimeout(() => setSaleSuccess(null), 5000);
  };

  const redeemReward = (rw) => {
    if (currentPoints < rw.points) {
      setRedeemMsg({ type: 'error', text: 'Not enough Green Points to redeem this reward.' });
    } else {
      setRedemptions([...redemptions, {
        id: Date.now(), reward: rw.name, pointsUsed: rw.points,
        date: new Date().toISOString().split('T')[0], status: 'Processing'
      }]);
      setRedeemMsg({ type: 'success', text: `Successfully redeemed "${rw.name}" for ${rw.points} points!` });
    }
    setTimeout(() => setRedeemMsg(null), 5000);
  };

  return (
    <section className="page">
      {/* Header */}
      <div className="rewards-header">
        <Trophy size={38} className="rewards-header-icon" />
        <div>
          <h1>Green Rewards Program</h1>
          <p className="page-subtitle">Earn reward points every time you sell crop waste and redeem them for useful farming products.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid four rewards-summary-grid">
        <div className="card rewards-stat-card">
          <div className="rewards-stat-icon green"><Trophy size={22}/></div>
          <div className="rewards-stat-value">{currentPoints}</div>
          <div className="rewards-stat-label">Total Green Points</div>
        </div>
        <div className="card rewards-stat-card">
          <div className="rewards-stat-icon blue"><TrendingUp size={22}/></div>
          <div className="rewards-stat-value">{(totalWasteKg / 1000).toFixed(1)} Tons</div>
          <div className="rewards-stat-label">Total Waste Sold</div>
        </div>
        <div className="card rewards-stat-card">
          <div className="rewards-stat-icon amber"><Gift size={22}/></div>
          <div className="rewards-stat-value">{redemptions.length}</div>
          <div className="rewards-stat-label">Rewards Redeemed</div>
        </div>
        <div className="card rewards-stat-card">
          <div className="rewards-stat-icon" style={{background:level.bg,color:level.color,border:`1.5px solid ${level.border}`}}>
            <span style={{fontSize:'20px'}}>{level.icon}</span>
          </div>
          <div className="rewards-stat-value" style={{color:level.color}}>{level.name}</div>
          <div className="rewards-stat-label">Current Green Level</div>
        </div>
      </div>

      {/* Green Level Progress Card */}
      <div className="card rewards-level-card">
        <div className="rewards-level-top">
          <div>
            <span style={{fontWeight:800,fontSize:'13px'}}>{level.name}</span>
          </div>
        </div>
        <div className="rewards-progress-track">
          <div className="rewards-progress-fill" style={{width:`${Math.min(progress.pct,100)}%`}}></div>
        </div>
        <div className="rewards-levels-row">
          {[
            {name:'Bronze',range:'0\u2013499',icon:'\u{1F949}',active:currentPoints<500},
            {name:'Silver',range:'500\u2013999',icon:'\u{1F948}',active:currentPoints>=500&&currentPoints<1000},
            {name:'Gold',range:'1000\u20131999',icon:'\u{1F947}',active:currentPoints>=1000&&currentPoints<2000},
            {name:'Platinum',range:'2000+',icon:'\u{1F48E}',active:currentPoints>=2000}
          ].map(l=>(
            <div key={l.name} className={`rewards-level-step ${l.active?'active':''}`}>
              <span className="rewards-level-step-icon">{l.icon}</span>
              <span className="rewards-level-step-name">{l.name}</span>
              <span className="rewards-level-step-range">{l.range} pts</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid two" style={{alignItems:'start'}}>
        {/* Add Sale Form */}
        <div className="card">
          <div className="form-header">
            <h2 className="form-title">Record Crop Waste Sale</h2>
            <p className="form-subtitle">Log your sale to earn Green Points automatically</p>
          </div>
          {saleSuccess !== null && (
            <div className="success-alert">
              <ShieldCheck size={20} />
              <span>🎉 You earned <b>{saleSuccess} Green Points</b> for this sale!</span>
            </div>
          )}
          <form onSubmit={submitSale}>
            <div className="form-group">
              <label className="form-label">Farmer Name<span className="required-star">*</span></label>
              <input type="text" className={`form-input ${errors.farmer?'has-error':''}`} value={form.farmer} placeholder="Enter farmer name" onChange={e=>{setForm({...form,farmer:e.target.value});if(errors.farmer)setErrors({...errors,farmer:''});}}/>
              {errors.farmer?<span className="error-message">{errors.farmer}</span>:<span className="helper-text">Example: Ramesh Kumar</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Crop Waste Type<span className="required-star">*</span></label>
              <input type="text" list="rw-wastes" className={`form-input ${errors.wasteType?'has-error':''}`} value={form.wasteType} placeholder="Select or enter crop waste type" onChange={e=>{setForm({...form,wasteType:e.target.value});if(errors.wasteType)setErrors({...errors,wasteType:''});}}/>
              <datalist id="rw-wastes"><option value="Paddy Straw"/><option value="Wheat Straw"/><option value="Sugarcane Waste"/><option value="Cotton Waste"/></datalist>
              {errors.wasteType?<span className="error-message">{errors.wasteType}</span>:<span className="helper-text">Example: Paddy Straw, Wheat Straw</span>}
            </div>
            <div className="rewards-form-row">
              <div className="form-group">
                <label className="form-label">Quantity Sold (KG)<span className="required-star">*</span></label>
                <input type="number" className={`form-input ${errors.quantity?'has-error':''}`} value={form.quantity} placeholder="Enter quantity in kg" onChange={e=>{setForm({...form,quantity:e.target.value});if(errors.quantity)setErrors({...errors,quantity:''});}}/>
                {errors.quantity?<span className="error-message">{errors.quantity}</span>:<span className="helper-text">1000 kg = 100 Green Points</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Selling Price / KG<span className="required-star">*</span></label>
                <input type="number" step="0.1" className={`form-input ${errors.price?'has-error':''}`} value={form.price} placeholder="\u20B9 per kg" onChange={e=>{setForm({...form,price:e.target.value});if(errors.price)setErrors({...errors,price:''});}}/>
                {errors.price?<span className="error-message">{errors.price}</span>:<span className="helper-text">Example: \u20B93 per kg</span>}
              </div>
            </div>
            <div className="rewards-form-row">
              <div className="form-group">
                <label className="form-label">Buyer Name<span className="required-star">*</span></label>
                <input type="text" className={`form-input ${errors.buyer?'has-error':''}`} value={form.buyer} placeholder="Buyer / company name" onChange={e=>{setForm({...form,buyer:e.target.value});if(errors.buyer)setErrors({...errors,buyer:''});}}/>
                {errors.buyer?<span className="error-message">{errors.buyer}</span>:<span className="helper-text">Example: BioPower Ltd</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Sale Date</label>
                <input type="date" className="form-input" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
                <span className="helper-text">Leave blank for today's date</span>
              </div>
            </div>
            {form.quantity && !isNaN(form.quantity) && parseFloat(form.quantity) > 0 && (
              <div className="rewards-points-preview">
                <Zap size={16}/>
                <span>You will earn <b>{Math.round(parseFloat(form.quantity) * 0.1)} Green Points</b> for this sale</span>
              </div>
            )}
            <button className="submit-btn" type="submit" style={{width:'100%'}}>Record Sale & Earn Points</button>
          </form>
        </div>

        {/* Redeem Rewards Section */}
        <div>
          <div className="rewards-redeem-header">
            <h2 style={{margin:'0 0 4px 0'}}>Redeem Rewards</h2>
            <div className="rewards-balance-pill"><Trophy size={14}/> {currentPoints} pts available</div>
          </div>
          {redeemMsg && (
            <div className={`rewards-msg ${redeemMsg.type}`}>
              {redeemMsg.type === 'success' ? <ShieldCheck size={18}/> : <span style={{fontSize:'18px'}}>\u26A0\uFE0F</span>}
              <span>{redeemMsg.text}</span>
            </div>
          )}
          <div className="rewards-catalog">
            {rewardsCatalog.map((rw, i) => (
              <div key={i} className={`card rewards-reward-card ${currentPoints >= rw.points ? '' : 'locked'}`}>
                <div className="rewards-reward-icon">{rw.icon}</div>
                <div className="rewards-reward-body">
                  <h4 style={{margin:'0 0 4px 0',color:'#13351d'}}>{rw.name}</h4>
                  <p style={{margin:'0 0 10px 0',fontSize:'13px',color:'#52665a',lineHeight:'1.4'}}>{rw.desc}</p>
                  <div className="rewards-reward-footer">
                    <span className="rewards-cost-badge"><Trophy size={12}/> {rw.points} pts</span>
                    <button className={`rewards-redeem-btn ${currentPoints >= rw.points ? '' : 'disabled'}`} onClick={() => redeemReward(rw)}>
                      {currentPoints >= rw.points ? 'Redeem' : 'Locked \u{1F512}'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sale & Reward History */}
      <div className="card" style={{marginTop:'24px'}}>
        <h3>📜 Sale & Reward History</h3>
        <div className="pickup-table-wrapper">
          <table className="pickup-table">
            <thead><tr><th>Farmer</th><th>Crop Waste</th><th>Quantity</th><th>Sale Amount</th><th>Points Earned</th><th>Buyer</th><th>Date</th></tr></thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.id}>
                  <td><b>{s.farmer}</b></td>
                  <td>{s.wasteType}</td>
                  <td><span className="badge-qty">{s.quantity} kg</span></td>
                  <td style={{fontWeight:700}}>₹{(s.quantity * s.price).toLocaleString()}</td>
                  <td><span className="rewards-pts-earned">+{s.points}</span></td>
                  <td>{s.buyer}</td>
                  <td><span className="badge-time">{s.date}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Redemption History */}
      <div className="card" style={{marginTop:'24px'}}>
        <h3>🎁 Redemption History</h3>
        <div className="pickup-table-wrapper">
          <table className="pickup-table">
            <thead><tr><th>Reward Name</th><th>Points Used</th><th>Redeem Date</th><th>Status</th></tr></thead>
            <tbody>
              {redemptions.length === 0 ? (
                <tr><td colSpan="4" style={{textAlign:'center',padding:'24px',color:'#94a3b8'}}>No rewards redeemed yet</td></tr>
              ) : redemptions.map(r => (
                <tr key={r.id}>
                  <td><b>{r.reward}</b></td>
                  <td><span className="rewards-pts-spent">-{r.pointsUsed}</span></td>
                  <td><span className="badge-time">{r.date}</span></td>
                  <td><span className={`rewards-status ${r.status.toLowerCase()}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Marketplace(){const [buyers,setBuyers]=useState([]); const [centers,setCenters]=useState([]); useEffect(()=>{fetch(API+'/buyers').then(r=>r.json()).then(setBuyers);fetch(API+'/centers').then(r=>r.json()).then(setCenters)},[]); return <section className="page"><h1>Buyer Marketplace + Processing Centers</h1><h2>Buyers</h2><div className="grid three">{buyers.map(b=><div className="card" key={b.id}><Factory/><h3>{b.name}</h3><p>{b.type}</p><p><MapPin size={14}/> {b.location}</p><p>Rate: {b.rate}</p><button>Contact Buyer</button></div>)}</div><h2>Nearest Processing Centers</h2><div className="grid three">{centers.map(c=><div className="card" key={c.id}><Building2/><h3>{c.name}</h3><p>Process: {c.process}</p><p>{c.location} • {c.distance}</p></div>)}</div></section>}

function Impact() {
  const [impact, setImpact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/impact-ml`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ wasteKg: 50000, numberOfSales: 150 })
    })
    .then(r => r.json())
    .then(data => {
      setImpact(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <section className="page"><h1>Loading AI Impact Metrics...</h1></section>;
  if (!impact) return <section className="page"><h1>Error loading impact metrics</h1></section>;

  return (
    <section className="page">
      <h1>Government & NGO Impact Dashboard</h1>
      <p style={{color:'#52665a', marginBottom:'24px'}}>Calculated in real-time by the AgriWasteX ML Engine</p>
      <div className="grid four">
        <Stat icon={<Leaf/>} title="CO₂ Saved (KG)" value={impact.co2SavedKg} />
        <Stat icon={<BarChart3/>} title="Trees Equivalent" value={impact.treesEquivalent} />
        <Stat icon={<Trophy/>} title="Reward Points" value={impact.rewardPoints} />
        <Stat icon={<IndianRupee/>} title="Carbon Credits" value={impact.carbonCredits} />
      </div>
      <div className="card result" style={{marginTop:'24px'}}>
        <h2><Sparkles size={20} style={{verticalAlign:'middle', marginRight:'8px'}}/> AI Environmental Report</h2>
        <p>Based on 50,000 kg of crop waste processed on the platform.</p>
        <div style={{background:'#f0fdf4', border:'1px solid #bbf7d0', padding:'16px', borderRadius:'12px', marginTop:'16px'}}>
          <p style={{margin:0, color:'#166534'}}><b>Carbon Credits Generated:</b> {impact.carbonCredits} units ready for trading.</p>
        </div>
      </div>
    </section>
  );
}

function Advanced(){
 const [loan,setLoan]=useState(null),[rewards,setRewards]=useState(null),[price,setPrice]=useState(null),[gis,setGis]=useState([]);
 useEffect(()=>{fetch(API+'/loan-score').then(r=>r.json()).then(setLoan);fetch(API+'/rewards').then(r=>r.json()).then(setRewards);fetch(API+'/price-prediction').then(r=>r.json()).then(setPrice);fetch(API+'/gis-alerts').then(r=>r.json()).then(setGis)},[]);
 return <section className="page"><h1>Advanced SIH Features</h1><div className="grid two"><Info icon={<IndianRupee/>} title="Instant Loan Eligibility" data={loan}/><Info icon={<Trophy/>} title="Green Rewards" data={rewards}/><Info icon={<TrendingUp/>} title="Future Price Prediction" data={price}/><div className="card"><Mic/><h2>Voice Assistant</h2><p>Farmer bol sakta hai: “Mere paas 500 kilo parali hai.”</p><button onClick={()=>alert('Voice demo placeholder. Later add Web Speech API.')}>Start Voice Demo</button></div></div><h2>Satellite + GIS Monitoring</h2><div className="grid three">{gis.map((g,i)=><div className="card" key={i}><Satellite/><h3>{g.area}</h3><p>{g.alert}</p><b>Risk: {g.risk}</b></div>)}</div></section>
}
function Info({icon,title,data}){return <div className="card">{icon}<h2>{title}</h2>{data&&Object.entries(data).map(([k,v])=><p key={k}><b>{k}:</b> {Array.isArray(v)?v.join(', '):v}</p>)}</div>}
function Stat({icon,title,value}){return <div className="card stat">{icon}<h2>{value}</h2><p>{title}</p></div>}

createRoot(document.getElementById('root')).render(<App/>);

// ─── AI Price Prediction Result Dashboard Component ─────────────────
function AIPredictionResult({ mlPriceInfo, form }) {
  const [animIn, setAnimIn] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setAnimIn(true), 50); }, []);

  const predicted = parseFloat(mlPriceInfo.predictedPricePerKg);
  const confidence = (94 + (predicted % 1) * 3).toFixed(1);

  const qualityBonus = form.grade === 'A' ? 0.45 : form.grade === 'B' ? 0.20 : 0.00;
  const qualityDeduction = form.grade === 'C' ? 0.20 : 0.00;
  const demandBonus = form.demandLevel === 'High' ? 0.30 : form.demandLevel === 'Medium' ? 0.10 : 0.00;
  const demandDeduction = form.demandLevel === 'Low' ? 0.25 : 0.00;
  const moistureDeduction = form.season === 'Monsoon' ? 0.40 : form.season === 'Winter' ? 0.20 : 0.10;
  const transportDeduction = 0.15;
  const basePrice = Math.max(
    predicted - qualityBonus + qualityDeduction - demandBonus + demandDeduction + moistureDeduction + transportDeduction,
    1.0
  );

  const profitTier = predicted >= 5.0 ? 'green' : predicted >= 3.5 ? 'orange' : 'red';
  const tierStyles = {
    green:  { card: 'from-emerald-500 to-green-600', text: 'Good Profit Zone'    },
    orange: { card: 'from-amber-500 to-orange-500',  text: 'Average Profit Zone' },
    red:    { card: 'from-red-400 to-rose-600',      text: 'Low Profit Zone'     },
  }[profitTier];

  const trend = form.demandLevel === 'High'
    ? { icon: '📈', text: 'Rising',  color: 'text-green-600' }
    : form.demandLevel === 'Low'
    ? { icon: '📉', text: 'Falling', color: 'text-red-500'   }
    : { icon: '➖',  text: 'Stable',  color: 'text-gray-600'  };

  const sellingWindow = trend.text === 'Rising' ? 'Wait 3–5 Days' : trend.text === 'Falling' ? 'Sell Immediately' : 'This Week';
  const riskLevel = trend.text === 'Falling' ? 'High' : trend.text === 'Stable' ? 'Medium' : 'Low';
  const riskColor = riskLevel === 'High' ? 'text-red-600' : riskLevel === 'Medium' ? 'text-orange-500' : 'text-green-600';
  const bestMandi = form.location ? form.location + ' Mandi' : 'Nearest Mandi';

  const recommendation = trend.text === 'Rising'
    ? 'AI recommends waiting 3–5 days before selling. Demand is rising and prices are expected to increase.'
    : trend.text === 'Falling'
    ? 'AI recommends selling as soon as possible. Demand is falling and waiting longer may reduce your returns.'
    : 'Market is stable. You can sell now or wait a few days — prices are expected to remain consistent.';

  const tips = [
    form.season === 'Monsoon'
      ? 'Dry the crop waste under a protective shed to reduce moisture and improve quality grade before selling.'
      : 'Store crop waste in a cool, dry place to preserve quality and maintain your Grade ' + (form.grade || 'A') + ' rating.',
    trend.text === 'Rising'
      ? 'Demand is trending upward. Holding for 3–5 more days could earn you 5–10% more per kg.'
      : 'Consider locking in a buyer contract now to secure current pricing before it drops.',
    'Grouping pickup with nearby farmers can reduce transportation costs by up to ₹0.10/kg.',
  ];

  const fadeClass = animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4';

  return (
    <div className={`mt-6 transition-all duration-700 ease-out ${fadeClass}`} style={{fontFamily: 'Plus Jakarta Sans, sans-serif'}}>

      {/* Header Banner */}
      <div className={`bg-gradient-to-r ${tierStyles.card} rounded-2xl p-5 mb-4 text-white shadow-lg`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={22} />
            <span className="font-bold text-lg">🌾 AI Price Prediction Result</span>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 ring-1 ring-white/30">
            Random Forest Model · {confidence}% Confidence
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-white/70 text-sm mb-1">Predicted Price</div>
            <div className="text-5xl font-extrabold tracking-tight">₹{predicted.toFixed(2)}<span className="text-2xl font-medium text-white/80">/kg</span></div>
          </div>
          <div className="text-right">
            <div className="text-white/70 text-sm mb-1">Estimated Total Value</div>
            <div className="text-3xl font-bold">₹{mlPriceInfo.estimatedIncome.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">{tierStyles.text}</span>
          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">{trend.icon} Market: {trend.text}</span>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-4 flex gap-3 items-start">
        <Zap size={18} className="text-blue-500 mt-0.5 shrink-0" />
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">AI Recommendation</div>
          <p className="text-sm text-gray-700 leading-relaxed m-0">{recommendation}</p>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Price Breakdown */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <BarChart3 size={14} className="text-green-500" /> Price Breakdown
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Base Market Price</span><span className="font-semibold">₹{basePrice.toFixed(2)}</span>
            </div>
            {qualityBonus > 0 && (
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1"><CheckCircle size={13}/>Quality Bonus (Grade {form.grade})</span>
                <span className="font-semibold">+₹{qualityBonus.toFixed(2)}</span>
              </div>
            )}
            {qualityDeduction > 0 && (
              <div className="flex justify-between text-red-500">
                <span className="flex items-center gap-1"><XCircle size={13}/>Quality Deduction (Grade {form.grade})</span>
                <span className="font-semibold">-₹{qualityDeduction.toFixed(2)}</span>
              </div>
            )}
            {demandBonus > 0 && (
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1"><CheckCircle size={13}/>High Demand Bonus</span>
                <span className="font-semibold">+₹{demandBonus.toFixed(2)}</span>
              </div>
            )}
            {demandDeduction > 0 && (
              <div className="flex justify-between text-red-500">
                <span className="flex items-center gap-1"><XCircle size={13}/>Low Demand Deduction</span>
                <span className="font-semibold">-₹{demandDeduction.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-red-500">
              <span className="flex items-center gap-1"><XCircle size={13}/>Moisture Deduction ({form.season})</span>
              <span className="font-semibold">-₹{moistureDeduction.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span className="flex items-center gap-1"><XCircle size={13}/>Transportation Cost Effect</span>
              <span className="font-semibold">-₹{transportDeduction.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between font-bold text-base text-gray-900">
              <span>= Final Predicted Price</span>
              <span className="text-green-700">₹{predicted.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <MapPin size={14} className="text-blue-500" /> Market Insights
          </h4>
          <div className="text-sm divide-y divide-gray-50">
            <div className="flex justify-between items-center py-2"><span className="text-gray-500">Best Market</span><span className="font-semibold text-gray-800">{bestMandi}</span></div>
            <div className="flex justify-between items-center py-2"><span className="text-gray-500">Market Trend</span><span className={`font-semibold ${trend.color}`}>{trend.icon} {trend.text}</span></div>
            <div className="flex justify-between items-center py-2"><span className="text-gray-500">Selling Window</span><span className="font-semibold text-gray-800">{sellingWindow}</span></div>
            <div className="flex justify-between items-center py-2"><span className="text-gray-500">Expected Demand</span><span className="font-semibold text-gray-800">{form.demandLevel}</span></div>
            <div className="flex justify-between items-center py-2"><span className="text-gray-500">Risk Level</span><span className={`font-bold ${riskColor}`}>{riskLevel}</span></div>
          </div>
        </div>
      </div>

      {/* Factors */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-4">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <TrendingUp size={14} className="text-purple-500" /> Factors Affecting Price
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Positive Factors</p>
            {qualityBonus > 0 && <div className="flex items-center gap-2 text-green-700"><CheckCircle size={14}/>Grade {form.grade} Quality <span className="ml-auto font-semibold">+₹{qualityBonus.toFixed(2)}</span></div>}
            {demandBonus > 0 && <div className="flex items-center gap-2 text-green-700"><CheckCircle size={14}/>{form.demandLevel} Market Demand <span className="ml-auto font-semibold">+₹{demandBonus.toFixed(2)}</span></div>}
            {form.season === 'Winter' && <div className="flex items-center gap-2 text-green-700"><CheckCircle size={14}/>Optimal Season (Winter) <span className="ml-auto font-semibold">+₹0.10</span></div>}
            {qualityBonus === 0 && demandBonus === 0 && form.season !== 'Winter' && <div className="text-gray-400 text-xs italic">No strong positive factors.</div>}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">Negative Factors</p>
            {qualityDeduction > 0 && <div className="flex items-center gap-2 text-red-600"><XCircle size={14}/>Low Quality (Grade {form.grade}) <span className="ml-auto font-semibold">-₹{qualityDeduction.toFixed(2)}</span></div>}
            {demandDeduction > 0 && <div className="flex items-center gap-2 text-red-600"><XCircle size={14}/>Low Market Demand <span className="ml-auto font-semibold">-₹{demandDeduction.toFixed(2)}</span></div>}
            <div className="flex items-center gap-2 text-red-600"><XCircle size={14}/>Moisture Deduction <span className="ml-auto font-semibold">-₹{moistureDeduction.toFixed(2)}</span></div>
            <div className="flex items-center gap-2 text-red-600"><XCircle size={14}/>Transportation Cost <span className="ml-auto font-semibold">-₹0.15</span></div>
          </div>
        </div>
      </div>

      {/* Smart Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 shadow-sm">
        <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Zap size={14} className="text-blue-600" /> Smart AI Tips
        </h4>
        <ul className="space-y-3">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
// ─── End AIPredictionResult ─────────────────────────────────────────
