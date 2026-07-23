import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Leaf, Upload, Truck, BarChart3, Satellite, IndianRupee, Trophy, Users, TrendingUp, Factory, Mic, Building2, MapPin, Camera, ShieldCheck, Sparkles, Navigation, Coins, Zap, Gift, CheckCircle, XCircle, ArrowRight, Quote, Star } from 'lucide-react';
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
                <div className="ml-result-card">
                  <div className="ml-result-header"><Sparkles size={16}/> AI Price Prediction Result</div>
                  <div className="ml-result-grid">
                    <div className="ml-result-item">
                      <span className="ml-result-label">Predicted Price Per KG</span>
                      <span className="ml-result-value">₹{mlPriceInfo.predictedPricePerKg}</span>
                    </div>
                    <div className="ml-result-item">
                      <span className="ml-result-label">Estimated Total Income</span>
                      <span className="ml-result-value highlight">₹{mlPriceInfo.estimatedIncome.toLocaleString()}</span>
                    </div>
                    <div className="ml-result-item">
                      <span className="ml-result-label">Model Used</span>
                      <span className="ml-result-value small">{mlPriceInfo.modelUsed}</span>
                    </div>
                    <div className="ml-result-item">
                      <span className="ml-result-label">Confidence</span>
                      <span className="ml-result-value small">{mlPriceInfo.confidenceNote}</span>
                    </div>
                  </div>
                </div>
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

