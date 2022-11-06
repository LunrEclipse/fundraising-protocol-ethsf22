import {
  Box, Button, extendTheme, Flex, FormControl,
  FormLabel, Input, Text, Textarea, useToast, ChakraProvider, useFocusEffect
} from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { NotificationItem, chainNameType,  } from "@pushprotocol/uiweb";

// const projectKey = process.env.REACT_APP_INFURA_ID;
// const secretId = process.env.REACT_APP_INFURA_KEY;

export default function Notifications() {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const getNotifications = async () => {
            let temp = await PushAPI.user.getFeeds({
            user: 'eip155:5:0x84AA61e6e084A0e96Ae35528C87e13c8b0D4Fc4A', // user address in CAIP
            env: 'staging'
            })
            
            setNotifications(temp)
        }
        getNotifications()
    }, [])

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


console.log(notifications)

    return(
      <ChakraProvider theme={theme}>
        {/* <Text>{notifications}</Text> */}
        <div>
{notifications.map((oneNotification, i) => {
    const { 
        cta,
        title,
        message,
        app,
        icon,
        image,
        url,
        blockchain,
        notification
    } = oneNotification;
    const id = 0xD8634C39BBFd4033c0d3289C4515275102423681; //any unique id
    return (
        <NotificationItem
            key={id} // any unique id
            notificationTitle={title}
            notificationBody={message}
            cta={cta}
            app={app}
            icon={icon}
            image={image}
            url={url}
            theme={theme}
            chainName={blockchain}
            // chainName={blockchain as chainNameType} // if using Typescript
        />
        );
    })}
</div>
      </ChakraProvider>
    );
  }