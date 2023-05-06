import { ChangeEvent, useState } from "react";
import useUpload from "src/hooks/useUpload";

export default function Upload() {
  const [file, setFile] = useState<File>();
  const { mutate: upload, isLoading } = useUpload();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handleUploadClick() {
    if (!file) {
      return;
    }
    upload(file);
  }

  return (
    <div className="upload-container">
      <input
        type="file"
        onChange={handleFileChange}
        accept="video/mp4, video/webm"
      />

      {/* <div>{file && `${file.name} - ${file.type}`}</div> */}

      <button
        onClick={handleUploadClick}
        aria-busy={isLoading ? "true" : "false"}
        disabled={!file || isLoading}
      >
        Upload
      </button>
    </div>
  );
}
