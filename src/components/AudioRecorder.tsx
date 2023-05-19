import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { RecordingSnippet, RecordingStore } from "src/types/recordings";

export default function AudioRecorder() {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
  } = useAudioRecorder();
  const [recordings, setRecordings] = useState<RecordingStore>({});

  useEffect(() => {
    if (!recordingBlob) return;

    const snippet: RecordingSnippet = {
      audioBlob: recordingBlob,
      startSeconds: 0,
      endSeconds: 0,
    };
    setRecordings((prev) => ({ ...prev, 0: snippet }));
  }, [recordingBlob]);

  return (
    <div className="audio-container">
      {isRecording ? (
        <button className="recording-button" onClick={stopRecording}>
          Stop
        </button>
      ) : (
        <button onClick={startRecording}>Record</button>
      )}
    </div>
  );
}
