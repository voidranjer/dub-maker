import { useEffect, useRef, useState } from "react";
import { SubtitleStoreType } from "src/types/subtitles";

export default function useCoreClock(subs: SubtitleStoreType | undefined) {
  const [isPlaying, setPlaying] = useState(false);
  const [selectedEnd, setSelectedEnd] = useState(0);
  const [selectedStart, setSelectedStart_] = useState(0);
  const [playingStart, setPlayingStart] = useState(-1);
  const playedSeconds = useRef(0); // useRef instead of useState to prevent unnecessary rerenders

  // stale closure fix
  const isPlayingRef = useRef(false);
  const subsRef = useRef(subs);

  // stale closure fix
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    subsRef.current = subs;
  }, [isPlaying, subs]);

  useEffect(() => {
    // Stale Closure Problem: https://stackoverflow.com/questions/65253665/settimeout-for-this-state-vs-usestate/66435915#66435915
    setInterval(updatePlayingStart, 100);
  }, []);

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

  function updatePlayingStart() {
    // not playing anything
    if (!isPlayingRef.current) return;

    // stale closure fix
    const subs = subsRef.current;
    if (subs === undefined) {
      console.warn(
        "SEARCH ME IN CODE ERROR: useCoreClock called before subs were loaded"
      );
      return;
    }

    // not playing any line
    if (
      playingStart != -1 &&
      playedSeconds.current >= subs.subtitles[subs.startToId[playingStart]].end
    ) {
      setPlayingStart(-1);
      return;
    }

    // a new line just started being played
    if (playedSeconds.current in subs.startToId)
      setPlayingStart(playedSeconds.current);
  }

  return {
    isPlaying, // used to control react-player (play/pause)
    setPlaying,
    setSelectedStart, // set current selected subtitle start time (selected when seeking from SubSeeker)
    selectedStart,
    selectedEnd,
    playingStart, // starting time (played seconds) of the currently playing subtitle line. "-1" if no line is currently being played i.e. background music, no current voicelines (used to highlight the current line)
    // setPlayedSeconds, // set current position in the video
    playedSeconds, // current position in the video
  };
}
