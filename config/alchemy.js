const { Alchemy, Network } = require('alchemy-sdk');

const settings = {
  apiKey: process.env.ETH_RPC_URL, // Replace with your Alchemy API key
  network: Network.ETH_SEPOLIA,    // Replace with the correct network
};

const alchemy = new Alchemy(settings);

exports.default = alchemy;