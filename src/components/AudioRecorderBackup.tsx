import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { RecordingSnippet, RecordingStore } from "src/types/recordings";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import sleep from "src/utils/sleep";

interface PropsType {
  start: number;
  duration: number;
}

export default function AudioRecorder({ start, duration }: PropsType) {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();
  const [recordings, setRecordings] = useState<RecordingStore>({});

  useEffect(() => {
    if (!recordingBlob) return;
    const snippet: RecordingSnippet = { audioBlob: recordingBlob };
    setRecordings((prev) => ({ ...prev, [start]: snippet }));
  }, [recordingBlob]);

  async function handleClick() {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
    // await sleep(duration);
    // stopRecording();
  }

  return (
    <div className="audio-container">
      {isRecording ? (
        <>
          <button className="recording-button" onClick={stopRecording}>
            Stop
          </button>
          {/* <CountdownCircleTimer
            isPlaying
            duration={duration / 1000}
            size={100}
            strokeWidth={10}
            colors={["#72CC50", "#72CC50", "#72CC50", "#B8293D"]}
            colorsTime={[10, 10, 2, 0]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer> */}
          <div>TODO: Disable button at 0 or when video aint loaded yet</div>
        </>
      ) : (
        <>
          <button onClick={handleClick}>Record</button>
          {/* <button onClick={handlePlay}>Play</button> */}
        </>
      )}
    </div>
  );
}
