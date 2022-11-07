import React from 'react';
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
          <DrawerHeader>CFN</DrawerHeader>

          <DrawerBody>
            <UnorderedList>
              <ListItem>
                <Button colorScheme="blue">Home</Button>
              </ListItem>
              <ListItem>
                <Button colorScheme="blue">My Profile</Button>
              </ListItem>
              <ListItem>
                <Button colorScheme="blue">NFTs</Button>
              </ListItem>
              <ListItem>
                <Button colorScheme="blue">Actor Profile</Button>
              </ListItem>
              <ListItem>
                <Button colorScheme="blue">Actor Recruitment</Button>
              </ListItem>
              <ListItem>
                <Button colorScheme="blue">Staff Recruitment</Button>
              </ListItem>
              <ListItem>
                <Button colorScheme="blue">Crowd Funding</Button>
              </ListItem>
              <ListItem>
                <Button colorScheme="blue">FreeBoard</Button>
              </ListItem>
            </UnorderedList>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerLeft;
