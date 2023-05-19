import { useEffect, useState } from "react";
import { SubtitleStore } from "src/types/subtitles";

export default function useAutoStop(subs: SubtitleStore | undefined) {
  const [currSeconds, setCurrSeconds] = useState(0);
  const [currEnd, setCurrEnd] = useState(0);
  const [isPlaying, setPlaying] = useState(false);

  const [start, setStart] = useState(0);
  const [duration, setDuration] = useState(0);

  function setCurrStart(start: number) {
    if (subs === undefined) {
      console.warn("useAutoStop called before subs were loaded");
      return;
    }

    setPlaying(true);
    setCurrEnd(subs[start].end);

    setStart(start);
    setDuration((subs[start].end - start) * 1000);
  }

  useEffect(() => {
    if (currSeconds >= currEnd) setPlaying(false);
  }, [currSeconds]);

  return {
    setCurrSeconds, // set current position in the video
    setCurrStart, // set current subtitle start time (when seeking)
    isPlaying,
    currStart: start,
    currDuration: duration,
  };
}