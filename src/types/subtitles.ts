// srt-parser-2 format: https://www.npmjs.com/package/srt-parser-2
export type Subtitle = {
  id: string;
  startTime: string;
  startSeconds: number;
  endTime: string;
  endSeconds: number;
  text: string;
};
