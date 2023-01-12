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

async function buy(filmName, index, amount, price) {
  await CFcontract.buyFundItem(filmName, index, amount, {
    // value: ethers.utils.parseEther(amount * price) + '',
    value: '1000000000000000',
  }).then(console.log);
}

buy('야수가 미녀__김지킬', 0, 1, 1000000000000000).catch(error => {
  console.error(error);
});
