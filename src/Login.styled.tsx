import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${(props) => props.theme.white};
`;

export const LoginAppName = styled.h1``;

export const LoginText = styled.h2``;

export const LoginButton = styled.button`
  width: 100%;
  max-width: 200px;
  height: 40px;
  background: ${(props) => props.theme.lightGrey};
  border: 0;
  color: ${(props) => props.theme.black};
  font-size: 16px;
  cursor: pointer;
`;
