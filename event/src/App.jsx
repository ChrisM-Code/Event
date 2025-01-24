import { Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./components/Home/Home";
import About from "./components/About/About";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
