import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fb923c;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    backdrop-filter: blur(10px);
    background-color: #fb923c;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #2dd4bf;
    }

    &.active {
      color: #2dd4bf;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: rgba(251, 146, 60, 0.8);
    backdrop-filter: blur(10px);
    padding: 1rem;
    gap: 0.6rem;
    align-items: center;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  color: black;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
          to="/events"
          className={location.pathname === "/events" ? "active" : ""}
        >
          Events
        </Link>
        <Link
          to="/direction"
          className={location.pathname === "/direction" ? "active" : ""}
        >
          Direction
        </Link>
        <Link
          to="/contact"
          className={location.pathname === "/contact" ? "active" : ""}
        >
          Contact
        </Link>
      </NavLinks>
    </NavbarWrapper>
  );
}

export default NavBar;
