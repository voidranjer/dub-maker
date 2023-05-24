import ReactPlayer from "react-player";
import { SubtitleStore } from "src/types/subtitles";

interface PropsType {
  player: React.RefObject<ReactPlayer>;
  subs: SubtitleStore | undefined;
  currSeconds: number;
  setCurrStart: (seconds: number) => void;
}

export default function SubSeeker({
  player,
  subs,
  currSeconds,
  setCurrStart,
}: PropsType) {
  if (!subs) return <>No subtitles uploaded...</>;
  if (!player || player.current === null) return <>Waiting for player...</>;

  return (
    <div className="subtitle-container">
      {subs.subtitles.map((sub) => (
        <a
          key={sub.id}
          className={
            currSeconds >= sub.start && currSeconds < sub.end
              ? "subtitle-playing"
              : "subtitle-line"
          }
          onClick={() => {
            player.current?.seekTo(sub.start);
            setCurrStart(sub.start);
          }}
        >
          {sub.text}
        </a>
      ))}
    </div>
  );
}
