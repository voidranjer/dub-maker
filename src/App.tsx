import "./styles.css";
import Upload from "src/components/UploadVid";
import Player from "src/components/Player";
import useURL from "src/hooks/useURL";
// import { Provider } from "react-redux";
// import { store } from "src/redux/store";

export default function App() {
  const [data, isLoading, error] = useURL();
  const url = data?.url;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <div className="spinner animate-spin" />
      </div>
    );

  return (
    <div className="bg-slate-900">
      <div className="container mx-auto pt-10 ">
        {/* <Provider store={store}> */}
        {url ? <Player url={url} /> : <Upload />}
        {/* </Provider> */}
      </div>
    </div>
  );
}
