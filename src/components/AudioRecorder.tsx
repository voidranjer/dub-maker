import useAudioRecorder from "src/hooks/useAudioRecorder";

export default function AudioRecorder() {
  const { startRecording } = useAudioRecorder((blob) => console.log(blob));

  return (
    <div className="audio-contaienr">
      <button onClick={() => startRecording(1000)}>Record</button>
    </div>
  );
}
