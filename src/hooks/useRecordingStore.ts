import { useState } from "react";
import { RecordingStore } from "src/types/recordings";

export type AddRecordingFnType = (
  start: number,
  end: number,
  audioBlob: Blob
) => void;

export default function useRecordingStore() {
  const [recordings, setRecordings] = useState<RecordingStore>({});

  const addRecording: AddRecordingFnType = (
    start: number,
    end: number,
    audioBlob: Blob
  ) => {
    setRecordings((prev) => ({ ...prev, [start]: { end, audioBlob } }));
  };

  return { recordings, addRecording };
}
