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
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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
```



