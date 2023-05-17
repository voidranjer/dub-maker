import { deleteDoc, doc } from "firebase/firestore";
import { useMutation } from "react-query";
import { db } from "src/lib/firebase";

export default function useClearVideo() {
  async function deleteVid() {
    await deleteDoc(doc(db, "temp/vid1"));
    await deleteDoc(doc(db, "temp/subs1"));
  }

  return useMutation(deleteVid);
}
