"""
AgriWasteX – Shared Pickup Dataset Generator
Generates 5000 realistic Indian farmer records with natural geographic clusters
for K-Means Clustering training.
"""

import random
import math
import pandas as pd
import numpy as np
from datetime import date, timedelta

random.seed(42)
np.random.seed(42)

# ─────────────────────────────────────────────────────────────────────────────
# 1. Geographic Cluster Centres (UP + bordering states)
#    Each cluster: (centre_lat, centre_lon, radius_deg, weight, district, state)
# ─────────────────────────────────────────────────────────────────────────────
CLUSTERS = [
    # --- Uttar Pradesh clusters (dominant) ---
    {"district": "Mathura",       "state": "Uttar Pradesh", "lat": 27.4924, "lon": 77.6737, "r": 0.35, "w": 7},
    {"district": "Agra",          "state": "Uttar Pradesh", "lat": 27.1767, "lon": 78.0081, "r": 0.40, "w": 6},
    {"district": "Aligarh",       "state": "Uttar Pradesh", "lat": 27.8974, "lon": 78.0880, "r": 0.35, "w": 6},
    {"district": "Meerut",        "state": "Uttar Pradesh", "lat": 28.9845, "lon": 77.7064, "r": 0.40, "w": 6},
    {"district": "Muzaffarnagar", "state": "Uttar Pradesh", "lat": 29.4727, "lon": 77.7085, "r": 0.35, "w": 5},
    {"district": "Saharanpur",    "state": "Uttar Pradesh", "lat": 29.9680, "lon": 77.5460, "r": 0.40, "w": 5},
    {"district": "Bareilly",      "state": "Uttar Pradesh", "lat": 28.3670, "lon": 79.4304, "r": 0.40, "w": 5},
    {"district": "Lucknow",       "state": "Uttar Pradesh", "lat": 26.8467, "lon": 80.9462, "r": 0.45, "w": 5},
    {"district": "Kanpur",        "state": "Uttar Pradesh", "lat": 26.4499, "lon": 80.3319, "r": 0.40, "w": 5},
    {"district": "Varanasi",      "state": "Uttar Pradesh", "lat": 25.3176, "lon": 82.9739, "r": 0.40, "w": 4},
    {"district": "Gorakhpur",     "state": "Uttar Pradesh", "lat": 26.7606, "lon": 83.3732, "r": 0.40, "w": 4},
    {"district": "Prayagraj",     "state": "Uttar Pradesh", "lat": 25.4358, "lon": 81.8463, "r": 0.40, "w": 4},
    {"district": "Jhansi",        "state": "Uttar Pradesh", "lat": 25.4484, "lon": 78.5685, "r": 0.35, "w": 3},
    {"district": "Moradabad",     "state": "Uttar Pradesh", "lat": 28.8386, "lon": 78.7733, "r": 0.35, "w": 4},
    {"district": "Bulandshahr",   "state": "Uttar Pradesh", "lat": 28.4069, "lon": 77.8497, "r": 0.30, "w": 4},
    {"district": "Etah",          "state": "Uttar Pradesh", "lat": 27.5589, "lon": 78.6635, "r": 0.30, "w": 3},
    {"district": "Mainpuri",      "state": "Uttar Pradesh", "lat": 27.2352, "lon": 79.0166, "r": 0.30, "w": 3},
    {"district": "Firozabad",     "state": "Uttar Pradesh", "lat": 27.1591, "lon": 78.3957, "r": 0.25, "w": 3},
    {"district": "Hathras",       "state": "Uttar Pradesh", "lat": 27.5958, "lon": 78.0536, "r": 0.25, "w": 3},
    {"district": "Sambhal",       "state": "Uttar Pradesh", "lat": 28.5855, "lon": 78.5695, "r": 0.25, "w": 3},
    # --- Bordering states (minor clusters) ---
    {"district": "Panipat",       "state": "Haryana",       "lat": 29.3909, "lon": 76.9635, "r": 0.30, "w": 2},
    {"district": "Rohtak",        "state": "Haryana",       "lat": 28.8955, "lon": 76.6066, "r": 0.25, "w": 2},
    {"district": "Ludhiana",      "state": "Punjab",        "lat": 30.9010, "lon": 75.8573, "r": 0.40, "w": 2},
    {"district": "Amritsar",      "state": "Punjab",        "lat": 31.6340, "lon": 74.8723, "r": 0.35, "w": 2},
    {"district": "Rajgarh",       "state": "Madhya Pradesh","lat": 24.0120, "lon": 76.6340, "r": 0.30, "w": 1},
    {"district": "Gwalior",       "state": "Madhya Pradesh","lat": 26.2183, "lon": 78.1828, "r": 0.35, "w": 1},
]

