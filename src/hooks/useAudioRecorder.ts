import { useRef, useState } from "react";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";
import sleep from "src/utils/sleep";

export default function useAudioRecorder(callbackFn: (blob: Blob) => void) {
  const [stream, setStream] = useState<MediaStream>(new MediaStream());
  const [blob, setBlob] = useState(null);
  const recorderRef = useRef(null);

  async function startRecording(autostop = 0) {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setStream(mediaStream);
    recorderRef.current = new RecordRTC(mediaStream, { type: "audio" });
    // if (autostop > 0) recorderRef.current.setRecordingDuration(autostop);
    recorderRef.current.startRecording();
    await sleep(autostop);
    handleStop();
  }

  async function handleStop() {
    recorderRef.current.stopRecording((blobURL) => {
      // console.log(blobURL);
      const recordedBlob = recorderRef.current.getBlob();
      setBlob(recordedBlob);
      callbackFn(recordedBlob);
    });
  }

  function handleSave() {
    invokeSaveAsDialog(blob);
  }

  return { stream, blob, startRecording };
}
