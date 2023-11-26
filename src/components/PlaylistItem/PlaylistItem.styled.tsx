import styled from "styled-components";

export const PlaylistItemContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const PlaylistThumbnail = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 5px;
  object-fit: cover;
`;

export const PlaylistTextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  padding: 4px 0;
  box-sizing: border-box;
  flex-direction: column;
  gap: 4px;
`;

export const PlaylistText = styled.span`
  color: ${(props) => props.theme.white};
`;

export const PlaylistSubText = styled.div`
  color: ${(props) => props.theme.lightGrey};
`;
