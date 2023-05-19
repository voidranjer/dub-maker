export interface RecordingSnippet {
  start: number;
  audioBlob: Blob;
}

export interface RecordingStore {
  [id: number]: RecordingSnippet;
}
