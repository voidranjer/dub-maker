import { useEffect, useRef, useState } from "react";
import vars from "src/lib/vars";
import { RecordingStore } from "src/types/recordings";
import playBlob from "src/utils/playBlob";

export type AddRecordingFnType = (
  start: number,
  end: number,
  audioBlob: Blob
) => void;

export default function useRecording(
  playedSecondsRef: React.MutableRefObject<number>
) {
  const recordingsRef = useRef<RecordingStore>({});
  const [shouldMute, setMuted] = useState(false);
  const playheadEndRef = useRef(0); // useState works here too! (i've decided to use useRef to potentially reduce rerenders)

  const addRecording: AddRecordingFnType = (
    start: number,
    end: number,
    audioBlob: Blob
  ) => {
    recordingsRef.current = {
      ...recordingsRef.current,
      [start]: { end, audioBlob },
    };
  };

  // Stale Closure Problem: https://stackoverflow.com/questions/65253665/settimeout-for-this-state-vs-usestate/66435915#66435915
  const shouldMuteRef = useRef(shouldMute);
  useEffect(() => {
    shouldMuteRef.current = shouldMute;
  }, [shouldMute]);
  function autoReplaceAudio() {
    const recordings = recordingsRef.current;
    const playedSeconds = playedSecondsRef.current;
    const shouldMute = shouldMuteRef.current;

    // Note: This specific order of if-statements are required for optimal mute/unmute performance, tested.
    if (!shouldMute && playedSeconds in recordings) {
      playheadEndRef.current = recordings[playedSeconds].end;
      setMuted(true);
      playBlob(recordings[playedSeconds].audioBlob);
      return;
    }

    if (shouldMute && playedSeconds >= playheadEndRef.current) {
      setMuted(false);
      return;
    }
    //  else setMuted(false);
  }

  useEffect(() => {
    setInterval(autoReplaceAudio, vars.progressInterval);
  }, []);

  return { addRecording, shouldMute };
}
