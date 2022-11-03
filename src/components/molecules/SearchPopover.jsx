import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SearchPopover() {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <IconButton
          colorScheme="orange"
          aria-label="Search database"
          icon={<SearchIcon />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <Input placeholder="Search" />
            <IconButton aria-label="Search database" icon={<SearchIcon />} />
          </PopoverHeader>
          <PopoverCloseButton />
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default SearchPopover;
