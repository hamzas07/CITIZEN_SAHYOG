import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
// 🔴 User / Admin marker
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// 🔵 Complaint marker
const blueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});


const MapView = () => {
  const [location, setLocation] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [satellite, setSatellite] = useState(false);

  // 1️⃣ Fetch user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => {
        console.error(err);
        // fallback if user denies location
        setLocation({ lat: 19.076, lng: 72.8777 }); // Mumbai
      }
    );
  }, []);

  // 2️⃣ Fetch complaints from backend
  useEffect(() => {
    fetch("https://citizen-sahyog.onrender.com/api/complaints")
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(err => console.error(err));
  }, []);

  if (!location) return <p style={{ padding: "20px" }}>Loading map...</p>;

  // 3️⃣ Custom marker colors by category
  

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setSatellite(!satellite)}
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 20,
          right: 20,
          padding: "10px 14px",
          background: "#1e293b",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {satellite ? "Street View" : "Satellite View"}
      </button>

      <MapContainer
        center={[location.lat, location.lng]}
        zoom={14}
        style={{ height: "100vh", width: "100vw" }}
      >
        {/* Tile Layer */}
        {satellite ? (
          <TileLayer
            attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        ) : (
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {/* User location */}
       <Marker
  position={[location.lat, location.lng]}
  icon={redIcon}
>

          <Popup>You are here</Popup>
        </Marker>

        {/* Complaint markers */}
        {complaints.map((complaint) => {
          // handle GeoJSON Point or legacy lat/lng
          let lat, lng;

          if (complaint.location?.type === "Point" && Array.isArray(complaint.location.coordinates)) {
            lng = complaint.location.coordinates[0]; // GeoJSON stores [lng, lat]
            lat = complaint.location.coordinates[1];
          } else if (complaint.location?.lat && complaint.location?.lng) {
            lat = complaint.location.lat;
            lng = complaint.location.lng;
          } else {
            return null; // skip if location not valid
          }

          return (
          <Marker
  key={complaint._id}
  position={[lat, lng]}
  icon={blueIcon}
>


              <Popup>
                <h3>{complaint.title}</h3>
                <p>{complaint.description}</p>
                <p><b>Category:</b> {complaint.category}</p>
                <p><b>Status:</b> {complaint.status}</p>
                <p><b>Reported by:</b> {complaint.user?.name || "Unknown"}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default MapView;
