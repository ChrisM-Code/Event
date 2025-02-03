import styled from "styled-components";
import { FaCalendarAlt, FaMapMarkerAlt, FaDirections } from "react-icons/fa";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    width: 90%;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #fb923c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 150px;

  &:hover {
    background-color: #ff4500;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: none;
  }
`;

const Buttons = () => {
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  return (
    <ButtonContainer>
      <Button onClick={() => handleRedirect("/events")}>
        <FaCalendarAlt /> Events
      </Button>
      <Button onClick={() => handleRedirect("/directions")}>
        <FaMapMarkerAlt /> Map
      </Button>
      <Button onClick={() => handleRedirect("/directions")}>
        <FaDirections /> Directions
      </Button>
    </ButtonContainer>
  );
};

export default Buttons;
