import "./styles.css";
import Upload from "src/components/UploadVid";
import Player from "src/components/Player";
import useURL from "src/hooks/useURL";
// import { Provider } from "react-redux";
// import { store } from "src/redux/store";

// chakra imports
import { Box, Center, Spinner } from "@chakra-ui/react";

export default function App() {
  const [data, isLoading, error] = useURL();
  const url = data?.url;

  if (isLoading)
    return (
      <Center bg="gray.300" h="100vh">
        <Spinner
          thickness="8px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          // size="xl"
          h="100px"
          w="100px"
        />
      </Center>
    );

  return (
    <Box w="100vw" h="100vh">
      <Box mx="20" paddingTop="8">
        {/* <Provider store={store}> */}
        {url ? <Player url={url} /> : <Upload />}
        {/* </Provider> */}
      </Box>
    </Box>
  );
}
