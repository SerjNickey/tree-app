import styled from "styled-components";

export const Text = styled.p`
  color: #333;
  font-size: 16px;
  margin: 10px 0;
  padding-right: 30px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  position: relative;
  z-index: 1001;

  h2 {
    color: #333;
  }

  > * {
    margin: 10px 0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  z-index: 1002;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;

  &.cancel {
    background-color: #e0e0e0;
    color: #333;

    &:hover {
      background-color: #d0d0d0;
    }
  }

  &.add {
    background-color: #646cff;
    color: white;

    &:hover {
      background-color: #535bf2;
    }
  }
`;
