import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Text, Flex, Box, Button, Badge, Input, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, Textarea, Container, ChakraProvider, extendTheme} from '@chakra-ui/react'
import {
    LivepeerConfig,
    createReactClient,
    studioProvider, 
  } from '@livepeer/react';
  import * as React from 'react';
  import { useDropzone } from 'react-dropzone';
  import {useState, useCallback, useMemo, useRef} from 'react';
  import { Player, useAsset, useCreateAsset, useAssetMetrics } from '@livepeer/react';

  export default function Post() {
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

    let [value, setValue] = React.useState('')
    const handlePostCreation = (e) => {
      e.preventDefault();
      const description = e.target.description.value;
      // console.log(description);
    };
    let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

    return(
      <ChakraProvider theme={theme}>
      <>
      <Box width='100%' pl='15%' zIndex="2">
        <Flex direction="column" zIndex="2">
        <Text fontSize='3xl' as='b' pb='2rem' zIndex="2">Create Post</Text>
        <FormControl>
          <FormLabel fontSize='2xl' as='b' zIndex="2">Upload Media</FormLabel>
          <Text fontSize="md" color='black' zIndex="2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</Text>
      </FormControl>
      <Button zIndex="2" mb='3rem' mt='1rem' bg='brand.white' color='brand.black' border='1px' borderColor='black' variant='outline' width='200px' sx={{borderRadius:"50px"}} _hover={{ borderColor: 'purple.500', color: 'purple.500'}} >Upload Video</Button>
      <FormControl>
        <FormLabel zIndex="2" fontSize='2xl' as='b'>Description</FormLabel>
        <Text zIndex="2" fontSize="md" pb='1rem'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</Text>
        <Text zIndex="2" fontSize='md'>{value}</Text>
        <Textarea zIndex="2" _placeholder='Input a description of your video...' size="md" w="60%" bg='white' border='1px' borderColor='black' color='black'/>
      </FormControl>
      <Button zIndex="2" mt='2rem' bg='brand.black' color='brand.white' width='200px' _hover={{ bg: 'purple.500' }}sx={{borderRadius:"50px"}}>Post</Button>
      </Flex>
      </Box>
      </>
      </ChakraProvider>
    );
  }