import useAudioRecorder from "src/hooks/useAudioRecorder";
import { AddRecordingFnType } from "src/hooks/useRecordingStore";

interface PropsType {
  start: number;
  end: number;
  addRecording: AddRecordingFnType;
}

export default function AudioRecorder({ start, end, addRecording }: PropsType) {
  const { startRecording } = useAudioRecorder((blob) =>
    addRecording(start, end, blob)
  );

  if (end <= 0) return <></>;

  return (
    <div className="audio-container">
      <button onClick={() => startRecording((end - start) * 1000)}>
        Record
      </button>
    </div>
  );
}
