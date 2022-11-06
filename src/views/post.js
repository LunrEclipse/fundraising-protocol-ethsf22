import {
  Box, Button, extendTheme, Flex, FormControl,
  FormLabel, Input, Text, Textarea, useToast
} from '@chakra-ui/react';
import { useUpdateAsset } from '@livepeer/react';
import * as React from 'react';
import axios from 'axios';

const projectKey = process.env.REACT_APP_INFURA_ID;
const secretId = process.env.REACT_APP_INFURA_KEY;

  export default function Post() {
    let [value, setValue] = React.useState('')
    let [file, setFile] = React.useState(null)
    let [disableUpload, setDisableUpload] = React.useState(false)
    const toast = useToast()
    
    let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }
  
  async function handleMint() {
    if (value !== '' && file !== null) {
      // setDisableUpload(true)
      console.log("Uploading to IPFS")
      let auth = projectKey + ":" + secretId
      console.log(auth)
      file["path"] = "/" + file.name
      console.log(file)
      axios.post(`https://ipfs.infura.io:5001/api/v0/add`, { file: "/path"}, {
        headers: {
          'Authorization': 'Basic ' + btoa(auth),
          'Content-Type': file.type
        }
      }).then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
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

    return(
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
    );
  }