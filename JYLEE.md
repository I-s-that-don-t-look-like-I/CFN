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



## 테스트 시나리오

====== 컨트랙트 배포 순서 및 세팅 방법 ======

crowdfund.sol

1.  CrowdfundContract 배포
2. user.sol UserContract 배포 (1번에서 배포한 컨트랙트 주소 넣고 배포)
3. reward.sol RewardContract 배포 (1,2 컨트랙트 주소 넣고 배포)
4. CrowdfundContract에서 2,3 컨트랙트 주소 설정
   1. setContracts(유저 컨트랙트 주소, 리워드 컨트랙트 주소)
5. UserContract 에서 리워드 컨트랙트 주소 설정
   1. setRewardContract(리워드 컨트랙트 주소)

====== 현재 테스트 가능한 작업들과 방법 및 순서 ======

filmName은 "Title__감독이름" 형태로!!

​      ex) Avatar 2__James Cameron

test data는 JYLEE.md 파일 참고



 (  crowdfund.sol  )

1. 크라우드 펀드 생성 setCrowdfund()
2. 크라우드 펀드 아이템 생성 setFundingItems()



 ( user.sol )

3. 유저 생성 (닉네임 중복 가능) setUser("닉네임")
4. 유저 행사 가능한 표 수(포인트) 부여 setPointAdd(지갑주소, 지급할 포인트)



 (  crowdfund.sol  ) 

5. 크라우드 펀드 상태 변경 ( 초기값 BD -> 투표시작 시간 이후 DIP)
   1.  setCrowdfundStatus(filmName)
6. 크라우드 펀드 진행 찬반 투표(찬성 true 반대 false)
   1.  voteCrowdfund(filmName, true/false , 행사 표 수) 
7. 크라우드 펀드 상태 변경 (투표종료시간 이후 실행)
   1. 찬성 ( DIP -> WAITING) 반대 (DIP -> PENDING)
   2. setCrowdfundStatus(filmName)
8. 크라우드 펀드 상태 변경 (펀딩 시작시간 이후 실행)
   1. WAITING -> FUNDING
   2. setCrowdfundStatus(filmName)
9. 펀드 아이템 구매 recordFunding(filmName, 상품인덱스, 구매 수량) 
10. 크라우드 펀드 상태 변경 (펀딩 종료시간 이후 실행)
    1. FUNDING ->  PENDING
    2. setCrowdfundStatus(filmName) 
11. 크라우드 펀드 상태 변경 + 3일 후
    1. 목표금액 도달 PENDING -> SUCCESS
    2. 감독에게 펀딩액 전송 도달 실패 시 PENDING -> FAIL
    3. setCrowdfundStatus(filmName)
12. 약속된 리워드 지급 - 이미지 NFT 민팅 후 전송 - 영상 NFT 민팅 후 전송

13. 보유 NFT 확인

14. NFT 맞교환 기능

15. 보유 NFT 자랑글 작성



## 질문 사항

### 프론트



### 솔리디티

1. fund status 변수 없애는게 나을까요
   1. 상태 값으로 관리하려니 변경해주는 함수를 누군가 매번 실행해야함
2. 영상 NFT 제작 및 지급 시 랜덤성 부여를 위해 keccak256을 쓰고 정렬하면 될까요
3. 영화 포스터 와 같은 이미지 NFT는 1155로 발행하고, 영상은 721로 하려고 합니다. 이렇게 하면 될까요