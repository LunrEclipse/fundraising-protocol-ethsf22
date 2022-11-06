import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  createReactClient, LivepeerConfig, studioProvider
} from '@livepeer/react';
import {
  getDefaultWallets, midnightTheme, RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.mainnet],
  [
    //alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Fundraiser Protocol',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});
const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ChakraProvider theme={theme}>
  <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme = {midnightTheme({
        accentColor:'#151514',
        borderRadius:'large',
      })}>
        <LivepeerConfig client={livepeerClient}>
            <App />
        </LivepeerConfig>
      </RainbowKitProvider>
    </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
