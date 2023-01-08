// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { doc, updateDoc } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { FirebaseRead } from 'src/components/molecules/FirebaseDbManager';
// import { authService, dbService } from 'src/fbase';
// import { useWallet } from './useMetamask';

// export default async function useInterGoogleMeta(_email) {
//   const { account, getAccount } = useWallet();
//   const [user, setUser] = useState();

//   //   useEffect(() => {
//   //     interAccount();
//   //   }, [account, user]);

//   //   const interAccount = async () => {
//   try {
//     getAccount();
//     const provider = new GoogleAuthProvider();
//     const response = await signInWithPopup(authService, provider);
//     const us = response.user;
//     setUser(us);
//     const user = await FirebaseRead({
//       _collection: 'users',
//       _column: 'google_id',
//       _value: us.email,
//       _compOpt: '==',
//     });
//     let metaAddr;
//     if (user) {
//       metaAddr =
//         user.docChanges()[0].doc._document.data.value.mapValue.fields.metaAddr
//           .stringValue;
//     }
//     if (metaAddr === account) {
//       toast.info('이미 등록된 지갑 주소입니다.');
//     } else {
//       const docRef = doc(
//         dbService,
//         'users',
//         user.docs[0]._key.path.segments[6]
//       );
//       const data = {
//         metaAddr: account,
//       };
//       updateDoc(docRef, data)
//         .then(docRef => {
//           toast.success('연동을 완료했습니다.');
//         })
//         .catch(error => {
//           toast.error(error);
//         });
//     }
//     localStorage.setItem('_user', user);
//   } catch (error) {
//     console.error(error);
//   }
//   //   };
//   //   return { interAccount };
// }
