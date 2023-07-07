import { useEffect, useRef, useState } from "react";
import vars from "src/lib/vars";
import { SubtitleStoreType } from "src/types/subtitles";

export default function useCoreClock(subs: SubtitleStoreType | undefined) {
  const [isPlaying, setPlaying] = useState(false);
  const [selectedStart, setSelectedStart] = useState(0);
  const [playingStart, setPlayingStart] = useState(-1);
  const playedSecondsRef = useRef(0); // useRef instead of useState to prevent unnecessary rerenders

  // Stale Closure Problem: https://stackoverflow.com/questions/65253665/settimeout-for-this-state-vs-usestate/66435915#66435915
  const isPlayingRef = useRef(false);
  const subsRef = useRef(subs);
  const playingStartRef = useRef(playingStart);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    subsRef.current = subs;
    playingStartRef.current = playingStart;
  }, [isPlaying, subs, playingStart]);
  useEffect(() => {
    setInterval(updatePlayingStart, vars.progressInterval); // decoupled clock from video player / other components
  }, []);

  function updatePlayingStart() {
    // stale closure fix
    const isPlaying = isPlayingRef.current;
    const subs = subsRef.current;
    const playedSeconds = playedSecondsRef.current;
    const playingStart = playingStartRef.current;

    // not playing anything
    if (!isPlaying) return;

    // subtitle check
    if (subs === undefined) {
      console.warn(
        "SEARCH ME IN CODE ERROR: useCoreClock called before subs were loaded"
      );
      return;
    }

    // not playing any line
    if (
      playingStart != -1 &&
      playedSeconds >= subs.subtitles[subs.startToId[playingStart]].end
    ) {
      setPlayingStart(-1);
      return;
    }

    // a new line just started being played
    if (playedSeconds in subs.startToId) setPlayingStart(playedSeconds);
  }

  return {
    isPlaying, // used to control react-player (play/pause)
    setPlaying, // used to manually override isPlaying
    setSelectedStart,
    selectedStart, // set current selected subtitle start time (selected when seeking i.e. CLICKING A LINE from the SubSeeker component)
    playingStart, // starting time (played seconds) of the currently playing subtitle line (should automatically advance). "-1" if no line is currently being played i.e. background music, no current voicelines (used to highlight the current line)
    playedSecondsRef, // current position in the video
  };
}
