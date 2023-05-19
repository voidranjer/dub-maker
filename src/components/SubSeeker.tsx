import ReactPlayer from "react-player";
import { SubtitleStore } from "src/types/subtitles";

interface PropType {
  player: React.RefObject<ReactPlayer>;
  subs: SubtitleStore | undefined;
}

export default function SubSeeker({ player, subs }: PropType) {
  if (!subs || Object.keys(subs).length === 0)
    return <>No subtitles uploaded...</>;
  if (!player || player.current === null) return <>Waiting for player...</>;

  return (
    <div className="subtitle-container">
      {Object.keys(subs).map((start) => (
        <a
          key={start}
          className="subtitle-line"
          onClick={() => player.current?.seekTo(parseFloat(start))}
        >
          {subs[start].text}
        </a>
      ))}
    </div>
  );
}
