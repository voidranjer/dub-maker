import { useEffect, useState } from "react";
import { SubtitleStoreType } from "src/types/subtitles";

export default function useCoreClock(subs: SubtitleStoreType | undefined) {
  const [isPlaying, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [selectedEnd, setSelectedEnd] = useState(0);
  const [selectedStart, setSelectedStart_] = useState(0);
  const [playingStart, setPlayingStart] = useState(-1);

  function setSelectedStart(start: number) {
    if (subs === undefined) {
      console.warn(
        "SEARCH ME IN CODE ERROR: useCoreClock called before subs were loaded"
      );
      return;
    }

    const id = subs.startToId[start];
    const sub = subs.subtitles[id];

    setPlaying(true);
    setSelectedEnd(sub.end);
    setSelectedStart_(start);
  }

  useEffect(() => {
    if (subs === undefined) {
      console.warn(
        "SEARCH ME IN CODE ERROR: useCoreClock called before subs were loaded"
      );
      return;
    }

    // autostop video when selected subtitle line ends
    // if (currSeconds >= currEnd) setPlaying(false);

    // update playingStart (current subtitle line being played)
    for (const sub of subs.subtitles) {
      if (playedSeconds >= sub.start && playedSeconds < sub.end) {
        setPlayingStart(sub.start);
        break;
      }

      if (playingStart != -1) setPlayingStart(-1);
    }
  }, [playedSeconds]); // this useEffect hook updates so much that React keeps throwing an error for "Maximum update depth exceeded."

  return {
    isPlaying, // used to control react-player (play/pause)
    setPlayedSeconds, // set current position in the video
    setSelectedStart, // set current selected subtitle start time (selected when seeking from SubSeeker)
    selectedStart,
    selectedEnd,
    playingStart, // starting time (played seconds) of the currently playing subtitle line. "-1" if no line is currently being played i.e. background music, no current voicelines (used to highlight the current line)
    playedSeconds, // NOTE: playedSeconds is the most updated/rerendered, reduce usage as much as possible to optimize performance
  };
}
