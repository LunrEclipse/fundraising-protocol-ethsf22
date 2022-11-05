import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Post from './views/post';
import Profile from './views/profile';
import Home from './views/home';
import { HStack, VStack, Box, Stack, Text, Button, Image } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import { BellIcon } from '@chakra-ui/icons'
import PinkBlob from './pink.png';
import PurpleBlob from './purple.png';
import GreenBlob from './green.png';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/post",
    element: <Post />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  }
]);

function App() {
  const {isConnected} = useAccount();
  return (
    <>
      <VStack>
          <Stack
            width="100%"
            height="75px"
            top="0"
            left="0"
            zIndex="1"
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            borderBottomStyle="solid"
            alignItems="center"
          >
            <HStack
              width="90%"
              height="100%"
              justifyContent="space-between"
            >
              <HStack
                cursor={"pointer"}
                onClick = {
                  () => {
                    window.location.href = "/";
                  }
                }>
                <Box backgroundColor="black"
                borderRadius="100%"
                width="25px"
                height="25px"/>
                <Text fontSize="20px"
                fontWeight="bold"
                marginLeft="10px">
                  ProjectName
                </Text>
              </HStack>
              {
                  isConnected ? (
                    <HStack spacing={15}>
                      <Text fontSize="15px">
                        About
                      </Text>
                      <BellIcon/>
                      <Button
                        marginLeft = "15px"
                        textColor="white"
                        fontStyle= {"bold"}
                        fontSize= "15px"
                        height = "40px"
                        width = "110px"
                        backgroundColor={"black"}
                        borderRadius = "10"
                        border = "none"
                        onClick={
                          () => {
                            window.location.href = "/post";
                          }
                        }
                        cursor = {"pointer"}>
                          Create Post
                      </Button>
                      <Stack
                        onClick={
                          () => {
                            window.location.href = "/profile";
                          }
                        }>
                        <ConnectButton chainStatus={'none'}
                        showBalance = {false}/>
                      </Stack>
                    </HStack>
                  ) : (
                    <HStack>
                      <Text fontSize="15px"
                      marginRight="15px">
                        About
                      </Text>
                      <ConnectButton chainStatus={'none'}
                      showBalance = {false}/>
                  </HStack>
                  )
                }
            </HStack>
          </Stack>
        <RouterProvider router={router}>
        </RouterProvider>
      </VStack>
      <Image
        src={PinkBlob}
        position="fixed"
        top="-200"
        right="-250"
        zIndex="1"
        width="500px"
        height="500px"
      />
      <Image
        src={PurpleBlob}
        position="fixed"
        bottom="-450"
        right="-450"
        zIndex="1"
        width="1000px"
        height="1000px"
      />
      <Image
        src={GreenBlob}
        position="fixed"
        bottom="-150"
        left="-400"
        zIndex="1"
        width="1000px"
        height="1000px"
      />
    </>
  );
}

export default App;
