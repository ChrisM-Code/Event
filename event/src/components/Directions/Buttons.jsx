import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCalendarAlt, FaMapMarkerAlt, FaDirections } from "react-icons/fa";
import Modal from "./Modal"; // Assume you have a Modal component
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    width: 90%;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #fb923c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 150px;

  &:hover {
    background-color: #ff4500;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: none;
  }
`;

const Buttons = ({ events }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error fetching location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleEventSelection = (event) => {
    setSelectedEvent(event);
  };

  return (
    <>
      <ButtonContainer>
        <Button onClick={() => (window.location.href = "/events")}>
          <FaCalendarAlt /> Events
        </Button>

        <Button onClick={() => setShowModal(true)}>
          <FaDirections /> Directions
        </Button>
      </ButtonContainer>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Select an Event</h2>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <button onClick={() => handleEventSelection(event)}>
                  {event.title} - {event.location}
                </button>
              </li>
            ))}
          </ul>
        </Modal>
      )}
      {selectedEvent && userLocation && (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>
          <Marker position={[selectedEvent.lat, selectedEvent.lng]}>
            <Popup>{selectedEvent.title}</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Buttons;
