import React from 'react';
import Events from 'src/components/templates/Events';
import Profiles from 'src/components/templates/Profiles';
import ItemsOnsale from 'src/components/templates/ItemsOnSale';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useKaikasAuth from 'src/hooks/useKaikasAuth';
import { useEffect } from 'react';
import Main from 'src/components/templates/Main.jsx';

const klaytn = window.klaytn;

function Home() {
  const { user, setUser } = useKaikasAuth();
  useEffect(() => {
    if (!klaytn) {
      // kaikas 지갑 없을시 이 effect무효
      return;
    }
    const account = localStorage.getItem('_user');
    const currentKaikasAccount = klaytn?.selectedAddress;

    if (!account || !currentKaikasAccount) {
      setUser('');
      localStorage.removeItem('_user');
      return;
    }

    if (account === currentKaikasAccount) {
      setUser(account);
      localStorage.setItem('_user', account);
    }
  }, [setUser]);

  useEffect(() => {
    if (!klaytn) {
      return;
    }

    const handleChangeAccounts = () => {
      if (!user) {
        return;
      }

      const changedAccount = klaytn?.selectedAddress;

      if (user !== changedAccount) {
        toast.success(
          `${changedAccount.slice(0, 5)}`,
          '...계정이 변경되었습니다.'
        );
        setUser(changedAccount);
        localStorage.setItem('_user', changedAccount);
      }
    };

    klaytn?.on('accountsChanged', handleChangeAccounts);
    return () => {
      klaytn.off('accountsChanged', handleChangeAccounts);
    };
  }, [user, setUser]);

  useEffect(() => {
    if (!klaytn) {
      return;
    }

    const networkObj = {
      1001: '바오밥 테스트넷',
      8217: '메인넷',
    };

    const handleNetworkChanged = () => {
      setUser('');
      localStorage.removeItem('_user');
      toast.warn(
        `네트워크가 ${
          networkObj[klaytn.networkVersion]
        }으로 바뀌었습니다. 다시 로그인 해주세요.`
      );
    };

    klaytn?.on('networkChanged', handleNetworkChanged);
    return () => {
      klaytn?.removeListener('networkChanged', handleNetworkChanged);
    };
  }, [setUser]);

  return (
    <>
      <Main />
      <Events />
      <Profiles />
      <ItemsOnsale />
    </>
  );
}

export default Home;
