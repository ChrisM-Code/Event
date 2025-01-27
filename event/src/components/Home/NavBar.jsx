import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";

const NavbarWrapper = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fb923c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    transition: color 0.3s ease;

    &.active {
      color: #2dd4bf;
      text-decoration: underline;
    }

    &:hover {
      color: #2dd4bf;
    }
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    gap: 0.5rem;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    align-items: center;
    background-color: rgba(251, 146, 60, 0.95);
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close the menu when the route changes
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <NavbarWrapper>
      <Logo />
      <MenuIcon onClick={toggleMenu}>{menuOpen ? "✖" : "☰"}</MenuIcon>
      <NavLinks isOpen={menuOpen}>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/about"
          className={location.pathname === "/about" ? "active" : ""}
        >
          About
        </Link>
        <Link
          to="/event"
          className={location.pathname === "/event" ? "active" : ""}
        >
          Event
        </Link>
      </NavLinks>
    </NavbarWrapper>
  );
}

export default NavBar;
