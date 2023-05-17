import { ChangeEvent, useState } from "react";
import useUploadSubs from "src/hooks/useUploadSubs";

export default function UploadSubs() {
  const [file, setFile] = useState<File>();
  const { mutate: uploadSubs, isLoading } = useUploadSubs();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handleUploadClick() {
    if (!file) {
      return;
    }

    const raw = await file.text();
    await uploadSubs(raw);
  }

  return (
    <div className="uploadsubs-container">
      <input type="file" onChange={handleFileChange} accept=".srt" />

      {/* <div>{file && `${file.name} - ${file.type}`}</div> */}

      <button
        onClick={handleUploadClick}
        aria-busy={isLoading ? "true" : "false"}
        disabled={!file || isLoading}
      >
        Upload Subtitles
      </button>
    </div>
  );
}
