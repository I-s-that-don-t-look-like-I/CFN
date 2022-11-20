import {
  Avatar,
  Button,
  Center,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { authService } from 'src/fbase';

export default function UserProfile({ googleUser }) {
  async function signOut() {
    await authService.signOut();
  }
  return (
    <Menu>
      {/* <Text w={'80px'}>{googleUser.displayName} 님</Text> */}
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
      >
        <Avatar size={'md'} src={googleUser.photoURL} />
      </MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar size={'2xl'} src={googleUser.photoURL} />
        </Center>
        <br />
        <Center>
          <p>{googleUser.displayName} 님</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>
          <Link href="/myprofile"> My Profile</Link>
        </MenuItem>
        <MenuItem>Account Settings</MenuItem>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
