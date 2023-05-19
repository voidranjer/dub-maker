// srt-parser-2 format: https://www.npmjs.com/package/srt-parser-2
// Note: Parsed to this custom format when uploading to Firebase
export interface Subtitle {
  // id: string;
  // startTime: string;
  // startSeconds: number;
  // endTime: string;
  // endSeconds: number;
  end: number;
  text: string;
}

export interface SubtitleStore {
  [start: string]: Subtitle; // note: should parse "start" back to a number when using it
}
