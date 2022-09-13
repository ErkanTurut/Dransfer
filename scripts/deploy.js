const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Get the ContractFactories and Signers here.
  const Dransfer = await ethers.getContractFactory("DransferStorage");
  const dransfer = await Dransfer.deploy(2);
  await dransfer.deployed();
  console.log("DransferStorage contract address", dransfer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
