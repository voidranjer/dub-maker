import ReactPlayer from "react-player";
import useClearVideo from "src/hooks/useClear";
import UploadSubs from "src/components/UploadSubs";
import { useRef } from "react";
import SubSeeker from "src/components/SubSeeker";
import AudioRecorder from "src/components/AudioRecorder";
import useSubtitles from "src/hooks/useSubtitles";
import useAutoStop from "src/hooks/useAutoStop";

export default function Player({ url }: { url: string }) {
  const player = useRef<ReactPlayer>(null);
  const { mutate: deleteVideo, isLoading: deleteLoading } = useClearVideo();
  const { data: subs, isLoading: subsLoading } = useSubtitles();
  const { setCurrSeconds, setCurrStart, isPlaying } = useAutoStop(subs);

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
          playing={isPlaying}
          progressInterval={1}
          onSeek={(playedSeconds) => setCurrStart(playedSeconds)}
          onProgress={(obj) => setCurrSeconds(obj.playedSeconds)}
          fallback={<>Player loading...</>}
        />
      </div>

      <div>
        <AudioRecorder />
      </div>
    </div>
  );
}
