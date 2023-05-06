import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "src/lib/firebase";

export default function useURL() {
  return useDocumentData<T>(doc(db, "temp/base"));
}
