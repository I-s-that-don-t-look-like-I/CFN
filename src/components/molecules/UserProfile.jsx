import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { FirebaseRead } from 'src/components/molecules/FirebaseDbManager';
import { authService, dbService } from 'src/fbase';
import { useWallet, useWeb3 } from 'src/hooks/useMetamask';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function UserProfile({ googleUser }) {
  const { account, getAccount } = useWallet();
  const [user, setUser] = useState();
  const { crowdfundContract, ownerPayContract } = useWeb3();
  const [chainUser, setChainUser] = useState();

  useEffect(() => {
    const getChainUser = async () => {
      await crowdfundContract.methods
        .getUser(account)
        .call()
        .then(res => {
          setChainUser(res);
        });
    };

    getAccount();
    getChainUser();
  }, [account, user, chainUser]);

  const signInAccount = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(authService, provider);
      const us = response.user;
      setUser(us);
      const user = await FirebaseRead({
        _collection: 'users',
        _column: 'google_id',
        _value: us.email,
        _compOpt: '==',
      });
      let metaAddr;
      if (user) {
        metaAddr =
          user.docChanges()[0].doc._document.data.value.mapValue.fields.metaAddr
            .stringValue;
      }
      if (metaAddr === account) {
        toast.info('이미 등록된 지갑 주소입니다.');
      } else {
        const docRef = doc(
          dbService,
          'users',
          user.docs[0]._key.path.segments[6]
        );
        const data = {
          metaAddr: account,
        };
        updateDoc(docRef, data)
          .then(async docRef => {
            toast.success('연동을 완료했습니다.');
            await ownerPayContract
              .registUser(us.email.substring(0, 3))
              .call()
              .then(res => {
                console.log(res);
                toast.success('Chain User 등록 완료');
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(error => {
            toast.error(error);
          });
      }
      localStorage.setItem('_user', user);
    } catch (error) {
      console.error(error);
    }
  };

  async function signOut() {
    await authService.signOut();
  }
  return (
    <Menu>
      {/* <Text w={'80px'}>{googleUser.displayName} 님</Text> */}
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
      >
        <Avatar size={'md'} src={googleUser.photoURL} />
      </MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar size={'2xl'} src={googleUser.photoURL} />
        </Center>
        <br />
        <Center>
          <Flex
            direction={'column'}
            justifyContent="center"
            alignItems={'center'}
          >
            <Text>{googleUser.displayName} 님</Text>
            <Text color={'gray.500'}>지갑 연동{chainUser ? `[O]` : '[X]'}</Text>
          </Flex>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>
          <Link href="/myprofile">My Profile</Link>
        </MenuItem>
        <MenuItem>
          <Box
            onClick={() => {
              signInAccount();
            }}
          >
            지갑 연동
          </Box>
          {/* <Link href="/account">지갑 연동</Link> */}
        </MenuItem>
        <MenuItem onClick={signOut}>로그 아웃</MenuItem>
      </MenuList>
    </Menu>
  );
}
