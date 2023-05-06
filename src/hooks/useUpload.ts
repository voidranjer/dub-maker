import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useMutation } from "react-query";
import { storage } from "src/lib/firebase";
import { db } from "src/lib/firebase";

export default function useUpload() {
  async function upload(file: File) {
    const storageRef = ref(storage, "todoCodeToRenameMeAutomatically");
    await uploadBytesResumable(storageRef, file); // TODO: Progress bar (resumable - allows for monitoring)

    const url = await getDownloadURL(storageRef);
    const docRef = doc(db, "temp/base");
    await setDoc(docRef, { url });
  }

  return useMutation(upload);
}
