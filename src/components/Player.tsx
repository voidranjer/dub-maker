import ReactPlayer from "react-player";
import useClearVideo from "src/hooks/useClear";
import UploadSubs from "src/components/UploadSubs";
import { useEffect, useRef, useState } from "react";
import SubSeeker from "src/components/SubSeeker";
import useSubtitles from "src/hooks/useSubtitles";
import useAutoStop from "src/hooks/useAutoStop";
import AudioRecorder from "src/components/AudioRecorder";
import round from "src/utils/round";
import { SubtitleStore } from "src/types/subtitles";

export default function Player({ url }: { url: string }) {
  const player = useRef<ReactPlayer>(null);
  const { mutate: deleteVideo, isLoading: deleteLoading } = useClearVideo();
  const { data, isLoading: subsLoading } = useSubtitles();
  const subs: SubtitleStore = data as SubtitleStore;
  const {
    setCurrSeconds,
    setCurrStart,
    isPlaying,
    currStart,
    currDuration,
    currSeconds,
  } = useAutoStop(subs);

  const [muted, setMuted] = useState(false);
  const [playheadStart, setPlayheadStart] = useState(0);
  const [playheadEnd, setPlayheadEnd] = useState(0);
  const recordingStore = { 4.1: { duration: 2.0 } };
  const roundedCurrSecs = round(currSeconds);
  useEffect(() => {
    if (!subs) return;

    // Note: This specific order of if-statements are required for optimal mute/unmute performance, tested.
    if (Object.keys(subs.startToId).includes(roundedCurrSecs.toString())) {
      setPlayheadEnd(subs.subtitles[subs.startToId[roundedCurrSecs]].end);
      setPlayheadStart(roundedCurrSecs);
      setMuted(true);
      return;
    }

    if (muted && roundedCurrSecs >= playheadEnd) {
      setMuted(false);
      return;
    }
    // else setMuted(false);
  }, [currSeconds]);

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
          muted={muted}
        />
      </div>

      <div>
        <AudioRecorder start={currStart} duration={currDuration} />
      </div>
    </div>
  );
}
