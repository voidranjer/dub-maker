import ReactPlayer from "react-player";
import { SubtitleStoreType, SubtitleType } from "src/types/subtitles";

// chakra imports
import { Box, Code, IconButton } from "@chakra-ui/react";
import { FcBookmark } from "react-icons/fc";

interface PropsType {
  player: React.RefObject<ReactPlayer>;
  subs: SubtitleStoreType | undefined;
  currSeconds: number;
  currStart: number;
  setCurrStart: (seconds: number) => void;
}

export default function SubSeeker({
  player,
  subs,
  currSeconds,
  currStart,
  setCurrStart,
}: PropsType) {
  if (!subs || !subs.subtitles) return <>No subtitles uploaded...</>;
  if (!player || player.current === null) return <>Waiting for player...</>;

  function Line({ sub }: { sub: SubtitleType }) {
    const isCurrStart = sub.start == currStart;
    const isCurrPlaying = currSeconds >= sub.start && currSeconds < sub.end;
    const hasPlayed = currSeconds >= sub.end;

    const props = {
      key: sub.id,
      onClick: () => {
        player.current?.seekTo(sub.start);
        setCurrStart(sub.start);
      },
      _hover: {
        cursor: "pointer",
        bg: "gray.300",
        fontWeight: "bold",
        border: "0.1px solid black",
        fontSize: "lg",
        shadow: "lg",
      },
      display: "block",
      w: "fit-content",
      colorScheme: isCurrPlaying
        ? "green"
        : isCurrStart
        ? "blue"
        : hasPlayed
        ? "gray"
        : "white",
      fontWeight: isCurrPlaying ? "bold" : "normal",
      border: isCurrPlaying
        ? "2px solid green"
        : isCurrStart
        ? "2px dotted blue"
        : "none",
      shadow: hasPlayed ? "lg" : "none",
      fontSize: isCurrPlaying ? "lg" : "sm",
    };

    return <Code {...props}>{sub.text}</Code>;

    // if (sub.start == currStart) return "subtitle-current";
    // if (currSeconds >= sub.start && currSeconds < sub.end)
    //   return "subtitle-playing";
    // return "subtitle-line";
  }

  return (
    <Box position="relative">
      <IconButton
        icon={<FcBookmark />}
        w="fit-content"
        position="absolute"
        colorScheme="purple"
        size="lg"
        right="5"
        borderRadius="xl"
        aria-label="Jump to current selected line"
      />
      <Box maxH="70vh" overflowY="scroll">
        {subs.subtitles.map((sub) => (
          <Line sub={sub} />
        ))}
      </Box>
    </Box>
  );
}
