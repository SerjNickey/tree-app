import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 10px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  left: 100%;
  display: flex;
  gap: 10px;
  margin-left: 10px;
`;

export const NodeContainer = styled.div`
  margin-left: 20px;
`;

export const Card = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledInput = styled.input`
  width: calc(100% - 20px);
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;

  &::placeholder {
    color: #999;
  }
`;

export const Button = styled.button`
  background-color: #646cff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: #535bf2;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: white;
  text-align: center;
`;
