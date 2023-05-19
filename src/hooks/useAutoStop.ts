import { useEffect, useState } from "react";
import { SubtitleStore } from "src/types/subtitles";

export default function useAutoStop(subs: SubtitleStore | undefined) {
  const [currSeconds, setCurrSeconds] = useState(0);
  const [currEnd, setCurrEnd] = useState(0);
  const [isPlaying, setPlaying] = useState(false);

  function setCurrStart(start: number) {
    if (subs === undefined) {
      console.warn("useAutoStop called before subs were loaded");
      return;
    }

    setPlaying(true);
    setCurrEnd(subs[start].end);
  }

  useEffect(() => {
    if (currSeconds >= currEnd) setPlaying(false);
  }, [currSeconds]);

  return { setCurrSeconds, setCurrStart, isPlaying };
}
