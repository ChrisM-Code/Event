import { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContext } from "../Maps/MapContext";
import styled from "styled-components";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import PropTypes from "prop-types";

// Styled container
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

const DistanceInfo = styled.p`
  font-size: 1rem;
  color: #ff4500;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

const MapComponent = () => {
  const { userLocation, destination, isMapVisible } = useContext(MapContext);
  const [eventCoordinates, setEventCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (destination) {
      setLoading(true);
      setError(null);
      setEventCoordinates(null);

      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setEventCoordinates([lat, lon]);

            if (userLocation) {
              setDistance(calculateDistance(userLocation, [lat, lon]));
            }
          } else {
            setError("Oops! Location not found. Try another event.");
          }
        })
        .catch(() => {
          setError("Error fetching event location. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [destination, userLocation]);

  const calculateDistance = (loc1, loc2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(loc2[0] - loc1[0]);
    const dLon = toRad(loc2[1] - loc1[1]);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(loc1[0])) *
        Math.cos(toRad(loc2[0])) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  if (!isMapVisible) {
    return (
      <DistanceInfo>Click an event location to view directions.</DistanceInfo>
    );
  }

  return (
    <MapWrapper>
      {loading && <DistanceInfo>Loading event location...</DistanceInfo>}
      {error && <DistanceInfo>{error}</DistanceInfo>}

      {!loading && !error && (
        <>
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
                    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-green.png",
                  iconSize: [10, 15],
                })}
              >
                <Popup>Your Location</Popup>
              </Marker>
            )}

            {eventCoordinates && (
              <Marker
                position={eventCoordinates}
                icon={L.icon({
                  iconUrl:
                    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-red.png",
                  iconSize: [30, 45],
                })}
              >
                <Popup>Event: {destination}</Popup>
              </Marker>
            )}

            {userLocation && eventCoordinates && (
              <Routing
                userLocation={userLocation}
                eventCoordinates={eventCoordinates}
              />
            )}
          </MapContainer>
          {distance && <DistanceInfo>Distance: {distance} km</DistanceInfo>}
        </>
      )}
    </MapWrapper>
  );
};

const Routing = ({ userLocation, eventCoordinates }) => {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    if (!userLocation || !eventCoordinates) return;

    // Remove any previous control
    if (routingControl) {
      map.removeControl(routingControl);
    }

    const control = L.Routing.control({
      waypoints: [L.latLng(userLocation), L.latLng(eventCoordinates)],
      lineOptions: {
        styles: [{ color: "#007bff", weight: 6, opacity: 0.8 }],
      },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
      createMarker: (i, waypoint) => {
        return L.marker(waypoint.latLng, {
          icon: L.icon({
            iconUrl:
              i === 0
                ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
                : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
            iconSize: [30, 45],
          }),
        });
      },
      // ✅ Ensure panel is hidden
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      routeWhileDragging: false,
      showAlternatives: false,
      collapsible: false,
    }).addTo(map);

    // ✅ Remove routing panel DOM manually if it still renders
    const panel = document.querySelector(".leaflet-routing-container");
    if (panel) panel.style.display = "none";

    setRoutingControl(control);

    return () => {
      map.removeControl(control);
    };
  }, [map, userLocation, eventCoordinates]);

  return null;
};

Routing.propTypes = {
  userLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  eventCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MapComponent;
