import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fb923c;
  padding: 1rem 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  }
`;

function NavBar() {
  return (
    <NavbarWrapper>
      <Logo />
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/direction">Direction</Link>
      </NavLinks>
    </NavbarWrapper>
  );
}

export default NavBar;
