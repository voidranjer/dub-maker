import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "src/lib/firebase";
import { VidDoc } from "src/types/firestore";

export default function useURL() {
  return useDocumentData<VidDoc>(doc(db, "temp/vid1"));
}
