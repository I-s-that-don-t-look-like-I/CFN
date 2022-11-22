import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';

export default function MyProfile() {
  return (
    <Box>
      <Box>
        <Box>
          <Flex>
            <Box flexGrow={1} bgColor={'blue.300'}>
              <Flex>
                <Box bgColor={'#664F4F'} w={'380px'}>
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
                <Box bgColor={'pink.400'} flexGrow={1}>
                  <Box h={'140px'} bgColor={'teal.400'}>
                    김태리 일이삼사
                  </Box>
                  <Flex h={'900px'} bgColor={'red.300'}>
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
