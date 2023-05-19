export interface RecordingSnippet {
  startSeconds: number;
  endSeconds: number;
  audioBlob: Blob;
}

export interface RecordingStore {
  [id: number]: RecordingSnippet;
}
