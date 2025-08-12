// const hre = require("hardhat");
// const fs = require("fs");

// async function main() {
//   const CertificateStorage = await hre.ethers.getContractFactory("CertificateStorage");
//   const certificateStorage = await CertificateStorage.deploy();
//   await certificateStorage.deployed();

//   console.log("Contract deployed to:", certificateStorage.address);

//   // ABI + address save for backend/frontend
//   fs.writeFileSync(
//     "abi.json",
//     JSON.stringify({
//       address: certificateStorage.address,
//       abi: JSON.parse(certificateStorage.interface.format("json"))
//     }, null, 2)
//   );
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const CertificateStorage = await hre.ethers.getContractFactory("CertificateStorage");
  const certificateStorage = await CertificateStorage.deploy();

  console.log("Contract deployed to:", certificateStorage.target || certificateStorage.address);

  const abiJson = certificateStorage.interface.format("json");
  const abi = Array.isArray(abiJson) ? JSON.parse(abiJson.join('')) : JSON.parse(abiJson);

  fs.writeFileSync(
    "abi.json",
    JSON.stringify({
      address: certificateStorage.target || certificateStorage.address,
      abi: abi
    }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
