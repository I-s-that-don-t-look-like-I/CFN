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
      const res = await FirebaseRead({
        _collection: 'users',
        _column: 'google_id',
        _value: user.email,
        _compOpt: '==',
      });

      setMetaAddr(
        res.docChanges()[0].doc._document.data.value.mapValue.fields.metaAddr
          .stringValue
      );
    } catch (error) {
      console.error(error);
    }
  };

  return { metaAddr, getUser };
};
