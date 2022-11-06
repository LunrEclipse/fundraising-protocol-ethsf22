import { Player } from '@livepeer/react';
import { parseArweaveTxId, parseCid } from 'livepeer/media';
import { Text, Box } from '@chakra-ui/react';
import { TextField } from '@mui/material';

 
import { useMemo, useState } from 'react';
 
export const DecentralizedStoragePlayback = () => {
  const [url, setUrl] = useState('');
 
  const idParsed = useMemo(() => parseCid(url) ?? parseArweaveTxId(url), [url]);
 
  return (
    <>
      <Box>
        <Text>IPFS or Arweave URL</Text>
        <TextField
          type="text"
          placeholder="ipfs://... or ar://"
          onChange={(e) => setUrl(e.target.value)}
        />
 
        {url && !idParsed && (
          <Text>Provided value is not a valid identifier.</Text>
        )}
      </Box>
 
      {idParsed && (
        <Player title={idParsed.id} src={url} autoPlay muted autoUrlUpload />
      )}
    </>
  );
};
export default DecentralizedStoragePlayback;