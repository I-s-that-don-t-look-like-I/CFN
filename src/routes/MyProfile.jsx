import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import Header from 'src/components/templates/Header';

export default function MyProfile() {
  return (
    <Box h={'100vh'}>
      <Box pt={'72px'} h={'full'}>
        <Box h={'full'}>
          <Flex h={'full'}>
            {/* <Box w={'250px'} h={'full'} bgColor={'#FBAB3B'}>
              SIDE AREA
            </Box> */}
            <Box flexGrow={1} bgColor={'blue.300'}>
              <Flex h={'full'}>
                <Box bgColor={'#664F4F'} h={'full'} w={'380px'}>
                  <Box
                    display="flex"
                    w={'380px'}
                    h={'500px'}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      w={'360px'}
                      h={'480px'}
                      src="https://i.seadn.io/gae/MuHVZb-NQuX39QcEMXbpSkzeH7FLJ8GLtlPOppCCuYFcH7tGSwBAkQfaletOYT_TJP9zvi8GNUrv90RVF5oq8NvsTpHYAr6tCaddlzk?auto=format&w=1000"
                    ></Image>
                  </Box>
                  <Box
                    w={'380px'}
                    h={'496px'}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      src="https://i.seadn.io/gae/K6GVpuEJR4O0nGOPI5G7TEcqgcjyrOvREmyOq8W4cWvcfP-Sh9S5I8BQ1P1Ta74XontMyxgvrPRhSwBn0cKLXQ-c7aYPvnjYWfAHWA?auto=format&w=1000"
                      w={'360px'}
                      h={'360px'}
                    ></Image>
                  </Box>
                </Box>
                <Box bgColor={'pink.400'} h={'100vh'} flexGrow={1}>
                  <Box h={'140px'} bgColor={'teal.400'}>
                    김태리 일이삼사
                  </Box>
                  <Flex h={'full'} bgColor={'red.300'}>
                    <Box w={'360px'} bgColor={'orange.300'}>
                      필모그래피
                    </Box>
                    <Box bgColor={'blue.600'} flexGrow={1}>
                      그래프랑 NFT
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
