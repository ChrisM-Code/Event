import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create Context
export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [mapView, setMapView] = useState({
    center: [0.0236, 37.9062], // Default to Kenya
    zoom: 13,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapView({
            center: [position.coords.latitude, position.coords.longitude],
            zoom: 13,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Keep the default location if geolocation fails
        }
      );
    }
  }, []);

  return (
    <MapContext.Provider value={{ mapView }}>{children}</MapContext.Provider>
  );
};

MapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MapProvider;
