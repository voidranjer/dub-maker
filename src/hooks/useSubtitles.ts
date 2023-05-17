import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "src/lib/firebase";
import { Subtitle } from "src/types/subtitles";
import srtParser2 from "srt-parser-2";

export default function useSubtitles() {
  async function fetchData() {
    const docRef = doc(db, "temp/subs1");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return []; // subtitles haven't been uploaded yet
    const docData = docSnap.data();

    const parser = new srtParser2();
    const results = parser.fromSrt(docData.subs);
    return results;
  }

  return useQuery<Subtitle[]>({ queryFn: fetchData, queryKey: "subtitles" });
}
