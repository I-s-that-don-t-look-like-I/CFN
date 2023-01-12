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

function getTimeAfter(_time) {
  return (Math.ceil(Date.now() / 1000) + _time).toString();
}

async function insertTestData() {
  // await CFcontract.makeCrowdfund(
  //   '',
  //   '',
  //   '',
  //   ethers.utils.parseEther('5'),
  //   '',
  //   '',
  //   '',
  //   '',
  //   { value: ethers.utils.parseEther('0.001') }
  // );

  // ------------------------------------------------------------
  // B D --------------------------------------------------------
  // ------------------------------------------------------------
  await CFcontract.makeCrowdfund(
    'Wall Street Art__Worry John Bur-Fit',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/Wall%20Street%20Art.png',
    '돈 워리 비 해피. 월스트리트의 대부 워리 존버 핏의 예술과도 같은 성공 신화가 영화로 제작됐다. `인생은 버티는거야` 모두가 부자가 되는 그 날까지. 가즈아.',
    ethers.utils.parseEther('7.77777'),
    getTimeAfter(86400 * 365),
    getTimeAfter(86400 * 366),
    getTimeAfter(86400 * 367),
    getTimeAfter(86400 * 368),
    { value: ethers.utils.parseEther('0.001') }
  );

  await CFcontract.makeCrowdfund(
    'WIAR__Harry Copter',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/We Are Wizard.png',
    '마법사 : 물의 길. 세상을 위협하는 악의 무리를 막기 위해 네 명의 마법사가 모였다. 어느날 갑자기 안개로 뒤덮혀버린 뉴욕. 어둠이 찾아오고 종말의 분위기가 형성되자 온갖 범죄가 들끓기 시작한다. 안개의 원인은 무엇이며, 누가 꾸민 짓인가. 인류를 지키려는 네 명의 마법사는 팀을 이뤄 활동하게 되는데.',
    ethers.utils.parseEther('3'),
    getTimeAfter(86400 * 30),
    getTimeAfter(86400 * 31),
    getTimeAfter(86400 * 32),
    getTimeAfter(86400 * 33),
    { value: ethers.utils.parseEther('0.001') }
  );

  // ------------------------------------------------------------
  // D I P ------------------------------------------------------
  // ------------------------------------------------------------

  await CFcontract.makeCrowdfund(
    'Mafia__JY LEE',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/Suit Man.png',
    '눈물과 감동의 마피아 스토리!!! 이정윤 감독의 첫 작품!!! 꿀잼 보장!!',
    ethers.utils.parseEther('5'),
    getTimeAfter(-60),
    '1673600400',
    '2100000000',
    '2200000000',
    { value: ethers.utils.parseEther('0.001') }
  );

  await CFcontract.makeCrowdfund(
    'Coffee Cafe__Lionel Messi',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/CoffeCafe.png',
    '최정상에 오르기 위한 바리스타의 눈물 나는 노력!!! 리오넬 메시가 간다!! 감독의 첫 작품. 꿀잼 보장!!',
    ethers.utils.parseEther('0.5'),
    '1672422458',
    '1673710400',
    '2100000000',
    '2200000000',
    { value: ethers.utils.parseEther('0.001') }
  );

  await CFcontract.makeCrowdfund(
    'Dancing__Ronaldinho',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/Dancing.png',
    '필드 위의 댄서!! 호나우지뉴의 귀환!!! 2022 최고의 코믹 댄싱 영화!! 리오넬 메시가 간다!! 감독의 첫 작품!!! 꿀잼 보장!!',
    ethers.utils.parseEther('10'),
    '1672422458',
    '1673850400',
    '2100000000',
    '2200000000',
    { value: ethers.utils.parseEther('0.001') }
  );

  await CFcontract.makeCrowdfund(
    'Before Met You__Sun Ri-Se',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/Before Met You.png',
    '해가 뜨기 전 널 만나지 말았어야 했어. 공포 스릴러 영화 전문 선 라이 즈 감독의 세번째 작품. 무더운 여름 타오르는 태양이 뜨기 전에 우리의 만남은 시작됐다. 의문의 폭발과 비좁은 골목에서의 추격전. 그러나 진정한 공포는 해가 뜨고 시작된다.',
    ethers.utils.parseEther('3'),
    '1672422458',
    '1674000400',
    '2100000000',
    '2200000000',
    { value: ethers.utils.parseEther('0.001') }
  );

  await CFcontract.makeCrowdfund(
    'LOVE Spy__Nero Nambul',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/Love Spy.png',
    '내가하면 불륜 스파이가 하면 로맨스! 네로 남블 감독의 첫 19금 액션 로맨스 영화. 작전 중 우연히 마주한 격투기 선수와의 스파링. 그 안에서 피어나는 사랑! 예측불허 본격 러브 로맨스!! 좌충우돌 스파이의 사랑이야기',
    ethers.utils.parseEther('0.15'),
    '1672422458',
    '1700600400',
    '2100000000',
    '2200000000',
    { value: ethers.utils.parseEther('0.001') }
  );

  // ------------------------------------------------------------
  // F U N D I N G ----------------------------------------------
  // ------------------------------------------------------------

  await CFcontract.makeCrowdfund(
    '연어공주__Salmon Dal-gyal',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/연어공주.png',
    '연어를 너무 사랑한 나머지 새해 소원을 바다에 살게 해달라고 빌었던 노르웨이 공주의 이야기. 살몬 달걀 감독의 풍부한 해양지식과 이국적인 분위기를 가진 제주도 숨은 스팟이 조화를 이뤄 노르웨이 느낌의 촬영을 진행한다.     다시 육지로 돌아가고 싶은 연어공주는 해양동굴로 들어가 100일 동안 다시마와 해파리 냉채만 먹게 되는데. 과연 연어공주는 다시 육지로 돌아갈 수 있을지.',
    ethers.utils.parseEther('0.25'),
    getTimeAfter(-60),
    getTimeAfter(30),
    getTimeAfter(120),
    getTimeAfter(86400 * 30),
    { value: ethers.utils.parseEther('0.001') }
  );

  await CFcontract.makeCrowdfund(
    '불씨에 사랑착__손현빈',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/불씨에 사랑착.png',
    '공동 경비 구역에 피어오른 연기. 그 곳에서 우연히 만난 손예빈과 현진은 고구마를 나눠 먹으며 사랑의 불씨를 피우게 된다. 방심을 틈타 불시에 찾아온 사랑. 과연 이들의 만남이 된 불씨는 불안했던 연애 생활의 종착역이 될 것인가',
    ethers.utils.parseEther('0.25'),
    getTimeAfter(-60),
    getTimeAfter(30),
    getTimeAfter(120),
    getTimeAfter(86400 * 30),
    { value: ethers.utils.parseEther('0.001') }
  );

  await CFcontract.makeCrowdfund(
    '보살 미안 랩소리__BJ풀소유',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/보살 미안 랩소리 .png',
    '구독자 150만의 BJ풀소유의 영화 감독 데뷔작. 어릴 적 절 앞에 버려져 보살님의 손에 자란 주인공 무상. 평소 남다른 박자감으로 불경을 외우던 무상은 어느 날 자신이 목탁 소리와 새소리등 모든 소리의 음을 맞추는 절대음감임을 깨닫는다. 자신을 친자식처럼 키워주었던 보살님의 만류에도 쇼미더머니에 출연을 결심한 무상의 인생 역전 랩소리를 담은 영화',
    ethers.utils.parseEther('0.77'),
    getTimeAfter(-60),
    getTimeAfter(30),
    getTimeAfter(120),
    getTimeAfter(86400 * 45),
    { value: ethers.utils.parseEther('0.001') }
  );

  await CFcontract.makeCrowdfund(
    '야수가 미녀__김지킬',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/야수가 미녀.png',
    '낮에는 야수, 밤에는 미녀. 자연과 도심을 오가는 정체불명의 생물체. 직힐&하이트 작가의 소설이 영화화 됐다. 낮과 밤이 다른 그의 정체는 무엇이고, 도심에 오는 목적은 무엇일까',
    ethers.utils.parseEther('0.9'),
    getTimeAfter(-60),
    getTimeAfter(30),
    getTimeAfter(120),
    getTimeAfter(86400 * 50),
    { value: ethers.utils.parseEther('0.001') }
  );

  await CFcontract.makeCrowdfund(
    'LA Land__Tae Jin-A',
    'https://gateway.pinata.cloud/ipfs/QmeizXq32ih3HtTvDLoN6U3wPQGG1V18xrWset2wfLS168/LA Land.png',
    '라 라라라 LA에 울려퍼지는 K-Pop. 비가 오던 그 날 전설이 시작됐다. 태진아 감독 연출. 주연 배우 비 확정. LA에서 펼쳐지는 그들의 춤선과 음악.',
    ethers.utils.parseEther('0.1'),
    getTimeAfter(-60),
    getTimeAfter(30),
    getTimeAfter(120),
    '1673600400',
    { value: ethers.utils.parseEther('0.001') }
  );

  // ------------------------------------------------------------

  console.log('INSERT COMPLETE');
}