function Pickup(){
  const [pickupFarmers, setPickupFarmers] = useState([
    { name: "Farmer A", qty: 100, location: "Village A", status: "Loaded", date: "2026-05-30", time: "10:00 AM", price: 3, mobile: "9876543210", wasteType: "Paddy Straw" },
    { name: "Farmer B", qty: 200, location: "Village B", status: "Loaded", date: "2026-05-30", time: "10:30 AM", price: 3, mobile: "9876543211", wasteType: "Wheat Straw" },
    { name: "Farmer C", qty: 300, location: "Village C", status: "Assigned", date: "2026-05-30", time: "11:00 AM", price: 3, mobile: "9876543212", wasteType: "Sugarcane Waste" }
  ]);

  const [form, setForm] = useState({
    farmer: '',
    mobile: '',
    wasteType: '',
    quantity: '',
    location: '',
    date: '',
    time: '',
    pricePerKg: ''
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mlClusterInfo, setMlClusterInfo] = useState(null);

  const clusterPickupsML = async () => {
    try {
      const payload = {
        truckCapacityKg: 1000,
        farmers: pickupFarmers.map((f, i) => ({
          name: f.name,
          village: f.location,
          latitude: 27.4924 + (i * 0.01),
          longitude: 77.6737 + (i * 0.01),
          quantityKg: Number(f.qty)
        }))
      };
      const res = await fetch(`${ML_API}/shared-pickup-ml`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      if(!res.ok) throw new Error("API Error");
      const data = await res.json();
      setMlClusterInfo(data);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    clusterPickupsML();
  }, [pickupFarmers]);

  const getCoords = (location, idx) => {
    const loc = location.toLowerCase();
    if (loc.includes('village a')) return { x: 60, y: 150 };
    if (loc.includes('village b')) return { x: 150, y: 70 };
    if (loc.includes('village c')) return { x: 280, y: 60 };
    if (loc.includes('mathura') || loc.includes('you')) return { x: 180, y: 180 };
    if (loc.includes('agra')) return { x: 220, y: 150 };
    if (loc.includes('aligarh')) return { x: 100, y: 90 };
    
    // Fallback coordinates spread
    const angles = [135, 225, 315, 45, 90, 270];
    const angle = (angles[idx % angles.length] * Math.PI) / 180;
    const r = 50 + (idx * 20) % 70;
    return {
      x: Math.round(180 + r * Math.cos(angle)),
      y: Math.round(120 + r * Math.sin(angle))
    };
  };

  const getRoutePath = () => {
    if (pickupFarmers.length === 0) return "M 340,180";
    let path = "";
    pickupFarmers.forEach((f, idx) => {
      const coords = getCoords(f.location, idx);
      if (idx === 0) {
        path = `M ${coords.x},${coords.y}`;
      } else {
        path += ` L ${coords.x},${coords.y}`;
      }
    });
    path += " L 340,180";
    return path;
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!form.farmer.trim()) tempErrors.farmer = 'Farmer name is required';
    
    if (!form.mobile.trim()) {
      tempErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(form.mobile.trim())) {
      tempErrors.mobile = 'Mobile number must be 10 digits';
    }

    if (!form.wasteType.trim()) tempErrors.wasteType = 'Crop waste type is required';
    
    if (!form.quantity) {
      tempErrors.quantity = 'Quantity available is required';
    } else if (isNaN(form.quantity) || parseFloat(form.quantity) <= 0) {
      tempErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!form.location.trim()) tempErrors.location = 'Village/Pickup location is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Convert 24hr HTML5 time to AM/PM format
    let formattedTime = "11:30 AM";
    if (form.time) {
      const [hrs, mins] = form.time.split(':');
      const h = parseInt(hrs);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const displayHr = h % 12 || 12;
      formattedTime = `${displayHr}:${mins} ${ampm}`;
    }

    const newFarmer = {
      name: form.farmer,
      mobile: form.mobile,
      qty: parseFloat(form.quantity),
      location: form.location,
      wasteType: form.wasteType,
      date: form.date || "2026-05-30",
      time: formattedTime,
      price: parseFloat(form.pricePerKg || 3),
      status: "Assigned",
      isUser: true
    };

    setPickupFarmers([...pickupFarmers, newFarmer]);
    setSubmitSuccess(true);
    setErrors({});
    setForm({
      farmer: '',
      mobile: '',
      wasteType: '',
      quantity: '',
      location: '',
      date: '',
      time: '',
      pricePerKg: ''
    });

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  // Metrics recalculations
  const totalQuantity = pickupFarmers.reduce((sum, f) => sum + Number(f.qty || 0), 0);
  const truckCapacity = 1000;
  const utilization = Math.round((totalQuantity / truckCapacity) * 100);
  
  const costWithout = pickupFarmers.length * 1500;
  const costWith = 2700;
  const savings = costWithout - costWith;
  const pctSavings = costWithout > 0 ? Math.round((savings / costWithout) * 100) : 0;
  
  const tripsAvoided = pickupFarmers.length - 1;
  const co2Reduced = tripsAvoided * 15;
  const fuelSaved = tripsAvoided * 6;
  const distance = 18 + (pickupFarmers.length - 3) * 3; // 18km baseline, +3km per detour

  let utilizationColor = "green";
  if (utilization > 90) utilizationColor = "red";
  else if (utilization > 70) utilizationColor = "amber";

  let truckRequired = "Mini Truck";
  if (totalQuantity > 1000) truckRequired = "Heavy Duty Truck (AI Scaled)";
  else if (totalQuantity > 600) truckRequired = "Standard Pickup Truck";

  return (
    <section className="page">
      <div className="logistics-banner-title">
        <Truck size={38} className="gps-marker" style={{ color: '#16a34a' }} />
        <div>
          <h1>Shared Pickup System</h1>
          <p className="page-subtitle">Reduce transportation costs by combining nearby farmers' crop waste into a single pickup.</p>
        </div>
      </div>

      {/* Add Farmer to Shared Pickup Form */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="form-header">
          <h2 className="form-title">Add Farmer to Shared Pickup</h2>
          <p className="form-subtitle">Register farmer and crop details to automatically recalculate shipping routes and savings.</p>
        </div>

        {submitSuccess && (
          <div className="success-alert">
            <ShieldCheck size={20} />
            <span>Farmer added to shared pickup group successfully</span>
          </div>
        )}

        <form onSubmit={submit}>
          <div className="pickup-form-grid">
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
                placeholder="Enter farmer name"
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
                <span className="helper-text">Used for coordination</span>
              )}
            </div>

            {/* Crop Waste Type */}
            <div className="form-group">
              <label className="form-label">
                Crop Waste Type
                <span className="required-star">*</span>
              </label>
              <input
                type="text"
                list="pickup-wastes"
                className={`form-input ${errors.wasteType ? 'has-error' : ''}`}
                value={form.wasteType}
                placeholder="Select or enter crop waste type"
                onChange={e => {
                  setForm({...form, wasteType: e.target.value});
                  if (errors.wasteType) setErrors({...errors, wasteType: ''});
                }}
              />
              <datalist id="pickup-wastes">
                <option value="Paddy Straw" />
                <option value="Wheat Straw" />
                <option value="Sugarcane Waste" />
                <option value="Cotton Waste" />
              </datalist>
              {errors.wasteType ? (
                <span className="error-message">{errors.wasteType}</span>
              ) : (
                <span className="helper-text">Examples: Paddy Straw, Wheat Straw, Sugarcane Waste</span>
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
                <span className="helper-text">Example: 250</span>
              )}
            </div>

            {/* Village / Pickup Location */}
            <div className="form-group">
              <label className="form-label">
                Village / Pickup Location
                <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.location ? 'has-error' : ''}`}
                value={form.location}
                placeholder="Enter village or city name"
                onChange={e => {
                  setForm({...form, location: e.target.value});
                  if (errors.location) setErrors({...errors, location: ''});
                }}
              />
              {errors.location ? (
                <span className="error-message">{errors.location}</span>
              ) : (
                <span className="helper-text">Example: Village A, Mathura</span>
              )}
            </div>

            {/* Preferred Pickup Date */}
            <div className="form-group">
              <label className="form-label">
                Preferred Pickup Date
              </label>
              <input
                type="date"
                className="form-input"
                value={form.date}
                onChange={e => setForm({...form, date: e.target.value})}
              />
              <span className="helper-text">Desired scheduling day</span>
            </div>

            {/* Preferred Pickup Time */}
            <div className="form-group">
              <label className="form-label">
                Preferred Pickup Time
              </label>
              <input
                type="time"
                className="form-input"
                value={form.time}
                onChange={e => setForm({...form, time: e.target.value})}
              />
              <span className="helper-text">Desired pickup window</span>
            </div>

            {/* Expected Price */}
            <div className="form-group">
              <label className="form-label">
                Expected Price Per KG
              </label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={form.pricePerKg}
                placeholder="Example: 3"
                onChange={e => setForm({...form, pricePerKg: e.target.value})}
              />
              <span className="helper-text">Example ₹3/kg</span>
            </div>
            
            <div className="pickup-form-submit-row">
              <button className="submit-btn" type="submit" style={{ padding: '12px 24px' }}>
                Add to Pickup Group
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* AI Recommendation Box */}
      <div className="recommendation-box">
        <Sparkles className="recommendation-icon" size={24} />
        <div className="recommendation-content">
          <div className="recommendation-tag">
            <div className="recommendation-pulse"></div>
            AI Optimization Alert
          </div>
          <p>
            {pickupFarmers.length > 3
              ? "Optimal logistics routing applied! High utilization achieved. Processing centers are notified of bulk delivery." 
              : "AI recommends waiting 2 more days. Nearby farmers can increase total load from 600 kg to 900 kg, reducing logistics cost by 35%."
            }
          </p>
        </div>
      </div>

      {/* Top Savings & Impact Row */}
      <div className="grid two">
        {/* Savings Dashboard */}
        <div className="card stat-glow-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Coins size={22} style={{ color: '#16a34a' }} />
            <h3 style={{ margin: 0 }}>Savings Dashboard</h3>
          </div>
          <p>Combined transportation routing reduces total logistics expense.</p>
          
          <div className="savings-bar-container">
            <div className="savings-bar-wrapper">
              <span className="savings-bar-label">Individual Cost</span>
              <div className="savings-bar-track">
                <div className="savings-bar-fill normal" style={{ width: '100%' }}></div>
              </div>
              <span className="savings-bar-value">₹{costWithout}</span>
            </div>
            <div className="savings-bar-wrapper">
              <span className="savings-bar-label">Group Shared Cost</span>
              <div className="savings-bar-track">
                <div className="savings-bar-fill optimized" style={{ width: `${(costWith / costWithout) * 100}%` }}></div>
              </div>
              <span className="savings-bar-value">₹{costWith}</span>
            </div>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#52665a', fontWeight: 600 }}>Total Group Savings:</span>
            <span style={{ fontSize: '18px', color: '#16a34a', fontWeight: 800 }}>₹{savings} ({pctSavings}% Saved)</span>
          </div>
        </div>

        {/* Environmental Impact Card */}
        <div className="card stat-glow-card blue">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Leaf size={22} style={{ color: '#2563eb' }} />
            <h3 style={{ margin: 0 }}>Environmental Impact</h3>
          </div>
          <p>Reduced logistics footprints directly prevent rural CO₂ emissions.</p>
          
          <div className="grid three" style={{ margin: '14px 0 0 0' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '20px', color: '#2563eb' }}>{fuelSaved} Liters</h4>
              <small style={{ color: '#52665a', fontWeight: 600 }}>Fuel Saved</small>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '20px', color: '#2563eb' }}>{co2Reduced} kg</h4>
              <small style={{ color: '#52665a', fontWeight: 600 }}>CO₂ Reduced</small>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '20px', color: '#2563eb' }}>{tripsAvoided} trips</h4>
              <small style={{ color: '#52665a', fontWeight: 600 }}>Trips Avoided</small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="logistics-grid">
        {/* Left Column: Farmers, Utilization, Schedule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Nearby Farmers Grouping */}
          <div className="card">
            <h3>Nearby Farmers Grouping</h3>
            <p>Farmers currently grouped in your local zone (Mathura Rural):</p>
            
            <div className="farmers-group-list">
              {pickupFarmers.map((f, i) => (
                <div key={i} className={`farmer-group-item ${f.isUser ? 'user-item' : ''}`}>
                  <div className="farmer-group-name">
                    <Users size={16} style={{ color: f.isUser ? '#2563eb' : '#16a34a' }} />
                    <span>{f.name}</span>
                    {f.isUser && <span className="pill" style={{ padding: '2px 8px', fontSize: '10px', background: '#dbeafe', color: '#2563eb' }}>New</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="farmer-group-qty">{f.qty} kg</span>
                    <span className="pill" style={{ 
                      padding: '2px 8px', 
                      fontSize: '10px', 
                      background: f.status === 'Loaded' ? '#dcfce7' : f.status === 'Joined' ? '#dbeafe' : '#fef3c7',
                      color: f.status === 'Loaded' ? '#166534' : f.status === 'Joined' ? '#2563eb' : '#b45309'
                    }}>
                      {f.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="progress-container">
              <div className="progress-label-row">
                <span>Total Group Quantity:</span>
                <span>{totalQuantity} kg</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${Math.min(utilization, 100)}%` }}></div>
              </div>
            </div>
          </div>

          {/* Truck Utilization Card */}
          <div className="card">
            <h3>Truck Utilization</h3>
            <p>Logistics vehicle status assigned for this shared route.</p>
            
            <div className="utilization-chart-container">
              <svg viewBox="0 0 36 36" className={`circular-chart ${utilizationColor}`}>
                <path className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                  strokeDasharray={`${Math.min(utilization, 100)}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="18.5" className="chart-percentage">{utilization}%</text>
                <text x="18" y="24" className="chart-label">LOAD</text>
              </svg>
              
              <div className="utilization-stats">
                <div className="utilization-stat-row">Vehicle: <b>{truckRequired}</b></div>
                <div className="utilization-stat-row">Capacity: <b>{truckCapacity} kg</b></div>
                <div className="utilization-stat-row">Current Load: <b>{totalQuantity} kg</b></div>
                <div className="utilization-stat-row">Space Status: <b>{totalQuantity > truckCapacity ? `${totalQuantity - truckCapacity} kg Overloaded` : `${truckCapacity - totalQuantity} kg Left`}</b></div>
              </div>
            </div>
          </div>

          {/* Pickup Schedule Table */}
          <div className="card">
            <h3>Pickup Schedule</h3>
            <div className="pickup-table-wrapper">
              <table className="pickup-table">
                <thead>
                  <tr>
                    <th>Farmer</th>
                    <th>Quantity</th>
                    <th>Village</th>
                    <th>Pickup Time</th>
                  </tr>
                </thead>
                <tbody>
                  {pickupFarmers.map((f, i) => (
                    <tr key={i} className={f.isUser ? 'user-row' : ''}>
                      <td><b>{f.name}</b> {f.isUser && <small style={{ color: '#2563eb' }}>(New)</small>}</td>
                      <td><span className="badge-qty">{f.qty} kg</span></td>
                      <td>{f.location}</td>
                      <td><span className="badge-time">{f.time}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: GPS Map & Route Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* GPS Live Map */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0 }}>Live GPS Route Optimization</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#16a34a', fontWeight: 'bold' }}>
                <div className="gps-map-overlay-pulse"></div> Live Tracker
              </div>
            </div>
            
            <div className="gps-map-container">
              <div className="gps-map-overlay">
                <Navigation size={14} style={{ transform: 'rotate(45deg)' }} />
                <span>AI Optimized Multi-Stop Route</span>
              </div>

              <svg width="100%" height="100%" viewBox="0 0 400 240">
                {/* Background Grids */}
                <g opacity="0.15">
                  <line x1="50" y1="0" x2="50" y2="240" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="100" y1="0" x2="100" y2="240" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="0" x2="150" y2="240" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="200" y1="0" x2="200" y2="240" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="250" y1="0" x2="250" y2="240" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="300" y1="0" x2="300" y2="240" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="350" y1="0" x2="350" y2="240" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="160" x2="400" y2="160" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
                </g>

                {/* Road Network (Background roads) */}
                <g opacity="0.3" stroke="#1b3a24" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 30,130 Q 80,180 150,70" />
                  <path d="M 150,70 L 280,60" />
                  <path d="M 280,60 Q 300,120 340,180" />
                  <path d="M 150,70 Q 160,130 180,180" />
                  <path d="M 180,180 Q 240,140 280,60" />
                </g>

                {/* Route line */}
                <path
                  id="route-path"
                  d={getRoutePath()}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3.5"
                  className="gps-route-line"
                />

                {/* Truck icon moving along path */}
                <g>
                  <circle r="7" fill="#ffffff" stroke="#16a34a" strokeWidth="3">
                    <animateMotion
                      dur="8s"
                      repeatCount="indefinite"
                      path={getRoutePath()}
                    />
                  </circle>
                </g>

                {/* Nodes markers */}
                {pickupFarmers.map((f, idx) => {
                  const coords = getCoords(f.location, idx);
                  return (
                    <g transform={`translate(${coords.x}, ${coords.y})`} key={idx}>
                      {f.isUser ? (
                        <>
                          <circle r="16" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="gps-pulse-ring" />
                          <circle r="12" fill="#0d1e13" stroke="#3b82f6" strokeWidth="2" />
                          <circle r="5" fill="#3b82f6" />
                        </>
                      ) : (
                        <>
                          <circle r="12" fill="#0d1e13" stroke="#22c55e" strokeWidth="1.5" />
                          <circle r="5" fill="#22c55e" />
                        </>
                      )}
                      <text y="-18" fontSize="9" fill={f.isUser ? "#93c5fd" : "#a7f3d0"} fontWeight="bold" textAnchor="middle">
                        {f.name}
                      </text>
                    </g>
                  );
                })}

                {/* Processing Center Center Marker */}
                <g transform="translate(340, 180)">
                  <rect x="-10" y="-10" width="20" height="20" rx="3" fill="#ca8a04" />
                  <Factory size={12} style={{ color: '#fff' }} x="-6" y="-6" />
                  <text y="22" fontSize="10" fill="#fde047" fontWeight="bold" textAnchor="middle">Center</text>
                </g>
              </svg>

              {/* GPS Map Legend */}
              <div className="gps-legend">
                <div className="gps-legend-item">
                  <div className="gps-legend-color" style={{ backgroundColor: '#22c55e' }}></div>
                  <span>Farmers Grouped</span>
                </div>
                <div className="gps-legend-item">
                  <div className="gps-legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                  <span>New Farm (Added)</span>
                </div>
                <div className="gps-legend-item">
                  <div className="gps-legend-color" style={{ backgroundColor: '#ca8a04', borderRadius: '2px' }}></div>
                  <span>Processing Plant</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Route Optimization Panel */}
          <div className="card">
            <h3>AI Route Optimization Panel</h3>
            <p>Logistics route compiled by the AI coordination engine (Model: {mlClusterInfo?.modelUsed || 'Calculating...'}):</p>
            {mlClusterInfo && mlClusterInfo.clusters && mlClusterInfo.clusters.map((cluster, cidx) => (
              <div key={cidx} style={{marginBottom:'24px', background:'#f8faf9', padding:'16px', borderRadius:'12px', border:'1px solid #dcfce7'}}>
                <h4 style={{margin:0, color:'#166534', marginBottom:'8px'}}>Cluster {cluster.clusterId}</h4>
                <p style={{fontSize:'14px', margin:'0 0 8px 0'}}><b>Farmers:</b> {cluster.farmers.join(', ')}</p>
                <p style={{fontSize:'14px', margin:'0 0 8px 0'}}><b>Total Weight:</b> {cluster.totalQuantityKg} kg (Utilization: {cluster.truckUtilization}%)</p>
                <p style={{fontSize:'14px', margin:0, color:'#15803d'}}><b>Route:</b> {cluster.suggestedRoute}</p>
              </div>
            ))}
            
            <div className="route-flow">
              {pickupFarmers.map((f, idx) => {
                const coords = getCoords(f.location, idx);
                return (
                  <div className="route-step" key={idx}>
                    <div className={f.isUser ? "route-dot user" : "route-dot"}>
                      {idx + 1}
                    </div>
                    <div className="route-line-vertical"></div>
                    <div className="route-info">
                      <span className="route-node-name">{f.location}</span>
                      <span className="route-node-detail">{f.name} ({f.qty} kg) • Scheduled at {f.time}</span>
                    </div>
                  </div>
                );
              })}
              <div className="route-step">
                <div className="route-dot center">
                  {pickupFarmers.length + 1}
                </div>
                <div className="route-line-vertical"></div>
                <div className="route-info">
                  <span className="route-node-name">Processing Center</span>
                  <span className="route-node-detail">Mathura Biochar Plant</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e8f5ec', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <div>Distance: <b>{distance} km</b></div>
              <div>Fuel Saved: <b>{fuelSaved} Liters</b></div>
              <div>Cost Saved: <b style={{ color: '#16a34a' }}>₹{savings}</b></div>
            </div>
          </div>

        </div>
      </div>
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
