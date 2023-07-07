import ReactPlayer from "react-player";
import { SubtitleStoreType, SubtitleType } from "src/types/subtitles";

// chakra imports
import { Box, Code, IconButton } from "@chakra-ui/react";
import { FcBookmark } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";

interface PropsType {
  player: React.RefObject<ReactPlayer>;
  subs: SubtitleStoreType | undefined;
  selectedStart: number;
  setSelectedStart: (seconds: number) => void;
  playingStart: number;
  setPlaying: (isPlaying: boolean) => void;
}

export default function SubSeeker({
  player,
  subs,
  selectedStart,
  setSelectedStart,
  playingStart,
  setPlaying,
}: PropsType) {
  const containerRef = useRef(null);
  const currentLineRef = useRef(null);
  const [lastPlayed, setLastPlayed] = useState(-1);

  // last played memory
  if (lastPlayed !== playingStart && playingStart !== -1)
    setLastPlayed(playingStart);

  // autoscroll
  useEffect(() => {
    if (currentLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const currentLine = currentLineRef.current;

      const scrollToCenter = () => {
        const containerHeight = container.clientHeight;
        const currentLineOffsetTop = currentLine.offsetTop;
        const currentLineHeight = currentLine.clientHeight;

        const scrollTo =
          currentLineOffsetTop - containerHeight / 2 + currentLineHeight / 2;
        container.scrollTo({ top: scrollTo, behavior: "smooth" });
      };

      scrollToCenter();
    }
  }, [lastPlayed]);

  function Line({ sub }: { sub: SubtitleType }) {
    const isPlaying = sub.start === playingStart;
    const isSelected = sub.start === selectedStart;
    const isLastPlayed = sub.start === lastPlayed;
    // const hasPlayed = currSeconds >= sub.end;
    const hasPlayed = true;

    function getColorScheme() {
      if (isPlaying) return "green";
      if (isSelected) return "blue";
      if (hasPlayed) return "gray";
      return "white";
    }

    function getBorder() {
      if (isPlaying) return "2px solid green";
      if (isSelected) return "2px dotted blue";
      // if (hasPlayed) return "2px solid gray";
      return "2px solid transparent"; // transparent border ensures that adding border doesn't add on to the size
    }

    const props = {
      onClick: () => {
        player.current?.seekTo(sub.start);
        setSelectedStart(sub.start);
        setPlaying(true);
      },
      _hover: {
        cursor: "pointer",
        bg: "gray.300",
        fontWeight: "bold",
        // border: "0.1px solid black",
        // fontSize: "lg",
        shadow: "lg",
      },
      display: "block",
      w: "fit-content",
      colorScheme: getColorScheme(),
      border: getBorder(),
      shadow: hasPlayed ? "md" : "none",
      fontWeight: isLastPlayed ? "bold" : "normal",
      fontSize: isLastPlayed ? "lg" : "md",
      my: "15px",
    };

    return (
      <Code {...props} ref={isPlaying ? currentLineRef : null}>
        {sub.text}
      </Code>
    );

    // TODO: custom scroll bar
    // TOOD: include timestamp on the right
  }

  if (!subs || !subs.subtitles) return <>No subtitles uploaded...</>;
  if (!player || player.current === null) return <>Waiting for player...</>;

  return (
    <Box position="relative">
      <IconButton
        icon={<FcBookmark />}
        w="fit-content"
        position="absolute"
        isRound
        variant="ghost"
        size="lg"
        right="5"
        aria-label="Jump to current selected line"
      />
      <Box maxH="70vh" overflowY="scroll" ref={containerRef}>
        {subs.subtitles.map((sub) => (
          <Line sub={sub} key={sub.id} />
        ))}
      </Box>
    </Box>
  );
}
