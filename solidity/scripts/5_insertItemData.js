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

async function makeFundingItem(_filmName) {
  // await CFcontract.makeFundingItem();
  await CFcontract.makeFundingItem(
    _filmName,
    ['기부 상품입니다.', '앤딩 크레딧 이름 표시', '영화 포스터 NFT 지급'],
    [1, 2],
    ethers.utils.parseEther('0.001'),
    '1000'
  );
  await CFcontract.makeFundingItem(
    _filmName,
    ['앤딩 크레딧 이름 표시', '영화 포스터 NFT 지급', '영상 NFT 10초 분량 x 2'],
    [1, 2, 3, 3, 3],
    ethers.utils.parseEther('0.01'),
    '30'
  );
  await CFcontract.makeFundingItem(
    _filmName,
    [
      '앤딩 크레딧 이름 표시',
      '영화 포스터 NFT 지급',
      '영상 NFT 20초 분량 x 2',
      '시사회 초청(1인)',
    ],
    [1, 2, 4, 4, 4, 6],
    ethers.utils.parseEther('0.05'),
    '30'
  );
  await CFcontract.makeFundingItem(
    _filmName,
    [
      '앤딩 크레딧 이름 표시',
      '영화 포스터 NFT 지급',
      '영상 NFT 30초 분량 x 2',
      '시사회 초청(2인)',
      '나만의 소품 출연',
    ],
    [1, 2, 5, 5, 5, 6, 6, 7],
    ethers.utils.parseEther('0.1'),
    '10'
  );
  console.log('MAKE FUND ITEM COMPLETE : ', _filmName);
}

async function makeAll() {
  await makeFundingItem('Mafia__JY LEE');
  await makeFundingItem('Coffee Cafe__Lionel Messi');
  await makeFundingItem('Dancing__Ronaldinho');
  await makeFundingItem('Before Met You__Sun Ri-Se');
  await makeFundingItem('LOVE Spy__Nero Nambul');
  await makeFundingItem('LA Land__Tae Jin-A');
  await makeFundingItem('불씨에 사랑착__손현빈');
  await makeFundingItem('보살 미안 랩소리__BJ풀소유');
  await makeFundingItem('야수가 미녀__김지킬');
}

makeAll().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
