import { useEffect, useState } from "react";
import useAudioRecorder from "src/hooks/useAudioRecorder";
import { AddRecordingFnType } from "src/hooks/useRecordings";
import { SubtitleStoreType } from "src/types/subtitles";

interface PropsType {
  start: number;
  subs: SubtitleStoreType | undefined;
  addRecording: AddRecordingFnType;
}

export default function AudioRecorder({
  start,
  subs,
  addRecording,
}: PropsType) {
  const [end, setEnd] = useState(-1);
  const { startRecording } = useAudioRecorder((blob) =>
    addRecording(start, end, blob)
  );

  useEffect(() => {
    if (subs === undefined) return;

    if (!(start in subs.startToId)) {
      setEnd(-1);
      return;
    }

    const id = subs.startToId[start];
    const sub = subs.subtitles[id];
    setEnd(sub.end);
  }, [start, subs]);

  if (end === -1)
    return (
      <>Error: AudioRecorder component can't find duration of the curent line</>
    );

  if (subs === undefined) return <>Upload subtitles to record...</>;

  return (
    <div className="audio-container">
      <button onClick={() => startRecording((end - start) * 1000)}>
        Record
      </button>
    </div>
  );
}
