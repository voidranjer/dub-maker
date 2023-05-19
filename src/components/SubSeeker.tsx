import ReactPlayer from "react-player";
import useSubtitles from "src/hooks/useSubtitles";

interface PropType {
  player: React.RefObject<ReactPlayer>;
}

export default function SubSeeker({ player }: PropType) {
  const { data: subs, isLoading, isError, error } = useSubtitles();

  if (isLoading) return <>Loading subtitles...</>;
  if (!subs || subs?.length === 0) return <>No subtitles uploaded...</>;
  if (!player || player.current === null) return <>Waiting for player...</>;

  return (
    <div className="subtitle-container">
      {subs.map((sub) => (
        <a
          key={sub.id}
          className="subtitle-line"
          onClick={() => {
            player.current?.seekTo(parseFloat(sub.startSeconds.toString()));
          }}
        >
          {sub.text}
        </a>
      ))}
    </div>
  );
}
