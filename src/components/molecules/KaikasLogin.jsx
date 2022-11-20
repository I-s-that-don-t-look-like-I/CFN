import { IconButton } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import kaikasImageUrl from 'src/assets/img/kaikas.png';
import Wallet from 'src/components/atoms/Wallet.jsx';
import { toast } from 'react-toastify';
import useKaikasAuth from 'src/hooks/useKaikasAuth';

export default function KaikasLogin() {
  const { user, setUser } = useKaikasAuth();

  const KaikasImage = styled.img`
    width: 20px;
    height: 20px;
  `;

  const klaytn = window.klaytn;

  async function isKaikasAvailable() {
    const klaytn = window?.klaytn;
    if (!klaytn) {
      return false;
    }

    const results = await Promise.all([
      klaytn._kaikas.isApproved(),
      klaytn._kaikas.isEnabled(),
      klaytn._kaikas.isUnlocked(),
    ]);

    return results.every(res => res);
  }

  async function logInWithKaikas() {
    if (!klaytn) {
      toast.error('kaikas 설치 해주세요!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const accounts = await toast.promise(
        klaytn.enable(),
        {
          pending: 'Kaikas 지갑 연동 중',
        },
        { closeButton: true }
      );
      setUser(accounts[0]);
      localStorage.setItem('_user', accounts[0]);
      toast.success(`${accounts[0].slice(0, 13)}...님 환영합니다.`);
    } catch {
      toast.error('로그인을 실패했습니다.');
    }
  }

  function handleLogin() {
    logInWithKaikas();
  }

  async function handleDone() {
    const isAvailable = await isKaikasAvailable();
    if (isAvailable) {
      toast.success('이미 로그인이 되어있습니다.');
      return;
    }

    toast.warn('로그인을 다시 시도해주세요.');
    setUser('');
    localStorage.removeItem('_user');
  }

  return (
    <IconButton
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize={'md'}
      fontWeight={600}
      color={'white'}
      bg={'blue.400'}
      href={'#'}
      _hover={{
        bg: 'blue.300',
      }}
      icon={user ? <KaikasImage src={kaikasImageUrl} /> : <Wallet />}
      onClick={user ? handleDone : handleLogin}
    />
  );
}
