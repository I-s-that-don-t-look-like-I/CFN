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

