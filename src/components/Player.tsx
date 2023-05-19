import ReactPlayer from "react-player";
import useClearVideo from "src/hooks/useClear";
import UploadSubs from "src/components/UploadSubs";
import { useRef } from "react";
import SubSeeker from "src/components/SubSeeker";
import AudioRecorder from "src/components/AudioRecorder";
import useSubtitles from "src/hooks/useSubtitles";

export default function Player({ url }: { url: string }) {
  const player = useRef<ReactPlayer>(null);
  const { mutate: deleteVideo, isLoading: deleteLoading } = useClearVideo();
  const { data: subs, isLoading: subsLoading } = useSubtitles();

  return (
    <div>
      <div className="grid">
        <UploadSubs />
        <button
          className="standard-button"
          onClick={() => deleteVideo()}
          aria-busy={deleteLoading ? "true" : "false"}
          disabled={deleteLoading}
        >
          Delete
        </button>
      </div>

      <div className="grid">
        {subsLoading ? (
          <>Subtitles Loading...</>
        ) : (
          <SubSeeker player={player} subs={subs} />
        )}

        <ReactPlayer
          ref={player}
          url={url}
          controls={true}
          // onSeek={(playedSeconds) => console.log(subs[playedSeconds].end)}
          // onProgress={(obj) => console.log(obj)}
        />
      </div>

      <div>
        <AudioRecorder />
      </div>
    </div>
  );
}
