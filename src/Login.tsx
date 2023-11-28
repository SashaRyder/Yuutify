import { useEffect } from "react";
import { EVENTS } from "./events";
import { useNavigate } from "react-router-dom";
import { LoginAppName, LoginButton, LoginContainer, LoginText } from "./Login.styled";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authEvent = window.api.receive(EVENTS.AUTHENTICATED, () => {
      navigate("/app");
    });

    window.api.send(EVENTS.APP_READY, null);    
    return () => {
      authEvent();
    };
  }, []);

  return (
    <LoginContainer>
      <LoginAppName>Yuutify</LoginAppName>
      <LoginText>
        Please authenticate Yuutify to access your YouTube account
      </LoginText>
      <LoginButton onClick={() => window.api.send(EVENTS.OPEN_AUTHENTICATE_URL, null)}>Authenticate</LoginButton>
    </LoginContainer>
  );
};

export { Login };
