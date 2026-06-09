import numpy as np
from sklearn.cluster import KMeans

def cluster_pickups(data: dict):
    farmers = data.get("farmers", [])
    truck_capacity = data.get("truckCapacityKg", 1000)
    
    if not farmers:
        return {"clusters": [], "modelUsed": "K-Means Clustering"}

    # Extract coordinates
    coords = np.array([[f["latitude"], f["longitude"]] for f in farmers])
    
    # Determine optimal number of clusters (simple heuristic based on total weight / capacity)
    total_qty = sum(f["quantityKg"] for f in farmers)
    n_clusters = max(1, min(len(farmers), int(np.ceil(total_qty / truck_capacity))))
    
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    labels = kmeans.fit_predict(coords)
    
    clusters = []
    for i in range(n_clusters):
        cluster_farmers = [f for j, f in enumerate(farmers) if labels[j] == i]
        cluster_qty = sum(f["quantityKg"] for f in cluster_farmers)
        names = [f["name"] for f in cluster_farmers]
        
        # Simple routing visualization logic
        villages = [f["village"] for f in cluster_farmers]
        route = " → ".join(villages) + " → Processing Center"
        
        clusters.append({
            "clusterId": i + 1,
            "farmers": names,
            "totalQuantityKg": cluster_qty,
            "truckUtilization": min(100, round((cluster_qty / truck_capacity) * 100)),
            "suggestedRoute": route,
            "estimatedCostSaved": len(names) * 600  # mock cost saving
        })
        
    return {
        "clusters": clusters,
        "modelUsed": "K-Means Clustering"
    }
