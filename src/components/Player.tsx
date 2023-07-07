import ReactPlayer from "react-player";
import useClearVideo from "src/hooks/useClear";
import UploadSubs from "src/components/UploadSubs";
import { useRef } from "react";
import SubSeeker from "src/components/SubSeeker";
import useSubtitles from "src/hooks/useSubtitles";
import useCoreClock from "src/hooks/useCoreClock";
import AudioRecorder from "src/components/AudioRecorder";
import vars from "src/lib/vars";
import round from "src/utils/round";
import { SubtitleStoreType } from "src/types/subtitles";
import useRecordings from "src/hooks/useRecordings";

// chakra imports
import { FcFullTrash } from "react-icons/fc";
import { Button, Center, HStack, Heading, Icon } from "@chakra-ui/react";

export default function Player({ url }: { url: string }) {
  const player = useRef<ReactPlayer>(null);
  const { mutate: deleteVideo, isLoading: deleteLoading } = useClearVideo();
  const { data, isLoading: subsLoading } = useSubtitles();
  const subs: SubtitleStoreType = data as SubtitleStoreType;
  const {
    isPlaying,
    setPlaying,
    setSelectedStart,
    selectedStart,
    playingStart,
    playedSecondsRef,
  } = useCoreClock(subs);
  const { addRecording, shouldMute } = useRecordings(playedSecondsRef);

  // rerender notification
  console.log(playedSecondsRef.current);

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
              setPlaying={setPlaying}
            />
          )}
        </Center>

        <Center w="50%">
          <ReactPlayer
            ref={player}
            url={url}
            playing={isPlaying}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            progressInterval={vars.progressInterval}
            // onSeek={(playedSeconds) => setCurrStart(round(playedSeconds - 0.1))}
            // WARNING: bug when seeking using player controls instead of SubSeeker: "sub is undefined" because the selected seconds in the player controls does not have a subtitle that starts at the exact same second
            // onProgress={(obj) => setPlayedSeconds(obj.playedSeconds)}
            onProgress={
              (obj) => (playedSecondsRef.current = round(obj.playedSeconds)) // fine tune vars.progressInterval + vars.subsInterval (which affects the util/round.ts function precision) so that 0.0 to 0.9 seconds are all captured.
            }
            fallback={<>Player loading...</>}
            controls={true}
            muted={shouldMute}
          />
        </Center>
      </HStack>

      <AudioRecorder
        start={selectedStart}
        subs={subs}
        addRecording={addRecording}
      />
    </>
  );
}
