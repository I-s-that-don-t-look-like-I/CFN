import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from 'src/components/templates/landing/NavBarOnTop';
import { useState } from 'react';
import { useEffect } from 'react';
import { authService } from 'src/fbase';
import { Box } from '@chakra-ui/react';
import Footer from './Footer';

export default function Layout() {
  const [googleUser, setGoogleUser] = useState();

  useEffect(() => {
    async function onAuthStateChange() {
      await authService.onAuthStateChanged(function (user) {
        if (user) {
          setGoogleUser(authService.currentUser);
        } else {
          setGoogleUser('');
        }
      });
    }
    onAuthStateChange();
  }, [googleUser]);
  return (
    <>
      <NavBar googleUser={googleUser} />
      <Box w={'100wh'} mt={'73px'} />
      <Outlet context={[googleUser, setGoogleUser]} />
      <Footer />
    </>
  );
}
