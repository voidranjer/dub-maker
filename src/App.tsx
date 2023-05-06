import "./styles.css";
import Upload from "src/components/Upload";
import Player from "src/components/Player";

export default function App() {
  return (
    <div className="container app-container">
      <h1>Dub Maker v1</h1>

      {/* {url ? <Player url={url} /> : <Upload />} */}
      <Upload />
    </div>
  );
}
