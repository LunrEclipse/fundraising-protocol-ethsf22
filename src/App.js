import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Post from './views/post';
import Profile from './views/profile';
import Home from './views/home';
import { HStack, VStack, Box, Stack, Text, Button, Image, extendTheme, ChakraProvider, Flex } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import { useEnsName } from 'wagmi'
import { useEnsAvatar } from 'wagmi'
import { BellIcon } from '@chakra-ui/icons'
import PinkBlob from './pink.png';
import PurpleBlob from './purple.png';
import GreenBlob from './green.png';
const colors = {

  brand: {
    black: '#151514',
    lightyellow: '#FEFDF9',
    white: '#FFFFFF',
    green: '#E6FC9C',
    purple:'8E84EF',

  },
}
const styles = {
  global: (props) => ({
    body:{
      // bg: props.colorMode === "dark" ? "brand.black" : "brand.lightyellow",
      bg: "brand.lightyellow",
      color: "brand.black",
    },
  })
}
const theme = extendTheme({ colors, styles})

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
  const {isConnected, address} = useAccount();
  const ensName = useEnsName({
    address: address,
    chainId: 1,
})
const ensAvatar = useEnsAvatar({
    address: address,
    chainId: 1,
})
  return (
    <>
      <VStack
        backgroundColor = {"#FEFDF9"}>
          <Stack
            width="100%"
            height="75px"
            top="0"
            left="0"
            zIndex="2"
            borderBottomWidth="1px"
            borderBottomColor="black"
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
                        height = "30px"
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
                      <Button
                        marginLeft = "15px"
                        textColor="white"
                        fontStyle= {"bold"}
                        fontSize= "15px"
                        height = "30px"
                        width = "110px"
                        backgroundColor={"black"}
                        borderRadius = "10"
                        border = "none"
                        onClick={
                          () => {
                            window.location.href = "/profile";
                          }
                        }
                        cursor = {"pointer"}>
                          <Flex
                            align={'center'}>
                            <Image
                                borderRadius="full"
                                boxSize="20px"
                                src={ensAvatar.data}
                                fallbackSrc="https://464911102-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/collections%2F2TjMAeHSzwlQgcOdL48E%2Ficon%2FKWP0gk2C6bdRPliWIA6o%2Fens%20transparent%20background.png?alt=media&token=bd28b063-5a75-4971-890c-97becea09076"
                            />
                            <Text
                            paddingLeft={'5px'}
                            fontSize = "10px"
                            >
                                {ensName.data ? ensName.data : address.split('').slice(0, 6).join('') + '...'}
                            </Text>
                        </Flex>
                      </Button>
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
