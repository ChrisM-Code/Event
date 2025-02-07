import { Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Events from "./components/Events/Events";
import Directions from "./components/Directions/Directions";

import MapComponent from "./components/Directions/Maps/MapComponent";
import { MapProvider } from "./components/Directions/Maps/MapContext";

const App = () => {
  return (
    <MapProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<Events />} />
          <Route path="directions" element={<Directions />} />
          <Route path="/map" element={<MapComponent />} />
        </Route>
      </Routes>
    </MapProvider>
  );
};

export default App;
