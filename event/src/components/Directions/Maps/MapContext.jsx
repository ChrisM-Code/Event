import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create Context
export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [mapView, setMapView] = useState({
    center: [0.0236, 37.9062], // Default to Kenya
    zoom: 13,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false); // ✅ Added visibility state

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setMapView({
            center: [position.coords.latitude, position.coords.longitude],
            zoom: 13,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const updateDestination = (location) => {
    setDestination(location);
    setIsMapVisible(true); // ✅ Trigger map to show
  };

  return (
    <MapContext.Provider
      value={{
        mapView,
        userLocation,
        destination,
        isMapVisible,
        updateDestination,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

MapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MapProvider;
