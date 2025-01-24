import { Outlet } from "react-router-dom";
import NavBar from "../components/Home/NavBar";

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
