import useSubtitles from "src/hooks/useSubtitles";

export default function SubSeeker({ player }) {
  const { data: subs, isLoading, isError, error } = useSubtitles();

  if (isLoading) return <>Loading subtitles...</>;
  if (!subs || subs?.length === 0) return <>No subtitles uploaded...</>;
  if (!player) return <>Waiting for player...</>;

  return (
    <div className="subtitle-container">
      {subs.map((sub) => (
        <a
          key={sub.id}
          className="subtitle-line"
          onClick={() => {
            player.current.seekTo(parseFloat(sub.startSeconds));
          }}
        >
          {sub.text}
        </a>
      ))}
    </div>
  );
}
