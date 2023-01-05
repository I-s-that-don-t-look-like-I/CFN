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

let dbuABI = process.env.DataUserABI;
let dbuaddr = process.env.CONTRACT_DATAUSER_ADDRESS;
const DBUcontract = new ethers.Contract(dbuaddr, dbuABI, signer);

async function readData(_filmName) {
  await DBcontract.getCrowdfundByFilmName(_filmName).then(console.log);
  // await DBcontract.getCrowdfundListByStatus('1').then(console.log);
  // await DBcontract.getFundingItemList(_filmName).then(console.log);
  // await DBUcontract.getUser('0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0').then(
  //   console.log
  // );
}

// readData('Mafia__JY LEE');
// readData('Coffee Cafe__Lionel Messi');
// readData('Dancing__Ronaldinho');
// readData('Before Met You__Sun Ri-Se');
// readData('LOVE Spy__Nero Nambul');
// readData('LA Land__Tae Jin-A');
// readData('불씨에 사랑착__손현빈');
// readData('보살 미안 랩소리__BJ풀소유');
// readData('야수가 미녀__김지킬');
readData('Wall Street Art__Worry John Bur-Fit');
// readData('TestData__DirectorName');
