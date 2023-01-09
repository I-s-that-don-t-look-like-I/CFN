import { useEffect, useState } from 'react';
import { useGoogleAuth } from './useGoogleAuth';

const { FirebaseRead } = require('src/components/molecules/FirebaseDbManager');

export const useGoogleToWalletAddr = () => {
  const [metaAddr, setMetaAddr] = useState(false);
  const { user, getAccount } = useGoogleAuth();

  useEffect(() => {
    getUser();
  }, [user]);

  const getUser = async () => {
    getAccount();
    try {
      // console.log(user.email);
      await FirebaseRead({
        _collection: 'users',
        _column: 'google_id',
        _value: localStorage.getItem('email'),
        _compOpt: '==',
      }).then(res => {
        console.log(res);
        try {
          setMetaAddr(
            res.docChanges()[0].doc._document.data.value.mapValue.fields
              .metaAddr.stringValue
          );
        } catch (error) {
          setMetaAddr(undefined);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { metaAddr, getUser };
};
