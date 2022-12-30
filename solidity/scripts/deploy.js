const hre = require('hardhat');

async function main() {
  const Contract_A = await hre.ethers.getContractFactory('DBContract');
  const contract_a = await Contract_A.deploy();

  await contract_a.deployed();
  console.log('Address : ', contract_a.address);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
