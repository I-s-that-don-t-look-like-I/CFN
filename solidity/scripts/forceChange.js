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

let DataABI = process.env.DataABI;
let dbaddr = process.env.CONTRACT_DATA_ADDRESS;
const DBcontract = new ethers.Contract(dbaddr, DataABI, signer);

function getTimeAfter(_time) {
  return (Math.ceil(Date.now() / 1000) + _time).toString();
}

async function main() {
  await CFcontract.ForceChangeCrowdfundStatus('연어공주__Salmon Dal-gyal', '3');
  // await CFcontract.ForceChangeCrowdfundStatus(
  //   'Wall Street Art__Worry John Bur-Fit',
  //   '1'
  // );
  // await CFcontract.setCrowdfundStatus('Wall Street Art__Worry John Bur-Fit');
  // await DBcontract.changeCrowdfundData(
  //   'Wall Street Art__Worry John Bur-Fit',
  //   'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/Wall%20Street%20Art.png',
  //   '돈 워리 비 해피. 월스트리트의 대부 워리 존버 핏의 예술과도 같은 성공 신화가 영화로 제작됐다. `인생은 버티는거야` 모두가 부자가 되는 그 날까지. 가즈아.',
  //   ethers.utils.parseEther('0.77777'),
  //   getTimeAfter(120),
  //   getTimeAfter(240),
  //   getTimeAfter(360),
  //   getTimeAfter(480)
  // );
  // await CFcontract.ForceChangeCrowdfundStatus('야수가 미녀__김지킬', '3');
  // CFcontract.ForceChangeCrowdfundStatus('LA Land__Tae Jin-A', '2');
  // CFcontract.ForceChangeCrowdfundStatus('불씨에 사랑착__손현빈', '2');
  // CFcontract.ForceChangeCrowdfundStatus('보살 미안 랩소리__BJ풀소유', '2');
  // CFcontract.ForceChangeCrowdfundStatus('야수가 미녀__김지킬', '2');
  // await DBcontract.changeCrowdfundData(
  //   'LA Land__Tae Jin-A',
  //   'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/LA Land.png',
  //   '라 라라라 LA에 울려퍼지는 K-Pop. 비가 오던 그 날 전설이 시작됐다. 태진아 감독 연출. 주연 배우 비 확정. LA에서 펼쳐지는 그들의 춤선과 음악.',
  //   ethers.utils.parseEther('0.1'),
  //   getTimeAfter(-86400),
  //   getTimeAfter(60),
  //   getTimeAfter(0),
  //   '1673600400'
  // );
  // await DBcontract.changeCrowdfundData(
  //   '불씨에 사랑착__손현빈',
  //   'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/불씨에 사랑착.png',
  //   '공동 경비 구역에 피어오른 연기. 그 곳에서 우연히 만난 손예빈과 현진은 고구마를 나눠 먹으며 사랑의 불씨를 피우게 된다. 방심을 틈타 불시에 찾아온 사랑. 과연 이들의 만남이 된 불씨는 불안했던 연애 생활의 종착역이 될 것인가',
  //   ethers.utils.parseEther('0.25'),
  //   getTimeAfter(-86400),
  //   getTimeAfter(60),
  //   getTimeAfter(0),
  //   getTimeAfter(86400 * 30)
  // );
  // await DBcontract.changeCrowdfundData(
  //   '보살 미안 랩소리__BJ풀소유',
  //   'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/보살 미안 랩소리 .png',
  //   '구독자 150만의 BJ풀소유의 영화 감독 데뷔작. 어릴 적 절 앞에 버려져 보살님의 손에 자란 주인공 무상. 평소 남다른 박자감으로 불경을 외우던 무상은 어느 날 자신이 목탁 소리와 새소리등 모든 소리의 음을 맞추는 절대음감임을 깨닫는다. 자신을 친자식처럼 키워주었던 보살님의 만류에도 쇼미더머니에 출연을 결심한 무상의 인생 역전 랩소리를 담은 영화',
  //   ethers.utils.parseEther('0.77'),
  //   getTimeAfter(-86400),
  //   getTimeAfter(60),
  //   getTimeAfter(0),
  //   getTimeAfter(86400 * 45)
  // );
  // await DBcontract.changeCrowdfundData(
  //   '야수가 미녀__김지킬',
  //   'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/야수가 미녀.png',
  //   '낮에는 야수, 밤에는 미녀. 자연과 도심을 오가는 정체불명의 생물체. 직힐&하이트 작가의 소설이 영화화 됐다. 낮과 밤이 다른 그의 정체는 무엇이고, 도심에 오는 목적은 무엇일까',
  //   ethers.utils.parseEther('0.9'),
  //   getTimeAfter(-86400),
  //   getTimeAfter(60),
  //   getTimeAfter(0),
  //   getTimeAfter(86400 * 50)
  // );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
