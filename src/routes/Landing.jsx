import Intro from 'src/components/templates/landing/Intro';
import CrowdFunding from 'src/components/templates/landing/Crowdfunding';
import Profile from 'src/components/templates/landing/Profile';
import Recruits from 'src/components/templates/landing/Recruits';
import Community from 'src/components/templates/landing/Community';
// import Footer from 'src/components/templates/landing/Footer';

export default function Landing() {
  return (
    <>
      <Intro />
      <CrowdFunding />
      <Profile />
      <Recruits />
      <Community />
      {/* <Footer /> */}
    </>
  );
}
