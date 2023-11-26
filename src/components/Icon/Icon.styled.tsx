import styled from "styled-components";

export const StyledIcon = styled.div<{clickable?: boolean, active?: boolean}>`
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
  cursor: ${(props) => props.clickable ? "pointer" : "default"};
  color: ${(props) => props.active ? props.theme.white : props.theme.lightGrey};
  font-weight: bold;
  padding: 8px 16px;
  transition: color 0.25s ease-in-out;

  .material-symbols-outlined {
    font-variation-settings: 'FILL' ${(props) => props.active ? 1 : 0};
  }

  p {
    margin: 0;
    padding: 0;
  }

  &:hover {
    color: ${(props) => props.theme.white};
  }
`;
