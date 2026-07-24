import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
import os
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MODEL_DIR = os.path.join(BASE_DIR, 'models')

# Ensure models directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

DATASET_PATH = os.path.join(DATA_DIR, 'AgriWasteX_Shared_Pickup_Dataset_5000.xlsx')
MODEL_SAVE_PATH = os.path.join(MODEL_DIR, 'pickup_cluster_model.pkl')
SCALER_SAVE_PATH = os.path.join(MODEL_DIR, 'pickup_scaler.pkl')

def train_clustering_model():
    print(f"Loading dataset from {DATASET_PATH}...")
    try:
        df = pd.read_excel(DATASET_PATH)
    except FileNotFoundError:
        print(f"Error: Could not find dataset at {DATASET_PATH}")
        return

    # Handle missing values
    df.fillna(df.mean(numeric_only=True), inplace=True)

    # Use only specific features
    features = ['Latitude', 'Longitude', 'Waste_Weight_KG']
    X = df[features].copy()

    # Scale the features
    print("Scaling features...")
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Use the Elbow Method and Silhouette Score to determine optimal clusters
    # Testing clusters between 5 and 25
    print("Determining optimal number of clusters using Elbow Method and Silhouette Score...")
    inertias = []
    silhouette_scores = []
    k_range = range(5, 26)

    for k in k_range:
        kmeans = KMeans(n_clusters=k, init='k-means++', random_state=42, n_init=10)
        kmeans.fit(X_scaled)
        inertias.append(kmeans.inertia_)
        score = silhouette_score(X_scaled, kmeans.labels_)
        silhouette_scores.append(score)
        print(f"k={k}: Inertia={kmeans.inertia_:.2f}, Silhouette Score={score:.4f}")

    # Determine optimal K based on max silhouette score
    optimal_k = k_range[np.argmax(silhouette_scores)]
    print(f"\nOptimal number of clusters selected: {optimal_k}")

    # Plot Elbow and Silhouette (save plot instead of showing to avoid blocking)
    fig, ax1 = plt.subplots(figsize=(10, 6))

    color = 'tab:red'
    ax1.set_xlabel('Number of Clusters (k)')
    ax1.set_ylabel('Inertia', color=color)
    ax1.plot(k_range, inertias, marker='o', color=color)
    ax1.tick_params(axis='y', labelcolor=color)

    ax2 = ax1.twinx()
    color = 'tab:blue'
    ax2.set_ylabel('Silhouette Score', color=color)
    ax2.plot(k_range, silhouette_scores, marker='s', color=color)
    ax2.tick_params(axis='y', labelcolor=color)

    plt.title('Elbow Method and Silhouette Score for K-Means Clustering')
    fig.tight_layout()
    plot_path = os.path.join(DATA_DIR, 'clustering_metrics.png')
    plt.savefig(plot_path)
    print(f"Metrics plot saved to {plot_path}")
    plt.close()

    # Train final model
    print(f"\nTraining final KMeans model with {optimal_k} clusters...")
    final_kmeans = KMeans(n_clusters=optimal_k, init='k-means++', random_state=42, n_init=10)
    final_kmeans.fit(X_scaled)

    # Save models
    joblib.dump(final_kmeans, MODEL_SAVE_PATH)
    joblib.dump(scaler, SCALER_SAVE_PATH)
    print(f"Model saved to {MODEL_SAVE_PATH}")
    print(f"Scaler saved to {SCALER_SAVE_PATH}")

    # Print final metrics
    final_inertia = final_kmeans.inertia_
    final_silhouette = silhouette_score(X_scaled, final_kmeans.labels_)
    print("\n--- Final Model Metrics ---")
    print(f"Number of clusters : {optimal_k}")
    print(f"Inertia            : {final_inertia:.2f}")
    print(f"Silhouette Score   : {final_silhouette:.4f}")

    # Plot final clusters
    print("\nGenerating cluster visualization...")
    plt.figure(figsize=(12, 8))
    # We plot Latitude vs Longitude, and use size/color for clusters
    scatter = plt.scatter(X['Longitude'], X['Latitude'], c=final_kmeans.labels_, cmap='viridis', alpha=0.5, s=20)
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.title(f'Farmer Shared Pickup Clusters (k={optimal_k})')
    plt.colorbar(scatter, label='Cluster ID')
    
    cluster_plot_path = os.path.join(DATA_DIR, 'pickup_clusters_map.png')
    plt.savefig(cluster_plot_path)
    print(f"Cluster map saved to {cluster_plot_path}")
    plt.close()

if __name__ == "__main__":
    train_clustering_model()
