import { Box, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FirebaseRead } from 'src/components/molecules/FirebaseDbManager';
import { dbService } from 'src/fbase';
import { useWallet, useWeb3 } from 'src/hooks/useMetamask';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useGoogleAuth } from 'src/hooks/useGoogleAuth';

export default function AccountSetting() {
  const { account, getAccount } = useWallet();
  const [user, setUser] = useState();
  const { crowdfundContract } = useWeb3();
  const { signInAccount, signOutAccount } = useGoogleAuth();

  useEffect(() => {
    getAccount();
  }, [account, user]);

  const setChainUser = async () => {
    await crowdfundContract.methods
      .registUser(localStorage.getItem('email').substring(0, 3))
      .send({
        from: account.toString(),
      })
      .then(res => {
        console.log('CHAINUSER:', res);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const updateMetaAddr = async () => {
    try {
      let metaAddr;
      let firebaseKey;
      await FirebaseRead({
        _collection: 'users',
        _column: 'google_id',
        _value: localStorage.getItem('email'),
        _compOpt: '==',
      }).then(res => {
        console.log(res);
        firebaseKey = res.docs[0]._key.path.segments[6];
        if (res.docs[0]._document.data.value.mapValue.fields.metaAddr) {
          metaAddr = res.docs[0]._document.data.value.mapValue.fields.metaAddr;
        } else {
          metaAddr = '';
        }
      });
      if (metaAddr === account) {
        toast.info('이미 등록된 지갑 주소입니다.');
      } else {
        const docRef = doc(dbService, 'users', firebaseKey);
        const data = {
          metaAddr: account,
        };
        updateDoc(docRef, data)
          .then(docRef => {
            setChainUser();
            toast.success('연동을 완료했습니다.');
            toast.info('정보 반영을 위해 재로그인...');
            signOutAccount();
            signInAccount();
          })
          .catch(error => {
            toast.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box ml={'30px'}>
      <div>메타마스크 지갑주소 연동</div>
      <Button
        onClick={() => {
          updateMetaAddr();
        }}
      >
        지갑 연동
      </Button>
    </Box>
  );
}
