require("@nomiclabs/hardhat-waffle");

//npx hardhat run scripts/deploy.js --network mumbai

require('dotenv').config();
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  networks : {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  solidity: "0.8.4",
};
