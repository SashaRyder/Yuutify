import { youtube_v3 } from "googleapis"
import { PlaylistItemContainer, PlaylistSubText, PlaylistText, PlaylistTextContainer, PlaylistThumbnail } from "./PlaylistItem.styled"

const PlaylistItem = ({playlist}: {playlist: youtube_v3.Schema$Playlist}) => {

    const getThumbnail = (): string => {
        if(!playlist.snippet?.thumbnails) {
            return '';
        }

        return (
            playlist.snippet?.thumbnails.maxres?.url || 
            playlist.snippet?.thumbnails.high?.url || 
            playlist.snippet?.thumbnails.medium?.url ||
            playlist.snippet?.thumbnails.standard?.url ||
            playlist.snippet?.thumbnails.default?.url ||
            ''
            );
    }

  return (
    <PlaylistItemContainer>
        <PlaylistThumbnail src={getThumbnail()}  />
        <PlaylistTextContainer>
            <PlaylistText>{playlist.snippet?.title}</PlaylistText>
            <PlaylistSubText>{playlist.contentDetails?.itemCount} songs</PlaylistSubText>
        </PlaylistTextContainer>
    </PlaylistItemContainer>
  )
}

export {PlaylistItem }