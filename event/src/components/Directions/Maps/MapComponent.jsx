import { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapContext } from "./MapContext";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";

const StyledMapContainer = styled(MapContainer)`
  height: 500px;
  width: 100%;
  border-radius: 10px;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

const MapComponent = () => {
  const { mapView } = useContext(MapContext);

  return (
    <StyledMapContainer center={mapView.center} zoom={mapView.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={mapView.center}>
        <Popup>You are here!</Popup>
      </Marker>
    </StyledMapContainer>
  );
};

export default MapComponent;
