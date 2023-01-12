require('dotenv').config(); // dotenv 불러오기
const ethers = require('ethers'); // ethers 불러오기

const provider = new ethers.providers.AlchemyProvider(
  (network = 'goerli'),
  process.env.Alchemy_KEY
);
const signer = new ethers.Wallet(process.env.PVK, provider);

let cfABI = process.env.CFABI;
let cfaddr = process.env.CONTRACT_CROWDFUND_ADDRESS;
const CFcontract = new ethers.Contract(cfaddr, cfABI, signer);

async function main() {
  await CFcontract.registUser('yy***@gmail.com');
  await CFcontract.addPoints(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    '1000'
  );

  console.log('REGISTER USER & ADD DEFAULT 10 POINTS COMPLETE');
  console.log('ADD 1000 POINTS COMPLETE');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
