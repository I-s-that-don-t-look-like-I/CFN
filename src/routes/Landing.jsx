import Fonts from 'src/Fonts';
import NavBar from 'src/components/templates/landing/NavBar';
import Intro from 'src/components/templates/landing/Intro';
import CrowdFunding from 'src/components/templates/landing/Crowdfunding';
import Profile from 'src/components/templates/landing/Profile';
import Recruits from 'src/components/templates/landing/Recruits';
import Community from 'src/components/templates/landing/Community';
import Footer from 'src/components/templates/landing/Footer';
import { Button, ChakraProvider, Text } from '@chakra-ui/react';
import theme from 'src/components/templates/landing/theme';
import { useGoogleAuth } from 'src/hooks/useGoogleAuth';
import { useEffect } from 'react';

export default function Landing() {
  const { user, getAccount, signOutAccount } = useGoogleAuth();

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <NavBar />
      <Intro />
      <CrowdFunding />
      <Profile />
      <Recruits />
      <Community />
      <Footer />
    </ChakraProvider>
  );
}
