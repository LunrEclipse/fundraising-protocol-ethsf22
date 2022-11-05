import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Text, Flex, Box, Button, Badge} from '@chakra-ui/react'
import {
    LivepeerConfig,
    createReactClient,
    studioProvider,
  } from '@livepeer/react';
  import * as React from 'react';
  import { useDropzone } from 'react-dropzone';
  import {useState, useCallback, useMemo} from 'react';
  import { Player, useAsset, useCreateAsset, useAssetMetrics } from '@livepeer/react';

function Post() {


  const livepeerClient = createReactClient({
    provider: studioProvider({
      apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
    }),
  });
    const [video, setVideo] = useState();
    const {
      mutate: createAsset,
      data: createdAsset,
      status: createStatus,
      error: createError,
      uploadProgress,
    } = useCreateAsset();

    const { data: asset, status: assetStatus } = useAsset({
        assetId: createdAsset?.id,
        refetchInterval: (asset) =>
          asset?.status?.phase !== 'ready' ? 5000 : false,
      });
    const { data: metrics } = useAssetMetrics({
        assetId: createdAsset?.id,
        refetchInterval: 30000,
      });
 
    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
          setVideo(acceptedFiles[0]);
        }
      }, []);

      const { getRootProps, getInputProps } = useDropzone({
        accept: {
          'video/*': ['*.mp4'],
        },
        maxFiles: 1,
        onDrop,
      });    


      const progressFormatted = useMemo(
        () =>
          uploadProgress
            ? `Uploading: ${Math.round(uploadProgress * 100)}%`
            : asset?.status?.progress
            ? `Processing: ${Math.round(asset?.status?.progress * 100)}%`
            : null,
        [uploadProgress, asset?.status?.progress],
      );

    return (
        <>
        <Flex>
            <Text fontSize='50px'>
                Post
            </Text>
            <ConnectButton chainStatus={'none'}/>
        </Flex>
         
         <Box {...getRootProps()}>
           <Box as="input" {...getInputProps()} />
           <Box as="p">
             <Text>Drag and drop or browse files</Text>
           </Box>
         </Box>
    
         {createError?.message && <Text>{createError.message}</Text>}
    
         {video ? (
           <Badge>{video.name}</Badge>
         ) : (
           <Text>Select a video file to upload.</Text>
         )}
         {progressFormatted && <Text>{progressFormatted}</Text>}
    
         <Button
           onClick={() => {
             if (video) {
               createAsset({ name: video.name, file: video });
             }
           }}
           disabled={!video || createStatus === 'loading'}
         >
           Upload
         </Button>
       </>
    );
    }

export default Post;