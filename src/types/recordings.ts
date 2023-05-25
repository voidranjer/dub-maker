export interface RecordingSnippet {
  // start: number;
  audioBlob: Blob;
  end: number;
}

export interface RecordingStore {
  [start: number]: RecordingSnippet;
}
