import { createContext, useState } from "react";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [userLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);

  const updateDestination = (newDestination) => {
    setDestination(newDestination);
    setIsMapVisible(true); // Ensure map updates when a new event is clicked
  };

  return (
    <MapContext.Provider
      value={{ userLocation, destination, isMapVisible, updateDestination }}
    >
      {children}
    </MapContext.Provider>
  );
};
