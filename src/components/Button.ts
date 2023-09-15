import styled from "styled-components";

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid #171212;
  padding: 5px;
  cursor: pointer;

  transition: all 0.1s ease-in;

  &:hover {
    background: #171212;
    color: #ffffff;
  }
`;

export const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
`;

export const StyledButtonLarge = styled(StyledButton)`
  padding: 10px;
`;