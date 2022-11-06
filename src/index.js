import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.mainnet],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
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
// const colors = {

//   brand: {
//     black: '#151514',
//     lightyellow: '#FEFDF9',
//     white: '#FFFFFF',
//     green: '#E6FC9C',
//     purple:'8E84EF',

//   },
// }
// const styles = {
//   global: (props) => ({
//     body:{
//       // bg: props.colorMode === "dark" ? "brand.black" : "brand.lightyellow",
//       bg: "brand.lightyellow",
//       color: "brand.black",
//     },
//   })
// }
// const theme = extendTheme({ colors, styles})
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
    // </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
