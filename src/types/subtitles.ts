// srt-parser-2 format: https://www.npmjs.com/package/srt-parser-2
// Note: Parsed to this custom format when uploading to Firebase
export interface Subtitle {
  // id: string;
  // startTime: string;
  // startSeconds: number;
  // endTime: string;
  // endSeconds: number;
  id: number;
  start: number;
  end: number; // or duration
  text: string;
}

export interface SubtitleStore {
  idToStart: { [id: number]: number };
  startToId: { [start: number]: number };
  subtitles: Subtitle[]; // index = id
}
