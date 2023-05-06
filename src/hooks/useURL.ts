import { useEffect, useState } from "react";

export default function useURL() {
  const [url, setURL] = useState<string>();

  useEffect(() => {
    const vidURL = localStorage.getItem("video");
    if (vidURL) setURL(vidURL);
  }, []);

  function updateURL(url: string) {
    localStorage.setItem("video", url);
    setURL(url);
  }

  return { url, updateURL };
}
