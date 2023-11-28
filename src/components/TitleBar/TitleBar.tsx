import { EVENTS } from "../../events";
import {
  AppOption,
  AppOptions,
  Background,
  Preferences,
} from "./TitleBar.styled";

const TitleBar = () => {

  const closeApp = () => {
    window.api.send(EVENTS.QUIT, null);
  }
  
  return (
    <Background>
      <Preferences>
        <span className="material-symbols-outlined">more_horiz</span>
      </Preferences>
      <AppOptions>
        <AppOption>
          <span className="material-symbols-outlined">minimize</span>
        </AppOption>
        <AppOption>
          <span className="material-symbols-outlined">square</span>
        </AppOption>
        <AppOption close={true} onClick={closeApp}>
          <span className="material-symbols-outlined">close</span>
        </AppOption>
      </AppOptions>
    </Background>
  );
};

export { TitleBar };