# Build cumulative weights for cluster sampling
_cluster_weights = [c["w"] for c in CLUSTERS]
_cluster_total   = sum(_cluster_weights)
_cluster_probs   = [w / _cluster_total for w in _cluster_weights]

# ─────────────────────────────────────────────────────────────────────────────
# 2. Village name pools per district
# ─────────────────────────────────────────────────────────────────────────────
VILLAGE_POOL = {
    "Mathura":       ["Govardhan","Vrindavan","Baldeo","Mahavan","Raya","Sonkh","Nandgaon","Barsana","Chhata","Mat"],
    "Agra":          ["Kheragarh","Fatehpur Sikri","Bah","Etmadpur","Shamshabad","Pinahat","Akola","Jagner","Kiraoli","Saiyan"],
    "Aligarh":       ["Atrauli","Khair","Iglas","Gabhana","Tappal","Jawan","Dhanipur","Gangiri","Akrabad","Bijauli"],
    "Meerut":        ["Sardhana","Mawana","Hapur","Modinagar","Kithor","Baghpat","Pilkhuwa","Bhojpur","Machhara","Daurala"],
    "Muzaffarnagar": ["Shamli","Kairana","Budhana","Charthawal","Jansath","Teetron","Shahpur","Purqazi","Khatauli","Bhopa"],
    "Saharanpur":    ["Deoband","Rampur Maniharan","Behat","Nakur","Sarsawa","Gangoh","Muzaffarabad","Titron","Fatehpur","Nanauta"],
    "Bareilly":      ["Aonla","Baheri","Faridpur","Nawabganj","Mirganj","Shergarh","Meerganj","Bithiri Chainpur","Ramnagar","Fatehganj"],
    "Lucknow":       ["Malihabad","Mohanlalganj","Bakshi Ka Talab","Chinhat","Kakori","Gosainganj","Itaunja","Sarojini Nagar","Manak Nagar","Alamnagar"],
    "Kanpur":        ["Bilhaur","Ghatampur","Shivrajpur","Kalyanpur","Sachendi","Bithoor","Patara","Sarsaul","Rooma","Vidhnu"],
    "Varanasi":      ["Pindra","Chiraigaon","Arajiline","Harahua","Sewapuri","Baragaon","Cholapur","Kashi Vidyapeeth","Rohania","Bhadohi"],
    "Gorakhpur":     ["Jungle Kaudia","Pipraich","Sahjanwa","Campierganj","Bansgaon","Gola Bazar","Pharenda","Nichlaul","Padrauna","Chauri Chaura"],
    "Prayagraj":     ["Phulpur","Soraon","Handia","Meja","Karchhana","Chail","Jasra","Koraon","Shankargarh","Saidabad"],
    "Jhansi":        ["Moth","Mauranipur","Garautha","Bangra","Chirgaon","Badagaon","Gursarai","Samthar","Naraini","Parichha"],
    "Moradabad":     ["Sambhal","Chandausi","Amroha","Hasanpur","Kanth","Thakurdwara","Bilari","Bahjoi","Pakwara","Shahabad"],
    "Bulandshahr":   ["Khurja","Anupshahr","Sikandrabad","Shikarpur","Gulaothi","Jahangirabad","Dibai","Pahasu","Siyana","Danpur"],
    "Etah":          ["Jalesar","Aliganj","Awagarh","Marhara","Nidhuwa","Sakit","Kasganj","Ganjdundwara","Soron","Patiyali"],
    "Mainpuri":      ["Shikohabad","Bhongaon","Karhal","Kishni","Kurawali","Ghiror","Barnahal","Bewar","Sultanganj","Akabarpur"],
    "Firozabad":     ["Tundla","Shikohabad","Jasrana","Sirsaganj","Narkhi","Araon","Hathwant","Madanpur","Patiali","Kheriya"],
    "Hathras":       ["Sasni","Sadabad","Sikandra Rao","Mursan","Saurikh","Mendu","Hasayan","Salempur","Nagla Bhatt","Rashidabad"],
    "Sambhal":       ["Gunnaur","Rajpura","Asmoli","Chamraua","Bahjoi","Narayan Patti","Panwari","Raza Nagar","Sirkha","Billari"],
    "Panipat":       ["Samalkha","Israna","Madlauda","Bapoli","Sunti","Ugra Kheri","Khanpur Kolian","Diwana","Naultha","Sanoli"],
    "Rohtak":        ["Meham","Asthal Bohar","Sanghi","Dighal","Lakhan Majra","Bhagwatipur","Madina","Kiloi","Sunaria","Titoli"],
    "Ludhiana":      ["Sidhwan Bet","Jagraon","Raikot","Samrala","Khamano","Mullanpur","Doraha","Machhiwara","Sahnewal","Payal"],
    "Amritsar":      ["Ajnala","Baba Bakala","Rayya","Majitha","Jandiala Guru","Tarn Taran","Patti","Khadoor Sahib","Goindwal","Lopoke"],
    "Rajgarh":       ["Sarangpur","Biaora","Khilchipur","Narsinghgarh","Pachore","Suthalia","Chachoda","Jirapur","Karahal","Machalpur"],
    "Gwalior":       ["Bhind","Morena","Sheopur","Dabra","Lahar","Mehgaon","Pichhore","Bhitarwar","Sihonia","Karera"],
}

