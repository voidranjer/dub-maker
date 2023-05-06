import ReactPlayer from "react-player";
import useClearVideo from "src/hooks/useClearVideo";
import UploadSubs from "src/components/UploadSubs";
import { useRef, useState } from "react";
import SubSeeker from "src/components/SubSeeker";

export default function Player({ url }: { url: string }) {
  const player = useRef(null);
  const [subs, setSubs] = useState([]);
  const { mutate: deleteVideo, isLoading } = useClearVideo();

  return (
    <div>
      <div className="grid">
        <UploadSubs setSubs={setSubs} />
        <button
          className="standard-button"
          onClick={deleteVideo}
          aria-busy={isLoading ? "true" : "false"}
          disabled={isLoading}
        >
          Delete
        </button>
      </div>

      <div className="grid">
        <SubSeeker subs={subs} player={player.current} />
        <ReactPlayer ref={player} url={url} controls={true} />
      </div>
    </div>
  );
}
