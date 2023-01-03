import { useState } from 'react';
import { useEffect } from 'react';
import { eStatus } from 'src/components/atoms/EnumArray';
import FundingItems from 'src/components/organisms/FundingItems';
import { useWallet, useWeb3 } from 'src/hooks/useMetamask.jsx';
import { linuxTimeToDayTime } from 'src/hooks/useTimeFunction';
import { Box, Flex, Grid, Image, Progress, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Ether from 'src/components/atoms/Ether';

export default function CrowdfundDetail() {
  const { DBContract, crowdfundContract, getContracts } = useWeb3();
  const { account, getAccount } = useWallet();
  const [response, setResponse] = useState();
  const [fundItems, setFundItems] = useState();
  const [totalAmt, setTotalAmt] = useState(-1);
  const [filmName, setFilmName] = useState();
  const location = useLocation();

  async function getCrowdfundInfo(_filmName) {
    const res = await DBContract.methods
      .getCrowdfundByFilmName(_filmName)
      .call();
    setResponse(res);
  }

  async function getFundingItems(_filmName) {
    const res = await DBContract.methods.getFundingItemList(_filmName).call();
    setFundItems(res);
  }

  useEffect(() => {
    getAccount();
    getContracts();
  }, []);

  useEffect(() => {
    async function load() {
      const film = await new URLSearchParams(location.search).get('filmName');
      await setFilmName(film);
      if (filmName) {
        getCrowdfundInfo(filmName);
        getFundingItems(filmName);
      }
    }
    load();
  }, [DBContract]);
  useEffect(() => {
    const sumTotalAmt = async _filmName => {
      if (crowdfundContract) {
        await crowdfundContract.methods
          .getTotalPriceByFilmName(_filmName)
          .call()
          .then(res => {
            setTotalAmt(res);
          });
      }
    };

    const id = setInterval(sumTotalAmt(filmName), 1000);
    return () => clearInterval(id);
    // sumTotalAmt(filmName);
  }, [crowdfundContract.methods, filmName]);

  return (
    <>
      {response ? (
        <Flex
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={'20px'}
        >
          <Flex direction={'row'} justifyContent={'center'} gap={'30px'}>
            <Image
              alignSelf={'center'}
              w={'300px'}
              h={'400px'}
              src={response.imgUrl}
            />
            <Flex direction={'column'} gap="20px">
              <Flex direction={'row'}>
                <Text fontSize={'3xl'}>
                  {'< ' + response.filmName.split('__')[0] + ` >`}
                </Text>
                <Text fontSize={'lg'} mt={'14px'}>
                  &nbsp;&nbsp;&nbsp;
                  {response.filmName.split('__')[1] + ' 감독'}
                </Text>
              </Flex>
              <Flex direction={'row'} gap={'40px'}>
                <Box>
                  <Grid templateColumns={'repeat(1, 1fr)'} gap={'1px'}>
                    <Flex direction={'column'} gap={'25px'}>
                      <Box>
                        <Text fontSize={'lg'}>[ 펀딩 시작 ]</Text>
                        <Text fontSize={'md'}>
                          {linuxTimeToDayTime(response.startTime).YYYY_MM_DD}
                          &nbsp;
                          {linuxTimeToDayTime(response.startTime).pHours +
                            '시 ' +
                            linuxTimeToDayTime(response.startTime).pMinutes +
                            '분'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize={'lg'}>[ 펀드 종료 ]</Text>
                        <Text fontSize={'md'}>
                          {linuxTimeToDayTime(response.endTime).YYYY_MM_DD}
                          &nbsp;
                          {linuxTimeToDayTime(response.endTime).pHours +
                            '시 ' +
                            linuxTimeToDayTime(response.endTime).pMinutes +
                            '분'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize={'lg'}>[ 펀드 진행 단계 ]</Text>
                        <Text fontSize={'md'}>{eStatus[response.status]}</Text>
                      </Box>
                      <Box>
                        <Text fontSize={'lg'}>[ 펀딩 찬 / 반 투표 ]</Text>
                        <Text fontSize={'md'}>찬성 : {response.pros}</Text>
                        <Text fontSize={'md'}>반대 : {response.cons}</Text>
                      </Box>
                    </Flex>
                  </Grid>
                </Box>
                <Box>
                  <Text alignSelf={'flex-start'} fontSize={'lg'}>
                    [ 시놉시스 ]
                  </Text>
                  <Text fontSize={'md'} maxW={'600px'} wordBreak={'keep-all'}>
                    {response.synopsis
                      .split('.')
                      .map(item =>
                        item.length > 1 ? (
                          <Text
                            key={item}
                            mb={'15px'}
                            fontSize="md"
                          >{`${item}.`}</Text>
                        ) : (
                          <></>
                        )
                      )}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <Box>
            {response.status > '1' ? (
              <Box my={'10px'}>
                <Text fontSize={'lg'}>펀드 달성율</Text>
                <Progress
                  mt={'10px'}
                  alignSelf={'center'}
                  justifySelf={'center'}
                  w={'500px'}
                  value={`${
                    Math.round((totalAmt / response.targetAmount) * 10000) / 100
                  }`}
                  size="lg"
                  colorScheme="orange"
                />
                <Flex>
                  <Text mt={'10px'} alignSelf={'center'} fontSize={'lg'}>
                    {Math.round((totalAmt / response.targetAmount) * 10000) /
                      100}{' '}
                    %
                  </Text>
                  <Flex ml={'15px'} alignItems="center">
                    <Ether />
                    <Text ml={'5px'} fontSize={'md'} alignSelf="flex-end">
                      {totalAmt / 10 ** 18}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            ) : (
              <Text color={'red.600'} fontSize={'lg'}>
                "심사 중" 단계에서는 상품 구매가 불가합니다.
              </Text>
            )}
          </Box>
          {fundItems ? (
            <FundingItems
              items={fundItems}
              filmName={filmName}
              status={response.status}
            />
          ) : (
            <>펀딩 가능한 아이템이 없습니다.</>
          )}
        </Flex>
      ) : (
        <Text>조회 중 입니다</Text>
      )}
    </>
  );
}
