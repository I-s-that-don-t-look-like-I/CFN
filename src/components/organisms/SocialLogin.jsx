import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@chakra-ui/react';
import { useGoogleAuth } from 'src/hooks/useGoogleAuth';
import UserProfile from '../molecules/UserProfile';
import KaikasLogin from '../molecules/KaikasLogin';

export const SocialLogin = ({ googleUser }) => {
  const { user, signInAccount, signOutAccount } = useGoogleAuth();

  return (
    <>
      {googleUser ? (
        <>
          <UserProfile googleUser={googleUser} />
          <KaikasLogin />

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
          </Button>
        </>
      ) : (
        <Button onClick={signInAccount} m={2}>
          <FcGoogle />
        </Button>
      )}
    </>
  );
};
