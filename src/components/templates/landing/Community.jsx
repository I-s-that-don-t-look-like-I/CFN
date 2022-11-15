import {
  Box,
  chakra,
  Flex,
  Link,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { TfiWrite } from 'react-icons/tfi';
import { BiCameraMovie } from 'react-icons/bi';
import { Button } from '@chakra-ui/react';
import { Route } from 'react-router-dom';
import Home from 'src/routes/Home';

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'3px solid'}
      borderColor={useColorModeValue('orange.300', 'orange.300')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-around'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontSize={'lg'} fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  return (
    <Flex
      direction={'column'}
      px={{ base: 2, sm: 12, md: 17 }}
      justify={'center'}
      align={'center'}
      h={'100vh'}
      pos={'relative'}
    >
      <chakra.h1
        textAlign={'center'}
        fontSize={'6xl'}
        py={10}
        fontWeight={'bold'}
      >
        <Text
          bgGradient={'linear(to-r, orange.300, green.400)'}
          bgClip={'text'}
          as={'span'}
        >
          Community
        </Text>
      </chakra.h1>
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'게시판'}
          stat={'의견 나눔'}
          icon={<TfiWrite size={'5em'} />}
        />
        <StatsCard
          title={'참여극장'}
          stat={'영화 토론'}
          icon={<BiCameraMovie size={'5em'} />}
        />
      </SimpleGrid>
      <Link
        fontSize={30}
        bg={'orange.300'}
        mt={100}
        _hover={{
          bg: 'orange.200',
        }}
        href="/home"
        borderRadius={10}
        py={3}
      >
        &nbsp;&nbsp;&nbsp;CFN 홈페이지&nbsp;&nbsp;&nbsp;
      </Link>
    </Flex>
  );
}
