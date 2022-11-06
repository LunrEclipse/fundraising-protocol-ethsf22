import {
    LivepeerConfig,
    createReactClient,
    studioProvider,
  } from '@livepeer/react';
  import * as React from 'react';
  import DecentralizedStoragePlayback from './ipfs';
  const livepeerClient = createReactClient({
    provider: studioProvider({
      apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
    }),
  });
  function Retrieve() {
    return (
      <LivepeerConfig client={livepeerClient}>
        <DecentralizedStoragePlayback/>
      </LivepeerConfig>
    );
  }
  export default Retrieve;