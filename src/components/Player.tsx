import ReactPlayer from "react-player";
import useClearVideo from "src/hooks/useClear";
import UploadSubs from "src/components/UploadSubs";
import { useEffect, useRef, useState } from "react";
import SubSeeker from "src/components/SubSeeker";
import useSubtitles from "src/hooks/useSubtitles";
import useCoreClock from "src/hooks/useCoreClock";
import AudioRecorder from "src/components/AudioRecorder";
import round from "src/utils/round";
import { SubtitleStoreType } from "src/types/subtitles";
import useRecordingStore from "src/hooks/useRecordingStore";
import playBlob from "src/utils/playBlob";

// chakra imports
import { FcFullTrash } from "react-icons/fc";
import { Box, Button, Center, HStack, Heading, Icon } from "@chakra-ui/react";

export default function Player({ url }: { url: string }) {
  const player = useRef<ReactPlayer>(null);
  const { mutate: deleteVideo, isLoading: deleteLoading } = useClearVideo();
  const { data, isLoading: subsLoading } = useSubtitles();
  const subs: SubtitleStoreType = data as SubtitleStoreType;
  const {
    isPlaying,
    setPlayedSeconds,
    setSelectedStart,
    selectedStart,
    selectedEnd,
    playingStart,
  } = useCoreClock(subs);
  const { addRecording, recordings } = useRecordingStore();

  const [muted, setMuted] = useState(false);
  // const playheadEnd = useRef(0); // useState works here too! (i've decided to use useRef to potentially reduce rerenders)
  // const roundedCurrSecs = round(currSeconds);

  // useEffect(() => {
  //   if (!subs) return;

  //   // Note: This specific order of if-statements are required for optimal mute/unmute performance, tested.
  //   if (
  //     !muted &&
  //     Object.keys(recordings).includes(roundedCurrSecs.toString())
  //   ) {
  //     playheadEnd.current = recordings[roundedCurrSecs].end;
  //     setMuted(true);
  //     playBlob(recordings[roundedCurrSecs].audioBlob);
  //     return;
  //   }

  //   if (muted && roundedCurrSecs >= playheadEnd.current) {
  //     setMuted(false);
  //     return;
  //   }
  //   // else setMuted(false);
  // }, [currSeconds]);

  return (
    <>
      <HStack w="100%" mb="10">
        <Heading color="blue.500" marginRight="auto">
          Dub Maker v1
        </Heading>
        <UploadSubs />
        <Button
          colorScheme="red"
          onClick={() => deleteVideo()}
          isLoading={deleteLoading}
          loadingText="Deleting..."
          // TODO: Add confirmation prompt
        >
          <Icon as={FcFullTrash} mr="2" />
          Delete Project
        </Button>
      </HStack>

      <HStack spacing={10}>
        <Center w="50%">
          {subsLoading ? (
            <>Subtitles Loading...</>
          ) : (
            <SubSeeker
              player={player}
              subs={subs}
              selectedStart={selectedStart}
              setSelectedStart={setSelectedStart}
              playingStart={playingStart}
            />
          )}
        </Center>

        <Center w="50%">
          <ReactPlayer
            ref={player}
            url={url}
            playing={isPlaying}
            progressInterval={1}
            // onSeek={(playedSeconds) => setCurrStart(round(playedSeconds - 0.1))}
            // WARNING: bug when seeking using player controls instead of SubSeeker: "sub is undefined" because the selected seconds in the player controls does not have a subtitle that starts at the exact same second
            onProgress={(obj) => setPlayedSeconds(obj.playedSeconds)}
            fallback={<>Player loading...</>}
            controls={true}
            muted={muted}
          />
        </Center>
      </HStack>

      <AudioRecorder
        start={selectedStart}
        end={selectedEnd}
        addRecording={addRecording}
      />
    </>
  );
}
