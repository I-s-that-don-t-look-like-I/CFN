require('dotenv').config(); // dotenv 불러오기
const ethers = require('ethers'); // ethers 불러오기

const provider = new ethers.providers.AlchemyProvider(
  (network = 'goerli'),
  process.env.Alchemy_KEY
);
const signer = new ethers.Wallet(process.env.PVK, provider);

// let cfABI = process.env.CFABI;
// let cfaddr = process.env.CONTRACT_CROWDFUND_ADDRESS;
// const CFcontract = new ethers.Contract(cfaddr, cfABI, signer);

let dbABI = process.env.DataABI;
let dbaddr = process.env.CONTRACT_DATA_ADDRESS;
const DBcontract = new ethers.Contract(dbaddr, dbABI, signer);

async function readData(_filmName) {
  await DBcontract.getCrowdfundByFilmName(_filmName).then(console.log);
}

// readData('Mafia__JY LEE');
// readData('LA Land__Tae Jin-A');
// readData('불씨에 사랑착__손현빈');
readData('야수가 미녀__김지킬');
