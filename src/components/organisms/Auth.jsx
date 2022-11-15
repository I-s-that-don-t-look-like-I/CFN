import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@chakra-ui/react';
import { useGoogleAuth } from 'src/hooks/useGoogleAuth';

export const Auth = () => {
  const { user, signInAccount, signOutAccount } = useGoogleAuth();

  return (
    <>
      <div className="googleAuthBtns">
        {user ? (
          <Button onClick={signOutAccount} m={2}>
            로그아웃
          </Button>
        ) : (
          <Button onClick={signInAccount} m={2}>
            <FcGoogle />
          </Button>
        )}
      </div>
    </>
  );
};
