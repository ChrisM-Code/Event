import React, { useState } from "react";
import styled from "styled-components";
import { FaRegBell } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }
`;

const HighlightButton = styled.button`
  background-color: #ffbc85;
  color: white;
  border: none;
  padding: 0.5rem 0.5rem;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #2dd4bf;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const CloseButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
`;

function Highlights() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <HighlightButton onClick={() => setShowModal(true)}>
        <FaRegBell />
      </HighlightButton>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Notification Details</h2>
            <p>Here are some details about the highlights...</p>
            <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default Highlights;
