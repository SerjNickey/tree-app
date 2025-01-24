import styled from "styled-components";

export const RootContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 5px 0;
`;

export const ButtonContainer = styled.div`
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
  background: transparent;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: white;
  text-align: center;
`;
