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
    getAccount();
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authService, provider)
        .then(res => {
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('displayName', res.user.displayName);
          localStorage.setItem('photoURL', res.user.photoURL);
          localStorage.setItem('uid', res.user.uid);
          setUser(res.user);
          // console.log(user);
        })
        .catch(err => {
          console.error(err);
        });
      await FirebaseGoogleLogin({
        _googleId: localStorage.getItem('email'),
        _googleName: localStorage.getItem('displayName'),
        _googleProfileUrl: localStorage.getItem('photoURL'),
        _googleUid: localStorage.getItem('uid'),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const signOutAccount = async () => {
    try {
      const response = await authService.signOut();
      localStorage.removeItem('_user');
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