# ─────────────────────────────────────────────────────────────────────────────
# 3. Crop → Waste_Type mapping & realistic weight ranges
# ─────────────────────────────────────────────────────────────────────────────
CROP_DATA = {
    "Paddy":    {"waste": "Straw",   "min_kg": 200, "max_kg": 1800},
    "Wheat":    {"waste": "Straw",   "min_kg": 150, "max_kg": 2000},
    "Sugarcane":{"waste": "Bagasse", "min_kg": 300, "max_kg": 2000},
    "Cotton":   {"waste": "Stalk",   "min_kg": 100, "max_kg": 1200},
    "Maize":    {"waste": "Residue", "min_kg": 100, "max_kg": 1500},
    "Mustard":  {"waste": "Stalk",   "min_kg": 100, "max_kg": 1000},
    "Bajra":    {"waste": "Residue", "min_kg": 100, "max_kg": 1200},
}

# Crop probabilities (Paddy + Wheat dominant in UP)
CROPS      = list(CROP_DATA.keys())
CROP_PROBS = [0.22, 0.22, 0.15, 0.12, 0.12, 0.10, 0.07]

PICKUP_TIMES = ["Morning", "Afternoon", "Evening"]

# Indian farmer first & last name pools
FIRST_NAMES = [
    "Ramesh","Suresh","Mahesh","Rajesh","Dinesh","Ganesh","Naresh","Lokesh","Brijesh","Rakesh",
    "Santosh","Rajkumar","Ramkumar","Bharat","Vinod","Sanjay","Vijay","Ajay","Ravi","Anil",
    "Sunil","Mukesh","Harish","Girish","Umesh","Yogesh","Lalit","Pramod","Pradeep","Deepak",
    "Arvind","Devendra","Narendra","Virendra","Jitendra","Yogendra","Surendra","Ravindra","Manish","Satish",
    "Kamlesh","Harishchandra","Ramnarayan","Shivkumar","Omprakash","Brijlal","Ramlal","Shyamlal","Kailash","Phool",
    "Hariom","Bankey","Jagram","Pappu","Badri","Bhola","Chandrabhan","Dharmendra","Fullu","Giridhar"
]
LAST_NAMES = [
    "Kumar","Singh","Sharma","Yadav","Gupta","Mishra","Pandey","Tiwari","Verma","Chaudhary",
    "Srivastava","Shukla","Tripathi","Joshi","Dubey","Pathak","Dwivedi","Bajpai","Saxena","Agarwal",
    "Rastogi","Chauhan","Rajput","Thakur","Patel","Rai","Sahu","Kashyap","Maurya","Lodhi",
    "Baghel","Nishad","Kewat","Mallah","Bind","Prajapati","Vishwakarma","Sonar","Lohar","Kumhar",
    "Soni","Shah","Jain","Bansal","Mittal","Garg","Khandelwal","Goyal","Maheshwari","Agrawal"
]

# ─────────────────────────────────────────────────────────────────────────────
# 4. Helpers
# ─────────────────────────────────────────────────────────────────────────────
def sample_cluster():
    return random.choices(CLUSTERS, weights=_cluster_probs, k=1)[0]

def gaussian_point(centre_lat, centre_lon, radius_deg):
    """Return a lat/lon within radius_deg of centre using a 2D Gaussian."""
    while True:
        dlat = random.gauss(0, radius_deg / 2)
        dlon = random.gauss(0, radius_deg / 2)
        if math.sqrt(dlat**2 + dlon**2) <= radius_deg:
            return round(centre_lat + dlat, 6), round(centre_lon + dlon, 6)

def random_name():
    return f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"

def random_village(district):
    pool = VILLAGE_POOL.get(district, ["Unnamed Village"])
    return random.choice(pool)

def random_date():
    today = date.today()
    return today + timedelta(days=random.randint(1, 30))

def road_access_prob(waste_weight):
    """Heavier loads → more likely to have road access."""
    if waste_weight >= 1200:
        return random.choices(["Yes", "No"], weights=[0.90, 0.10])[0]
    elif waste_weight >= 600:
        return random.choices(["Yes", "No"], weights=[0.75, 0.25])[0]
    else:
        return random.choices(["Yes", "No"], weights=[0.60, 0.40])[0]

