import styled from "styled-components";
import { Container } from "./components";

export const SideBar = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Content = styled.div`
  grid-area: content;
  ${Container} {
    height: 100%;
  }
`;

export const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainApp = styled.div`
  padding: 8px;
  display: grid;
  box-sizing: border-box;
  grid-template-areas: "sidebar content content content";
  grid-gap: 8px;
  flex: 1;
`;

export const ListContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  color: ${(props) => props.theme.white};
`;
