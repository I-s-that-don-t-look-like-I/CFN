const hre = require('hardhat');
require('dotenv').config(); // dotenv 불러오기
const ethers = require('ethers'); // ethers 불러오기

async function main() {
  const dbcontract = await hre.ethers.getContractFactory('DBContract');
  const DBCont = await dbcontract.deploy();
  await DBCont.deployed();

  const dbucontract = await hre.ethers.getContractFactory('DBUserContract');
  const DBUCont = await dbucontract.deploy();
  await DBUCont.deployed();

  const cfcontract = await hre.ethers.getContractFactory('CrowdfundContract');
  const CFCont = await cfcontract.deploy(DBCont.address, DBUCont.address);
  await CFCont.deployed();

  const rcontract = await hre.ethers.getContractFactory('RewardContract');
  const RCont = await rcontract.deploy(
    'CFN BETA',
    'CB',
    DBCont.address,
    DBUCont.address
  );
  await RCont.deployed();

  await DBCont.setContracts(CFCont.address, RCont.address);
  await DBUCont.setContracts(CFCont.address, RCont.address);

  console.log('==================================');
  console.log(`CONTRACT_DATA_ADDRESS = "${DBCont.address}"`);
  console.log(`CONTRACT_DATAUSER_ADDRESS = "${DBUCont.address}"`);
  console.log(`CONTRACT_CROWDFUND_ADDRESS = "${CFCont.address}"`);
  console.log(`CONTRACT_REWARD_ADDRESS = "${RCont.address}"`);
  console.log('==================================');
}

// main().catch(error => {
//   console.error(error);
//   process.exitCode = 1;
// });

async function getContractAddress() {
  const provider = new ethers.providers.AlchemyProvider(
    (network = 'goerli'),
    process.env.Alchemy_KEY
  );
  const signer = new ethers.Wallet(process.env.PVK, provider);

  let dbABI = process.env.DataABI;
  let dbaddr = process.env.CONTRACT_DATA_ADDRESS;
  const DBcontract = new ethers.Contract(dbaddr, dbABI, signer);

  let dbuABI = process.env.DataABI;
  let dbuaddr = process.env.CONTRACT_DATA_ADDRESS;
  const DBUcontract = new ethers.Contract(dbuaddr, dbuABI, signer);

  await DBcontract.getContractsAddrs().then(console.log);
  await DBUcontract.getContractsAddrs().then(console.log);
}

getContractAddress().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
