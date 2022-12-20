# 환경설정

## firebase

```javascript
npm i firebase
npm install -g firebase-tools
```

1. 프로젝트 추가
2. Authentication
   1. Sign-in method - 새 공급업체 추가
3. 보안을 위해 제공되는 키는 .env 파일을 생성하여 별도 관리하고 .gitignore에 추가

```javascript
//fbase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);
```

## react-router-dom

```javascript
npm i react-router-dom
```

## file path

```javascript
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}

```

## font-awesome

```javascript
npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/free-solid-svg-icons
npm i @fortawesome/fontawesome-free
npm install --save @fortawesome/fontawesome-free
```

## Metamask

```javascript
npm i @metamask/detect-provider
```

## ether

```
npm install ethers
```

## chakra ui card

```
npm i @chakra-ui/card
npm install react-date-picker
```



## react-slick

```
npm install react-slick --save
npm install slick-carousel --save
```



## SMART CONTRACT

1. 필요 기능 정의
   - 크라우드 펀드
     - 영화제목으로 크라우드펀드 검색
     - 감독으로 크라우드펀드 검색
     - 내가 투자한 크라우드펀드 조회
   - 펀딩 내역
     - 영화제목으로 펀딩 내역 리스트 조회
     - 영화제목으로 펀딩 금액 합산
     - 내가 투자한 펀딩 내역 조회
   - 유저
     - 지갑주소로 유저 정보 조회
     - 내가 투자한 리스트 조회
     - 내가 보유한 NFT 조회



## Test Data

"Mafia__JY LEE"

"https://gateway.pinata.cloud/ipfs/QmRa4x66YvGzyrVRo7sLKQo4LqArbAZBAiZBCKmoPFRRsT/SuitMan.png"

"눈물과 감동의 마피아 스토리!!! 이정윤 감독의 첫 작품!!! 꿀잼 보장!!"

10000000000000000000

1671447600

1671469200



["기부 상품입니다.","앤딩 크레딧 이름 표시","영화 포스터 NFT 지급"]

1000000000000000

999

[1,2]



["앤딩 크레딧 이름 표시","영화 포스터 NFT 지급","영상 NFT 10초 분량 x 3"]

10000000000000000

55

[1,2,3,3,3]

---

"Coffee Cafe__Lionel Messi"

"https://gateway.pinata.cloud/ipfs/QmRa4x66YvGzyrVRo7sLKQo4LqArbAZBAiZBCKmoPFRRsT/CoffeCafe.png"

1000000000000000000

1671494400

1672498799



## 테스트 시나리오

1. Deploy Contract
2. setCrowdFund  Value = 0.0001 Ether
3. setCrowdFundItems
4. setUser
5. setPointAdd
6. getUser
   1. 포인트 변화 확인
7. getCrowdfundByKeyValue
   1. 펀드 현재 상태 및 투표 상태 확인
8. setCrowdfundStatus
   1. 투표 시작 시간 이후 펀드 상태 변경
9. voteCrowdfund
10. getUser
    1. 유저 투표 배열 확인
11. getUserVoteProConCount
    1. 유저 투표 내용 확인
12. setCrowdfundStatus
    1. 투표시간 종료 후 펀드 상태 변경
13. setCrowdfundStatus
    1. 펀딩 시작 시간 이후 펀드 상태 변경
14. recordFunding
    1. 펀드 상태에 따라 펀드 가능 여부 확인
    2. 펀드 상품 구매 정상 여부 확인
15. getUser
    1. 투자 펀드 목록 확인
16. getUserFundList
    1. 유저별 펀드별 투자 목록 확인
17. setCrowdfundStatus
    1. 투자 총합 금액에 따라 펀드 성공 실패 상태 변경 확인
18. 펀드 성공 시 감독 지갑으로 해당 금액 전송 확인
19. 투자자들 펀드 내역 "Paid"로 변경 확인
20. 리워드 지급 약속에 따라 민팅
21. 투자자들 지갑으로 전송
22. 보유 NFT 확인
23. NFT 맞교환 기능
24. 보유 NFT 자랑글 작성



## 질문 사항

### 프론트



### 솔리디티

1. fund status 변수 없애는게 나을까요
   1. 상태 값으로 관리하려니 변경해주는 함수를 누군가 매번 실행해야함