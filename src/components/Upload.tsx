import { ChangeEvent, useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File>();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  function handleUploadClick() {
    if (!file) {
      return;
    }
    localStorage.setItem("video", URL.createObjectURL(file));
  }

  return (
    <div className="upload-container">
      <input
        type="file"
        onChange={handleFileChange}
        accept="video/mp4, video/webm"
      />

      {/* <div>{file && `${file.name} - ${file.type}`}</div> */}

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}
