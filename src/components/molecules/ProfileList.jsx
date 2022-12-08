import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Card, CardBody, CardFooter } from '@chakra-ui/card';
import React from 'react';
import profile_example from 'src/assets/img/profile_example.png';
import { Link } from 'react-router-dom';
// import { GrAddCircle } from 'react-icons/gr';

export default function ProfileList() {
  return (
    <Box>
      <Box w={'100vw'} h={'70vh'} mx={'30px'} py={'30px'}>
        <Box>
          <Text fontSize={'2xl'}>내 프로필 목록</Text>
        </Box>
        <Flex gap={5}>
          <Box>
            <Card maxW="lg" boxShadow="2xl" borderRadius={10}>
              <CardBody>
                <Box
                  display={'flex'}
                  flexDirection="row"
                  justifyContent={'center'}
                  alignContent={'center'}
                >
                  <Image
                    src={profile_example}
                    alt="Green double couch with wooden legs"
                    borderTopRadius={'lg'}
                    w={'md'}
                    h={'xs'}
                    // Width={'lg'}
                    // Height={'xs'}
                  />
                </Box>
                <Stack mt="6" spacing="3">
                  <Heading size="md" w={'sm'} ml={3}>
                    [대표] 프로필 1
                  </Heading>
                </Stack>
              </CardBody>
              <Divider my={3} variant={'dashed'} />
              <CardFooter>
                <ButtonGroup
                  display="flex"
                  mx={10}
                  mb={3}
                  gap={4}
                  w={'100%'}
                  justifyContent={'center'}
                >
                  <Button variant="solid" colorScheme="orange">
                    대표 프로필 설정
                  </Button>
                  <Button variant="solid" colorScheme="orange">
                    프로필 수정
                  </Button>
                  <Button variant="ghost" colorScheme="pink">
                    프로필 삭제
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Box>
          <Box>
            <Card maxW="lg" borderRadius={10} boxShadow="2xl">
              <CardBody>
                <Box
                  display={'flex'}
                  flexDirection="row"
                  justifyContent={'center'}
                  alignContent={'center'}
                  maxWidth={'md'}
                  maxHeight={'xs'}
                >
                  <Skeleton
                    w={'md'}
                    h={'xs'}
                    startColor="pink.300"
                    endColor="orange.300"
                    borderTopRadius={'lg'}
                  />
                </Box>
                <Stack mt="6" spacing="3">
                  <Heading size="md" w={'sm'} ml={3}>
                    추가 프로필 작성
                  </Heading>
                </Stack>
              </CardBody>
              <Divider my={3} variant={'dashed'} />
              <CardFooter>
                <ButtonGroup
                  display="flex"
                  mx={10}
                  mb={3}
                  w={'100%'}
                  alignContent={'center'}
                  justifyContent={'center'}
                >
                  <Button variant="solid" colorScheme="orange">
                    <Link to={'/profile/create'}>새로운 프로필 작성하기</Link>
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
