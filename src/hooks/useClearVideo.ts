import { deleteDoc, doc } from "firebase/firestore";
import { useMutation } from "react-query";
import { db } from "src/lib/firebase";

export default function useClearVideo() {
  async function deleteVid() {
    const docRef = doc(db, "temp/base");
    await deleteDoc(docRef);
  }

  return useMutation(deleteVid);
}
