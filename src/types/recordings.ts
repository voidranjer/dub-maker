export interface RecordingSnippet {
  // start: number;
  audioBlob: Blob;
}

export interface RecordingStore {
  [start: number]: RecordingSnippet;
}
