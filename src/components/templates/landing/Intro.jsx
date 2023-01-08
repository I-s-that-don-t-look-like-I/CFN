import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Box,
  keyframes,
} from '@chakra-ui/react';
import Orange from 'src/components/atoms/Orange';

const rolling = keyframes`
    0% {
      transform: rotate(0deg);
      margin-left: 200px;
    }
    20% {
      transform: rotate(-260deg);
    }
    40% {
      transform: rotate(-530deg);
      margin-left: 0;
    }
    60% {
      transform: rotate(-645deg);
      margin-left: -40px;
    }
    80%{
      transform: rotate(-635deg);
      margin-left: -40px;
      color: black;
    }
    100% {
      transform: rotate(-630deg);
      margin-left: -30px;
      color: #ED8936;
    }
`;

const spinAnimation = `${rolling} 1 3s linear forwards`;

export default function CallToActionWithIllustration() {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 15 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          lineHeight={'110%'}
        >
          <Text as={'span'} color={'pink.400'}>
            영화
          </Text>
          와&nbsp;
          <Text as={'span'} color={'green.400'}>
            프로필&nbsp;
          </Text>
          제작은&nbsp;
          <br />
          <Text as={'span'} color={'orange.400'}>
            CFN
          </Text>
          과 가보자고~🤸
        </Heading>

        <Stack spacing={6} direction={'row'}></Stack>
        <Flex w={'full'} align={'center'} justify={'center'} pos={'relative'}>
          <Orange />
          <rolling>
            <Text
              fontSize={120}
              animation={spinAnimation}
              position={'absolute'}
            >
              CFN
            </Text>
          </rolling>
          <Box
            mt={130}
            w={500}
            h={380}
            bgGradient="linear(to-r, #FBAB7E, #F7CE68)"
            rounded={'full'}
            pos={'absolute'}
            zIndex={-3}
            filter={'blur(20px)'}
          ></Box>
        </Flex>
      </Stack>
    </Container>
  );
}
