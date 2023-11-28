import { useEffect, useState } from "react";
import {
  MainApp,
  Content,
  SideBar,
  StyledApp,
  ListContainer,
} from "./App.styled";
import { Container, Icon, PlaylistItem, TitleBar } from "./components";
import { EVENTS } from "./events";
import { youtube_v3 } from "googleapis";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [playlists, setPlaylists] = useState<youtube_v3.Schema$Playlist[]>([]);

  useEffect(() => {
    const playlistReciever =  window.api.receive<youtube_v3.Schema$Playlist[]>(EVENTS.LOAD_PLAYLISTS, (playlists) => {
      setPlaylists(playlists);
    });

    window.api.send(EVENTS.REQUEST_PLAYLISTS, null);

    return () => {
      playlistReciever();
    }
  }, []);

  return (
    <StyledApp>
      <TitleBar />
      <MainApp>
        <SideBar>
          <ListContainer>
            <Icon
              icon="home"
              text="Home"
              active={activePage === "home"}
              onClick={() => setActivePage("home")}
            />
            <Icon
              icon="search"
              text="Search"
              active={activePage === "search"}
              onClick={() => setActivePage("search")}
            />
          </ListContainer>
          <ListContainer style={{ flex: 1 }}>
            <Icon
              icon="library_music"
              text="Your Library"
              active={activePage === "library"}
              onClick={() => setActivePage("library")}
            />
            {playlists.map((playlist) => (<PlaylistItem key={playlist.id} playlist={playlist} />))}
          </ListContainer>
        </SideBar>
        <Content>
          <Container></Container>
        </Content>
      </MainApp>
    </StyledApp>
  );
}

export default App;
