import ReactPlayer from "react-player";
import useClearVideo from "src/hooks/useClear";
import UploadSubs from "src/components/UploadSubs";
import { useEffect, useRef, useState } from "react";
import SubSeeker from "src/components/SubSeeker";
import useSubtitles from "src/hooks/useSubtitles";
import useAutoStop from "src/hooks/useAutoStop";
import AudioRecorder from "src/components/AudioRecorder";
import round from "src/utils/round";

export default function Player({ url }: { url: string }) {
  const player = useRef<ReactPlayer>(null);
  const { mutate: deleteVideo, isLoading: deleteLoading } = useClearVideo();
  const { data: subs, isLoading: subsLoading } = useSubtitles();
  const {
    setCurrSeconds,
    setCurrStart,
    isPlaying,
    currStart,
    currDuration,
    currSeconds,
  } = useAutoStop(subs);

  // const [muted, setMuted] = useState(false);
  // const [playheadDuration, setPlayheadDuration] = useState(0);
  // const [playheadStart, setPlayheadStart] = useState(0);
  // const recordingStore = { 4.1: { duration: 2.0 } };
  // useEffect(() => {
  //   const roundedCurrSecs = round(currSeconds);

  //   if (muted && roundedCurrSecs - playheadStart >= playheadDuration) {
  //     setMuted(false);
  //     return;
  //   }

  //   if (Object.keys(recordingStore).includes(roundedCurrSecs.toString())) {
  //     setPlayheadStart(roundedCurrSecs);
  //     setMuted(true);
  //     setPlayheadDuration(recordingStore[roundedCurrSecs].duration);
  //   }
  //   // else setMuted(false);
  // }, [currSeconds]);

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
          <SubSeeker
            player={player}
            subs={subs}
            currSeconds={currSeconds}
            setCurrStart={setCurrStart}
          />
        )}

        <ReactPlayer
          ref={player}
          url={url}
          playing={isPlaying}
          progressInterval={1}
          // onSeek={(playedSeconds) => setCurrStart(round(playedSeconds - 0.1))}
          // WARNING: bug when seeking using player controls instead of SubSeeker: "sub is undefined" because the selected seconds in the player controls does not have a subtitle that starts at the exact same second
          onProgress={(obj) => setCurrSeconds(obj.playedSeconds)}
          fallback={<>Player loading...</>}
          controls={true}
          // muted={muted}
        />
      </div>

      <div>
        <AudioRecorder start={currStart} duration={currDuration} />
      </div>
    </div>
  );
}
