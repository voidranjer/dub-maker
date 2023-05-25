export default function playBlob(blob: Blob) {
  const audio = new Audio(URL.createObjectURL(blob));
  audio.play();
}
