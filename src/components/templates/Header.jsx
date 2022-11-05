import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';
import Wallet from 'src/components/atoms/Wallet.jsx';
import { Image, HStack, Text } from '@chakra-ui/react';
import DrawerLeft from '../molecules/Drawer';
import SearchPopover from '../molecules/SearchPopover';
import { SettingsIcon } from '@chakra-ui/icons';
import kaikasImageUrl from 'src/assets/img/kaikas.png';
import { toast } from 'react-toastify';
import useKaikasAuth from 'src/hooks/useKaikasAuth';

const Container = styled.header`
  width: 100%;
  height: 64px;
  background-color: #f28585;
  position: fixed;
  top: 0px;
  left: auto;
  right: 0px;
  display: flex;
  padding: 16px 24px;
  align-items: center;
  z-index: 1100;
`;

const LogoWrapper = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

const SearchBarWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  border-left-width: 1px;
  border-color: hsla(0, 0%, 100%, 0.12);
  border-style: solid;
`;

const GrayRoundBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.bgSecondary};
`;

const WalletBox = styled(GrayRoundBox)`
  background-color: #ff794d;
  margin-right: 8px;
  cursor: pointer;
`;

const ProfileBox = styled(GrayRoundBox)`
  background-color: #ff794d;
  margin-right: 8px;
  cursor: pointer;
`;

const SearchIconWrapper = styled.div`
  margin-left: 16px;
`;

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

function Header() {
  const { user, setUser } = useKaikasAuth();

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
    <Container>
      <LogoWrapper>
        <Image
          borderRadius="full"
          boxSize="40px"
          src={require('src/assets/img/cfn_logo.png')}
        />
        <Text fontSize="20px" color="white">
          CFN
        </Text>
      </LogoWrapper>
      <SearchBarWrapper>
        <SearchIconWrapper>
          <HStack>
            <DrawerLeft />
            <SearchPopover />
          </HStack>
        </SearchIconWrapper>
      </SearchBarWrapper>
      <WalletBox onClick={user ? handleDone : handleLogin}>
        {user ? <KaikasImage src={kaikasImageUrl} /> : <Wallet />}
      </WalletBox>
      <ProfileBox>
        <SettingsIcon color="white" />
      </ProfileBox>
    </Container>
  );
}

export default Header;
