import * as HS from 'src/components/templates/Header_Styled.jsx';
import Wallet from 'src/components/atoms/Wallet.jsx';
import { Image } from '@chakra-ui/react';
import DrawerLeft from '../molecules/Drawer';
import SearchPopover from '../molecules/SearchPopover';
import { HStack, Text } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

function Header() {
  return (
    <HS.Container>
      <HS.LogoWrapper>
        <Image
          borderRadius="full"
          boxSize="40px"
          src={require('src/assets/img/cfn_logo.png')}
        />
        <Text fontSize="20px" color="white">
          CFN
        </Text>
      </HS.LogoWrapper>
      <HS.SearchBarWrapper>
        <HS.SearchIconWrapper>
          <HStack>
            <DrawerLeft />
            <SearchPopover />
          </HStack>
        </HS.SearchIconWrapper>
      </HS.SearchBarWrapper>
      <HS.WalletBox>
        <Wallet />
      </HS.WalletBox>
      <HS.ProfileBox>
        <SettingsIcon color="white" />
      </HS.ProfileBox>
    </HS.Container>
  );
}

export default Header;
