//npx hardhat run --network mumbai scripts/deploy.js
const hre = require("hardhat");

async function main() {
  /* deploy the Fundraiser Contract */
  const Fundraiser = await hre.ethers.getContractFactory("Fundraiser");
  const fundraiser = await Fundraiser.deploy();
  await fundraiser.deployed();
  console.log("Fundraiser deployed to:", fundraiser.address);

  console.log("Setup Complete")
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
