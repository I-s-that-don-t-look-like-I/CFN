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

async function setFundStatusToFunding() {
  // await CFcontract.setCrowdfundStatus('Mafia__JY LEE');

  // ------------------------------------------------------------
  // F U N D I N G ----------------------------------------------
  // ------------------------------------------------------------
  // await CFcontract.setCrowdfundStatus('LA Land__Tae Jin-A');
  // await CFcontract.setCrowdfundStatus('불씨에 사랑착__손현빈');
  // await CFcontract.setCrowdfundStatus('보살 미안 랩소리__BJ풀소유');
  // await CFcontract.setCrowdfundStatus('야수가 미녀__김지킬');
  await CFcontract.setCrowdfundStatus('지금 잡으러 갑니다__이지금');

  console.log('SET STATUS TO FUNDING COMPLETE');
}

async function main() {
  await setFundStatusToFunding();
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
