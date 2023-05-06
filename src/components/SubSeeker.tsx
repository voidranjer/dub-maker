export default function SubSeeker({ subs, player }) {
  if (!player) return <>Waiting for player...</>;

  return (
    <div className="subtitle-container">
      {subs.map((sub) => (
        <a
          key={sub.id}
          className="subtitle-line"
          onClick={() => {
            player.seekTo(parseFloat(sub.startSeconds));
          }}
        >
          {sub.text}
        </a>
      ))}
    </div>
  );
}
