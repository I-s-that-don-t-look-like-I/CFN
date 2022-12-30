require('dotenv').config(); // dotenv 불러오기
const ethers = require('ethers'); // ethers 불러오기

const provider = new ethers.providers.AlchemyProvider(
  (network = 'goerli'),
  process.env.Alchemy_KEY
);
const signer = new ethers.Wallet(process.env.PVK, provider);
// let dataABI = process.env.DataABI;
// let dbaddr = process.env.CONTRACT_DATA_ADDRESS;

// let dataUserABI = process.env.DataUserABI;
// let dbuaddr = process.env.CONTRACT_DATAUSER_ADDRESS;

let cfABI = process.env.CFABI;
let cfaddr = process.env.CONTRACT_CROWDFUND_ADDRESS;

// let rABI = process.env.rewardABI;
// let raddr = process.env.CONTRACT_REWARD_ADDRESS;

// const DBcontract = new ethers.Contract(dbaddr, dataABI, signer);
// const DBUcontract = new ethers.Contract(dbuaddr, dataUserABI, signer);
const CFcontract = new ethers.Contract(cfaddr, cfABI, signer);
// const Rcontract = new ethers.Contract(raddr, rABI, signer);

CFcontract.makeCrowdfund(
  'Mafia__JY LEE',
  'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/Suit Man.png',
  '눈물과 감동의 마피아 스토리!!! 이정윤 감독의 첫 작품!!! 꿀잼 보장!!',
  ethers.utils.parseEther('5'),
  1672406000,
  1672406600,
  1672407200,
  1672407800,
  { value: ethers.utils.parseEther('0.0001') }
);
