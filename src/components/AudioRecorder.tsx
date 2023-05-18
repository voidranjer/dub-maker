import { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

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

  useEffect(() => {
    if (!recordingBlob) return;

    console.log(recordingBlob);
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