def vehicle_access(road):
    if road == "Yes":
        return random.choices(["Tractor", "Mini Truck", "Pickup Van", "Bullock Cart"],
                              weights=[0.40, 0.30, 0.20, 0.10])[0]
    else:
        return random.choices(["Tractor", "Bullock Cart"],
                              weights=[0.40, 0.60])[0]

# ─────────────────────────────────────────────────────────────────────────────
# 5. Generate records
# ─────────────────────────────────────────────────────────────────────────────
print("Generating 5000 farmer records …")

N = 5000
records = []
used_ids = set()

for i in range(N):
    # Unique Farmer ID
    fid = f"FRM{str(i + 1).zfill(5)}"

    # Geographic cluster
    cluster = sample_cluster()
    lat, lon = gaussian_point(cluster["lat"], cluster["lon"], cluster["r"])

    district = cluster["district"]
    state    = cluster["state"]
    village  = random_village(district)

    # Crop & waste
    crop  = random.choices(CROPS, weights=CROP_PROBS, k=1)[0]
    cdata = CROP_DATA[crop]
    waste_type   = cdata["waste"]
    waste_weight = round(random.uniform(cdata["min_kg"], cdata["max_kg"]), 1)

    # Other fields
    moisture = round(random.uniform(8.0, 25.0), 1)
    avail_date   = random_date()
    pickup_time  = random.choice(PICKUP_TIMES)
    road = road_access_prob(waste_weight)
    veh  = vehicle_access(road)

    records.append({
        "Farmer_ID":       fid,
        "Farmer_Name":     random_name(),
        "Village":         village,
        "District":        district,
        "State":           state,
        "Latitude":        lat,
        "Longitude":       lon,
        "Crop":            crop,
        "Waste_Type":      waste_type,
        "Waste_Weight_KG": waste_weight,
        "Available_Date":  avail_date.strftime("%Y-%m-%d"),
        "Pickup_Time":     pickup_time,
        "Road_Access":     road,
        "Vehicle_Access":  veh,
        "Moisture":        moisture,
    })

df = pd.DataFrame(records)

# ─────────────────────────────────────────────────────────────────────────────
# 6. Validation checks
# ─────────────────────────────────────────────────────────────────────────────
print("\n-- Validation --------------------------------------")
assert len(df) == N,                               f"Row count mismatch: {len(df)}"
assert df["Farmer_ID"].nunique() == N,             "Duplicate Farmer_IDs found!"
assert df.isnull().sum().sum() == 0,               "Null values detected!"
assert df["Waste_Weight_KG"].between(100, 2000).all(), "Weight out of [100, 2000] range!"
assert df["Moisture"].between(8, 25).all(),        "Moisture out of [8, 25] range!"
assert df["Latitude"].between(23.0, 33.0).all(),   "Latitude out of realistic India range!"
assert df["Longitude"].between(70.0, 88.0).all(),  "Longitude out of realistic India range!"

print(f"  Total records      : {len(df)}")
print(f"  Unique Farmer IDs  : {df['Farmer_ID'].nunique()}")
print(f"  Null values        : {df.isnull().sum().sum()}")
print(f"  Districts covered  : {df['District'].nunique()}")
print(f"  States covered     : {df['State'].nunique()}")
print(f"  Crops covered      : {df['Crop'].nunique()}")
print(f"  Weight range (kg)  : {df['Waste_Weight_KG'].min()} – {df['Waste_Weight_KG'].max()}")
print(f"  Moisture range (%) : {df['Moisture'].min()} – {df['Moisture'].max()}")
print(f"\n  Crop distribution:")
for crop, cnt in df["Crop"].value_counts().items():
    print(f"    {crop:<12}: {cnt}")
print(f"\n  District distribution (top 10):")
for dist, cnt in df["District"].value_counts().head(10).items():
    print(f"    {dist:<20}: {cnt}")

# ─────────────────────────────────────────────────────────────────────────────
# 7. Export
# ─────────────────────────────────────────────────────────────────────────────
import os, pathlib

OUT_DIR = pathlib.Path(__file__).parent
xlsx_path = OUT_DIR / "AgriWasteX_Shared_Pickup_Dataset_5000.xlsx"
csv_path  = OUT_DIR / "AgriWasteX_Shared_Pickup_Dataset_5000.csv"

print("\nExporting …")
df.to_csv(csv_path, index=False)
print(f"  CSV  saved → {csv_path}")

df.to_excel(xlsx_path, index=False, engine="openpyxl")
print(f"  XLSX saved → {xlsx_path}")

print("\n✅ Dataset generation complete!")
