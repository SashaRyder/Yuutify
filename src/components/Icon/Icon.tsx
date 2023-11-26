import { StyledIcon } from "./Icon.styled";

const Icon = ({ icon, text, onClick, active }: { icon: string; text?: string; onClick?: () => void; active?: boolean }) => {
  return (
    <StyledIcon onClick={onClick && onClick} clickable={!!onClick} active={active}>
      <span className="material-symbols-outlined">{icon}</span>
      {text && <p>{text}</p>}
    </StyledIcon>
  );
};

export { Icon };
