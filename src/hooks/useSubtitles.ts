import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "src/lib/firebase";
import { SubtitleStore } from "src/types/subtitles";
import { SubsDoc } from "src/types/firestore";

export default function useSubtitles() {
  async function fetchData() {
    const docRef = doc(db, "temp/subs1");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return {}; // subtitles haven't been uploaded yet
    const docData: SubsDoc = docSnap.data() as SubsDoc;
    return JSON.parse(docData.subs) as SubtitleStore;
  }

  return useQuery<SubtitleStore>({ queryFn: fetchData, queryKey: "subtitles" });
}
