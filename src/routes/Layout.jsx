import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from 'src/components/templates/landing/NavBarOnTop';
import { useState } from 'react';
import { useEffect } from 'react';
import { authService } from 'src/fbase';

export default function Layout() {
  const [googleUser, setgoogleUser] = useState();

  useEffect(() => {
    async function onAuthStateChange() {
      await authService.onAuthStateChanged(function (user) {
        if (user) {
          setgoogleUser(authService.currentUser);
        } else {
          setgoogleUser('');
        }
      });
    }
    onAuthStateChange();
  }, [googleUser]);
  return (
    <>
      <NavBar googleUser={googleUser} />
      <Outlet context={[googleUser, setgoogleUser]} />
    </>
  );
}
