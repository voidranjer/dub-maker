import ReactPlayer from "react-player";
import { SubtitleStoreType, SubtitleType } from "src/types/subtitles";

interface PropsType {
  player: React.RefObject<ReactPlayer>;
  subs: SubtitleStoreType | undefined;
  currSeconds: number;
  currStart: number;
  setCurrStart: (seconds: number) => void;
}

export default function SubSeeker({
  player,
  subs,
  currSeconds,
  currStart,
  setCurrStart,
}: PropsType) {
  if (!subs || !subs.subtitles) return <>No subtitles uploaded...</>;
  if (!player || player.current === null) return <>Waiting for player...</>;

  function getClassName(sub: SubtitleType) {
    if (sub.start == currStart) return "subtitle-current";
    if (currSeconds >= sub.start && currSeconds < sub.end)
      return "subtitle-playing";
    return "subtitle-line";
  }

  return (
    <div className="subtitle-container">
      {subs.subtitles.map((sub) => (
        <a
          key={sub.id}
          className={getClassName(sub)}
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
