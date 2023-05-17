import { doc, setDoc } from "firebase/firestore";
import { useMutation } from "react-query";
import { db } from "src/lib/firebase";

export default function useUploadSubs() {
  async function upload(subs: string) {
    const docRef = doc(db, "temp/subs1");
    await setDoc(docRef, { subs });
  }

  return useMutation(upload);
}
