import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
    // Здесь можно добавить дополнительные пропсы при необходимости
}

export const StyledInput = (props: StyledInputProps) => {
    return <Input {...props} />;
}; 