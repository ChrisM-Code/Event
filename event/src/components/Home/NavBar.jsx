import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div``;
const Header = styled.h1``;
const NavLinksContainer = styled.div``;
const NavLinks = styled.nav``;

function NavBar() {
  return (
    <NavContainer>
      <Header>XYZ CO</Header>

      <NavLinksContainer>
        <NavLinks>
          <Link to="/home">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/Directions">Directions</Link>
        </NavLinks>
      </NavLinksContainer>
    </NavContainer>
  );
}

export default NavBar;
