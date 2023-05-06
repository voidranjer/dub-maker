import "./styles.css";
import Upload from "src/components/Upload";
import Player from "src/components/Player";
import useURL from "src/hooks/useURL";

export default function App() {
  const [data, isLoading, error] = useURL();
  const url = data?.url;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container app-container">
      <h1>Dub Maker v1</h1>

      {url ? <Player url={url} /> : <Upload />}
    </div>
  );
}