async function setFundStatus() {
  // await CFcontract.setCrowdfundStatus('Mafia__JY LEE');
  // await CFcontract.voteCrowdfund('Mafia__JY LEE', true, '13');

  // ------------------------------------------------------------
  // D I P ------------------------------------------------------
  // ------------------------------------------------------------
  await CFcontract.ForceChangeCrowdfundStatus('Mafia__JY LEE', '1');
  await CFcontract.ForceChangeCrowdfundStatus('Coffee Cafe__Lionel Messi', '1');
  await CFcontract.ForceChangeCrowdfundStatus('Dancing__Ronaldinho', '1');
  await CFcontract.ForceChangeCrowdfundStatus('Before Met You__Sun Ri-Se', '1');
  await CFcontract.ForceChangeCrowdfundStatus('LOVE Spy__Nero Nambul', '1');

  // ------------------------------------------------------------
  // F U N D I N G ----------------------------------------------
  // ------------------------------------------------------------
  await CFcontract.ForceChangeCrowdfundStatus('연어공주__Salmon Dal-gyal', '1');
  await CFcontract.ForceChangeCrowdfundStatus('불씨에 사랑착__손현빈', '1');
  await CFcontract.ForceChangeCrowdfundStatus(
    '보살 미안 랩소리__BJ풀소유',
    '1'
  );
  await CFcontract.ForceChangeCrowdfundStatus('야수가 미녀__김지킬', '1');
  await CFcontract.ForceChangeCrowdfundStatus('LA Land__Tae Jin-A', '1');

  await CFcontract.voteCrowdfund(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    '연어공주__Salmon Dal-gyal',
    true,
    '72'
  );
  await CFcontract.voteCrowdfund(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    '연어공주__Salmon Dal-gyal',
    false,
    '34'
  );
  await CFcontract.voteCrowdfund(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    'LA Land__Tae Jin-A',
    true,
    '13'
  );
  await CFcontract.voteCrowdfund(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    'LA Land__Tae Jin-A',
    false,
    '3'
  );
  await CFcontract.voteCrowdfund(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    '불씨에 사랑착__손현빈',
    true,
    '25'
  );
  await CFcontract.voteCrowdfund(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    '불씨에 사랑착__손현빈',
    false,
    '9'
  );
  await CFcontract.voteCrowdfund(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    '보살 미안 랩소리__BJ풀소유',
    true,
    '77'
  );
  await CFcontract.voteCrowdfund(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    '보살 미안 랩소리__BJ풀소유',
    false,
    '7'
  );
  await CFcontract.voteCrowdfund(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    '야수가 미녀__김지킬',
    true,
    '79'
  );
  await CFcontract.voteCrowdfund(
    '0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0',
    '야수가 미녀__김지킬',
    false,
    '42'
  );

  await CFcontract.ForceChangeCrowdfundStatus('연어공주__Salmon Dal-gyal', '3');
  await CFcontract.ForceChangeCrowdfundStatus('LA Land__Tae Jin-A', '3');
  await CFcontract.ForceChangeCrowdfundStatus('불씨에 사랑착__손현빈', '3');
  await CFcontract.ForceChangeCrowdfundStatus(
    '보살 미안 랩소리__BJ풀소유',
    '3'
  );
  await CFcontract.ForceChangeCrowdfundStatus('야수가 미녀__김지킬', '3');

  console.log('SET STATUS COMPLETE');
}

async function main() {
  await insertTestData();
  await setFundStatus();
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
