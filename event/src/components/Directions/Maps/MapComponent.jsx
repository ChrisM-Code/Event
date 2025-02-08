import { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import RoutingMachine from "react-leaflet-routing-machine";
import { MapContext } from "../Maps/MapContext";
import styled from "styled-components";

// Styled container for better layout
const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  height: 500px;
  margin: 20px auto;
  padding: 0.5px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #ff4500;
  font-weight: bold;
  text-align: center;
`;

const MapComponent = () => {
  const { userLocation, destination, isMapVisible } = useContext(MapContext);
  const [eventCoordinates, setEventCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (destination) {
      setLoading(true);
      setError(null);

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
          } else {
            setError("Oops!!! Location not found. Try another event.");
          }
        })
        .catch(() => {
          setError("Error fetching event location. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [destination]);

  if (!isMapVisible) {
    return (
      <LoadingMessage>
        Click an event location to view directions.
      </LoadingMessage>
    );
  }

  return (
    <MapWrapper>
      {loading && <LoadingMessage>Loading event location...</LoadingMessage>}
      {error && <LoadingMessage>{error}</LoadingMessage>}

      {!loading && !error && (
        <MapContainer
          center={userLocation || [0.0236, 37.9062]}
          zoom={13}
          style={{ width: "100%", height: "100%", borderRadius: "10px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
                iconUrl:
                  "https://leafletjs.com/examples/custom-icons/leaf-red.png",
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
      )}
    </MapWrapper>
  );
};

export default MapComponent;
