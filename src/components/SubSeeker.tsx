import ReactPlayer from "react-player";
import { SubtitleStore } from "src/types/subtitles";

interface PropsType {
  player: React.RefObject<ReactPlayer>;
  subs: SubtitleStore | undefined;
  currSeconds: number;
}

export default function SubSeeker({ player, subs, currSeconds }: PropsType) {
  if (!subs || Object.keys(subs).length === 0)
    return <>No subtitles uploaded...</>;
  if (!player || player.current === null) return <>Waiting for player...</>;

  return (
    <div className="subtitle-container">
      {Object.keys(subs).map((start) => (
        <a
          key={start}
          className={
            currSeconds >= parseFloat(start)
              ? "subtitle-played"
              : "subtitle-line"
          }
          onClick={() => player.current?.seekTo(parseFloat(start))}
        >
          {subs[start].text}
        </a>
      ))}
    </div>
  );
}
