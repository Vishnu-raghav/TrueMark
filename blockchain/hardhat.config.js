require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // .env file se secrets lene ke liye

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", // tum apna version rakh sakte ho
  networks: {
  polygon_amoy: {
    url: process.env.MUMBAI_RPC_URL,
    accounts: [process.env.PRIVATE_KEY]
  }
}
};
