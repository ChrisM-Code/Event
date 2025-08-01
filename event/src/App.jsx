import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AppLayout from "./ui/AppLayout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Directions from "./components/Directions/Directions";
import MapComponent from "./components/Directions/Maps/MapComponent";
import { MapProvider } from "./components/Directions/Maps/MapContext";
import NavBar from "./components/Home/NavBar";
import EventPro from "./components/Events/EventPro";

const App = () => {
  const [newEventPosted, setNewEventPosted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewEventPosted(true);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleHighlightClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <MapProvider>
      <NavBar
        hasNewEvent={newEventPosted}
        onHighlightClick={handleHighlightClick}
      />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="events"
            element={
              <EventPro
                onHighlightClick={handleHighlightClick}
                modalOpen={modalOpen}
                selectedEvent={selectedEvent}
                onCloseModal={handleCloseModal}
              />
            }
          />
          <Route path="directions" element={<Directions />} />
          <Route path="map" element={<MapComponent />} />
        </Route>
      </Routes>
    </MapProvider>
  );
};

export default App;
