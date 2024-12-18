import { Button, Stack, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useAudioRecorder from "src/hooks/useAudioRecorder";
import { AddRecordingFnType } from "src/hooks/useRecordings";
import { SubtitleStoreType } from "src/types/subtitles";
import { BsFillRecordCircleFill } from "react-icons/bs";

interface PropsType {
  start: number;
  subs: SubtitleStoreType | undefined;
  addRecording: AddRecordingFnType;
}

export default function AudioRecorder({
  start,
  subs,
  addRecording,
}: PropsType) {
  const [end, setEnd] = useState(-1);
  const { startRecording, isRecording } = useAudioRecorder((blob) =>
    addRecording(start, end, blob)
  );

  useEffect(() => {
    if (subs === undefined) return;

    if (!(start in subs.startToId)) {
      setEnd(-1);
      return;
    }

    const id = subs.startToId[start];
    const sub = subs.subtitles[id];
    setEnd(sub.end);
  }, [start, subs]);

  if (end === -1)
    return <Tag colorScheme="blue">Select a line to begin recording...</Tag>;

  if (subs === undefined) return <>Upload subtitles to record...</>;

  return (
    <div className="audio-container">
      {!isRecording ? (
        <Button
          colorScheme="red"
          rounded="full"
          leftIcon={<BsFillRecordCircleFill />}
          onClick={() => startRecording((end - start) * 1000)}
        >
          Record
        </Button>
      ) : (
        <Stack direction="row" align="center" spacing="5">
          <CountdownCircleTimer
            isPlaying
            duration={end - start}
            size={60}
            strokeWidth={5}
            colors={["#72CC50", "#72CC50", "#72CC50", "#B8293D"]}
            colorsTime={[10, 10, 2, 0]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
          <Button isLoading loadingText="Recording..." rounded="full" />
        </Stack>
      )}
    </div>
  );
}
