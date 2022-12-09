import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import ProfileMaker from './ProfileMaker';

export default function CreateProfile() {
  return (
    <>
      <Text mt={'20px'} mx={'20px'} fontSize={'xl'}>
        프로필 제작
      </Text>
      <Box mx={'10px'} w={'95vw'} h={'768px'}>
        <ProfileMaker />
      </Box>
      {/* <Box m={'20px'}>
        <Input
          border={'2px'}
          borderColor={'orange.300'}
          w={300}
          placeholder="프로필 명"
        />
      </Box>
      <Flex h={'40vh'} m={'20px'} flexDirection={'column'}>
        <Input
          border={'2px'}
          borderColor={'orange.300'}
          w={300}
          placeholder="프로필 명"
        />
        <Spacer />
        <Input
          border={'2px'}
          borderColor={'orange.300'}
          w={300}
          placeholder="프로필 명"
        />
        <Spacer />
        <Input
          border={'2px'}
          borderColor={'orange.300'}
          w={300}
          placeholder="프로필 명"
        />
      </Flex> */}
    </>
  );
}
