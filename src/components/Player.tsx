import ReactPlayer from "react-player";

export default function Player({ url }: { url: string }) {
  return (
    <div>
      <ReactPlayer url={url} controls={true} />
    </div>
  );
}
