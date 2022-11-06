import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Post from './views/post';
import Profile from './views/profile';
import Home from './views/home';
import About from './views/about';
import Notifications from './views/notifications';
import { HStack, VStack, Box, Stack, Text, Button, Image, extendTheme, ChakraProvider, Flex } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import { useEnsName } from 'wagmi'
import { useEnsAvatar } from 'wagmi'
import { QuestionIcon, BellIcon } from '@chakra-ui/icons'
import PinkBlob from './pink.png';
import PurpleBlob from './purple.png';
import GreenBlob from './green.png';
import { sendNotification } from "@pushprotocol/restapi/src/lib/payloads";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { NotificationItem, chainNameType } from "@pushprotocol/uiweb";
import Logo from './FullLogo.svg'


const PK = 'ce23fae1eaf2ab2dc54db3e5550e44845c39796c4dc5fb0b8ddc87657a524b65'; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

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
    path: "/about",
    element: <About />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
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
const notifications = async() => {
  await PushAPI.user.getFeeds({
  user: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681', // user address in CAIP
  env: 'staging'
});
}
const ensAvatar = useEnsAvatar({
    address: address,
    chainId: 1,
})
const sendNotification = async() => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `[SDK-TEST] notification TITLE:`,
        body: `[sdk-test] notification BODY`
      },
      payload: {
        title: `[sdk-test] payload title`,
        body: `sample msg body`,
        cta: '',
        img: ''
      },
      recipients: 'eip155:5:0x84AA61e6e084A0e96Ae35528C87e13c8b0D4Fc4A', // recipient address
      channel: 'eip155:5:0x84AA61e6e084A0e96Ae35528C87e13c8b0D4Fc4A', // your channel address
      env: 'staging'
    });
    
    // apiResponse?.status === 204, if sent successfully!
    console.log('API repsonse: ', apiResponse);
  } catch (err) {
    console.error('Error: ', err);
  }
}
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
            backgroundColor = {"#FEFDF9"}
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
                <Image
                  src = {Logo}
                  width = "85px"
                  />
              </HStack>
              {
                  isConnected ? (
                    <HStack spacing={15}>
                      <QuestionIcon
                        onClick={
                          () => {
                            window.location.href = "/about";
                          }
                        }
                        w={25}
                        h={25}/>
                      <BellIcon
                        onClick={
                          () => {
                            window.location.href = "/notifications";
                          }
                        }
                        w={30}
                        h={30}/>
                      <Button
                        marginLeft = "15px"
                        textColor="black"
                        fontStyle= {"bold"}
                        fontSize= "md"
                        height = "2rem"
                        width = "150px"
                        bg={"white"}
                        borderRadius = "50px"
                        border = "solid"
                        _hover={{color:'purple.500', borderColor:'purple.500'}}
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
