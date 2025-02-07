import { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import RoutingMachine from "react-leaflet-routing-machine";
import { MapContext } from "../Maps/MapContext";

const MapComponent = () => {
  const { userLocation, destination, isMapVisible } = useContext(MapContext);
  const [eventCoordinates, setEventCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (destination) {
      setLoading(true);
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setEventCoordinates([
              parseFloat(data[0].lat),
              parseFloat(data[0].lon),
            ]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
          setLoading(false);
        });
    }
  }, [destination]);

  if (!isMapVisible) {
    return <p>Click an event location to view directions.</p>;
  }

  return (
    <MapContainer
      center={userLocation || [0.0236, 37.9062]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {loading && <p>Loading event location...</p>}

      {userLocation && (
        <Marker
          position={userLocation}
          icon={L.icon({
            iconUrl:
              "https://leafletjs.com/examples/custom-icons/leaf-green.png",
            iconSize: [25, 41],
          })}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}

      {eventCoordinates && (
        <Marker
          position={eventCoordinates}
          icon={L.icon({
            iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
            iconSize: [25, 41],
          })}
        >
          <Popup>Event: {destination}</Popup>
        </Marker>
      )}

      {userLocation && eventCoordinates && (
        <RoutingMachine waypoints={[userLocation, eventCoordinates]} />
      )}
    </MapContainer>
  );
};

export default MapComponent;
