import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #cc0000;
  }
`;

const Modal = ({ children, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        {children}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
