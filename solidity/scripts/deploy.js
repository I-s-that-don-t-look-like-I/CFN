const hre = require('hardhat');

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

  console.log('==================================');
  console.log('DBC : ', DBCont.address);
  console.log('DBUC : ', DBUCont.address);
  console.log('CROWDFUND : ', CFCont.address);
  console.log('REWARD : ', RCont.address);
  console.log('==================================');

  DBCont.setContracts(CFCont.address, RCont.address);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
