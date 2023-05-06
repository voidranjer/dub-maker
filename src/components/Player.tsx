import ReactPlayer from "react-player";
import useClearVideo from "src/hooks/useClearVideo";
import UploadSubs from "src/components/UploadSubs";
import { useState } from "react";

export default function Player({ url }: { url: string }) {
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
        <div className="subtitle-container">
          {subs.map((sub) => (
            <a key={sub.id} className="subtitle-line">
              {sub.text}
            </a>
          ))}
        </div>
        <ReactPlayer url={url} controls={true} />
      </div>
    </div>
  );
}
