import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Icon,
  IconButton,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import NFTs from 'src/routes/NFTs';

import { HamburgerIcon } from '@chakra-ui/icons';

function DrawerLeft() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton ref={btnRef} colorScheme="orange" onClick={onOpen}>
        <Icon as={HamburgerIcon} />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">CFN</DrawerHeader>

          <DrawerBody>
            <Router>
              <UnorderedList>
                <Link to="/">
                  <Button colorScheme="orange">Home </Button>
                </Link>

                <Button colorScheme="blue">My Profile</Button>

                <Link to="/NFTs">
                  <Button colorScheme="blue">NFTs</Button>
                </Link>
                <Button colorScheme="blue">Actor Profile</Button>

                <Button colorScheme="blue">Actor Recruitment</Button>

                <Button colorScheme="blue">Staff Recruitment</Button>

                <Button colorScheme="blue">Crowd Funding</Button>

                <Button colorScheme="blue">FreeBoard</Button>
              </UnorderedList>
            </Router>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerLeft;
