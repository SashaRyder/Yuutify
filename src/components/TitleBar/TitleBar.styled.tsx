import styled from "styled-components";

export const Background = styled.div`
  -webkit-app-region: drag;
  width: 100%;
  height: 32px;
  background-color: ${(props) => props.theme.black};
  color: ${(props) => props.theme.white};
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  grid-area: header;
`;

export const Preferences = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  -webkit-app-region: no-drag;
  user-select: none;
  cursor: pointer;

  span {
    font-size: 32px;
  }
`;

export const AppOptions = styled.div`
  display: flex;
`;

export const AppOption = styled.div<{ close?: boolean }>`
  -webkit-app-region: no-drag;
  box-sizing: border-box;
  padding: 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${(props) =>
      props.close ? props.theme.red : props.theme.hoverGrey};
  }
`;
