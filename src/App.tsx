import "./styles.css";
import Upload from "src/components/UploadVid";
import Player from "src/components/Player";
import useURL from "src/hooks/useURL";
// import { Provider } from "react-redux";
// import { store } from "src/redux/store";

export default function App() {
  const [data, isLoading, error] = useURL();
  const url = data?.url;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container app-container">
      <h1>Dub Maker v1</h1>

      {/* <Provider store={store}> */}
      {url ? <Player url={url} /> : <Upload />}
      {/* </Provider> */}
    </div>
  );
}
