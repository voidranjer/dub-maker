import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "src/lib/firebase";
import { SubtitleStoreType } from "src/types/subtitles";
import { SubsDoc, UploadSubData } from "src/types/firestore";

export default function useSubtitles() {
  async function fetchData() {
    const docRef = doc(db, "temp/subs1");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return {}; // subtitles haven't been uploaded yet
    const docData: SubsDoc = docSnap.data() as SubsDoc;
    const subtitles: UploadSubData[] = JSON.parse(docData.subs);

    // parse data
    const idToStart = {};
    const startToId = {};
    for (const sub of subtitles) {
      idToStart[sub.id] = sub.start;
      startToId[sub.start] = sub.id;
    }

    const subtitleStore: SubtitleStoreType = {
      idToStart,
      startToId,
      subtitles: [{ id: 0, start: 0, end: 0, text: "" }, ...subtitles], // for some reason, srt-parser-2's IDs start with "1" instead of "0"
    };

    return subtitleStore;
  }

  return useQuery<SubtitleStoreType>({
    queryFn: fetchData,
    queryKey: "subtitles",
  });
}
