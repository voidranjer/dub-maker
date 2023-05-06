import { ChangeEvent, useState } from "react";
import srtParser2 from "srt-parser-2";

export default function UploadSubs({ setSubs }) {
  const [file, setFile] = useState<File>();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handleUploadClick() {
    if (!file) {
      return;
    }

    const parser = new srtParser2();
    const raw = await file.text();
    setSubs(parser.fromSrt(raw));
  }

  return (
    <div className="uploadsubs-container">
      <input type="file" onChange={handleFileChange} accept=".srt" />

      {/* <div>{file && `${file.name} - ${file.type}`}</div> */}

      <button
        onClick={handleUploadClick}
        // aria-busy={isLoading ? "true" : "false"}
        // disabled={!file || isLoading}
      >
        Upload Subtitles
      </button>
    </div>
  );
}
