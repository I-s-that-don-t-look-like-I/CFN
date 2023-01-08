import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Box, Button, Text } from '@chakra-ui/react';
import { useGoogleAuth } from 'src/hooks/useGoogleAuth';
import UserProfile from '../molecules/UserProfile';
import KaikasLogin from '../molecules/KaikasLogin';
import { useGoogleToWalletAddr } from 'src/hooks/useGoogleToMeta';

export const SocialLogin = ({ googleUser }) => {
  const { signInAccount } = useGoogleAuth();
  const { metaAddr } = useGoogleToWalletAddr();

  return (
    <>
      {googleUser ? (
        <>
          <Text w={'100px'}>
            {metaAddr
              ? metaAddr.substring(0, 5) +
                '...' +
                metaAddr.substring(metaAddr.length - 4, metaAddr.length)
              : '지갑 연동 ->'}
          </Text>
          <UserProfile googleUser={googleUser} />
          {/* <KaikasLogin googleUser={googleUser} />

          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'md'}
            fontWeight={600}
            color={'pink.800'}
            bg={'yellow.400'}
            size="md"
            href={'#'}
            _hover={{
              bg: 'yellow.300',
            }}
          >
            Kakao
          </Button> */}
        </>
      ) : (
        <Button onClick={signInAccount} m={2}>
          <FcGoogle />
        </Button>
      )}
    </>
  );
};
