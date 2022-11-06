import {
  Box, Button, extendTheme, Flex, FormControl,
  FormLabel, Input, Text, Textarea, useToast, ChakraProvider
} from '@chakra-ui/react';
import {useContractWrite, usePrepareContractWrite} from 'wagmi';
import * as React from 'react';
import axios from 'axios';

const projectKey = process.env.REACT_APP_KEY
import ABI from '../Fundraiser.json'

  export default function Post() {
    let [value, setValue] = React.useState('')
    let [file, setFile] = React.useState(null)
    let [disableUpload, setDisableUpload] = React.useState(false)
    let [url, setUrl] = React.useState('')
    const toast = useToast()


    const { config } = usePrepareContractWrite({
      address: process.env.REACT_APP_FUNDRAISER_ADDRESS,
      abi: ABI.abi,
      functionName: "createPost",
      args:[url]
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    React.useEffect(() => {
      console.log(isSuccess)
      if (isSuccess) {  
        toast({
          title: "Post created.",
          description: "Return home to see your post",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    }, [isSuccess])
    
    let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }
  
  async function handleMint() {
    if (value !== '' && file !== null) {
      setDisableUpload(true)
      console.log("Uploading to IPFS")
      axios.post(`https://api.web3.storage/upload`, file, {
        headers: {
          'Authorization': 'Bearer ' + projectKey,
        }
      }).then((res) => {
        console.log(res.data)
        console.log("Upload Description")
        const data = JSON.stringify({
          loc: "bafkreifr6ed7lqmrw5f46nvnh4gvdifstfxwh7ktsd6aw7mskvt5sbamry" + ".ipfs.w3s.link",
          description: value
        })
        axios.post(`https://api.web3.storage/upload`, data,  {
          headers: {
            'Authorization': 'Bearer ' + projectKey,
        }
      }).then((res) => {
        console.log(res.data)
        console.log("Upload Complete")
        const url = res.data + ".ipfs.w3s.link"
        setUrl(url)
        toast({
          title: "Upload Complete",
          description: "Deploying on chain now...",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
        console.log("Deploying on chain")
        write()
        console.log(isLoading)
        console.log(isSuccess)
        console.log("Got here")
      })
      })
      // const options = {
      //   host: 'ipfs.infura.io',
      //   port: 5001,
      //   path: '/api/v0/pin/add?pin=true',
      //   method: 'POST',
      //   auth: projectKey + ':' + secretId, 
      //   file: file 
      // }
      // const req = https.request(options, res => {
      //   console.log(`statusCode: ${res.statusCode}`)
      //   res.on('data', d => {
      //     process.stdout.write(d)
      //   })
      // })
    } else {
      toast({
        title: 'Invalid Data.',
        description: "You must upload media and input a description.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }
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
      <Input zIndex="2"
      mb='3rem'
      mt='1rem'
      ml = '-1rem'
      border='1px'
      type = "file"
      width='400px'
      color = "black"
      
      _hover={{ color: 'purple.500'}}
      onChange={(e) => setFile(e.target.files[0])}
      ></Input>
      <FormControl>
        <FormLabel zIndex="2" fontSize='2xl' as='b'>Description</FormLabel>
        <Text zIndex="2" fontSize="md" pb='1rem'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</Text>
        <Textarea zIndex="2"
         _placeholder='Input a description of your video...'
         size="md"
         w="60%"
         bg='white'
         border='1px'
         borderColor='black'
         color='black'
         onChange={handleInputChange}/>
      </FormControl>
      <Button zIndex="2"
      mt='2rem'
      bg='brand.black'
      color='brand.white'
      width='200px'
      _hover={{ bg: 'purple.500' }}
      sx={{borderRadius:"50px"}}
      disabled={disableUpload}
      onClick = {() => handleMint()}>Post</Button>
      </Flex>
      </Box>
      </>
      </ChakraProvider>
    );
  }