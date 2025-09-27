require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Ganache GUI default port
      network_id: "*"
    },
    sepolia: {
      provider: () => new HDWalletProvider(
        [process.env.PRIVATE_KEY],
        process.env.INFURA_URL
      ),
      network_id: 11155111, // Sepolia chain id
      gas: 8000000,
      confirmations: 3,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.24",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
