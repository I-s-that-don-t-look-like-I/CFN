import { useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { authService } from 'src/fbase';
import { FirebaseGoogleLogin } from 'src/components/molecules/FirebaseDbManager';

export const useGoogleAuth = () => {
  const [user, setUser] = useState('');

  const signInAccount = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(authService, provider);
      const us = response.user;
      setUser(us);
      FirebaseGoogleLogin({
        _googleId: us.email,
        _googleName: us.displayName,
        _googleProfileUrl: us.photoURL,
        _googleUid: us.uid,
      });
      console.log(us);
      
      localStorage.setItem('_user', user);
    } catch (error) {
      console.error(error);
    }
  };

  const signOutAccount = async () => {
    try {
      const response = await authService.signOut();
      console.log(response);
      setUser('');
    } catch (error) {
      console.error(error);
    }
  };

  const getAccount = async () => {
    try {
      onAuthStateChanged(authService, user => {
        if (user) {
          setUser(user);
        } else {
          console.log('NO USER');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { user, signInAccount, signOutAccount, getAccount };
};
