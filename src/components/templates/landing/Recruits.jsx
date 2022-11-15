import { Box, Heading, Text, Stack, Flex } from '@chakra-ui/react';

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Flex height={'100vh'} justify={'center'} align={'center'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            구인/구직 게시판
            <br />
            <br />
            <Text
              fontSize={'3xl'}
              alignSelf={''}
              as={'span'}
              color={'green.400'}
            >
              요즘 fancy한 영화인들은&nbsp;&nbsp;
              <Text as={'span'} fontSize={'4xl'} color={'orange.400'}>
                CFN&nbsp;
              </Text>
              으로 구인구직한다며?!
            </Text>
          </Heading>
          <Text textAlign={'left'} color={'gray.600'} fontSize={'3xl'}>
            기존의 text-only 비효율적인 구인 / 구직 No way
            <Text as={'span'} fontSize={'5xl'}>
              👋
            </Text>
            <br />
            CFN을 만나고 나의 성공시대 시작됐따~~~
            <Text as={'span'} fontSize={'5xl'}>
              🎶
            </Text>
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          ></Stack>
        </Stack>
      </Flex>
    </>
  );
}
