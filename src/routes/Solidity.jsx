import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Progress,
  Text,
} from '@chakra-ui/react';
import { async } from '@firebase/util';
import { useState } from 'react';
import { useEffect } from 'react';
import { eStatus } from 'src/components/atoms/EnumArray';
import FundingItems from 'src/components/organisms/FundingItems';
import { useWallet, useWeb3 } from 'src/hooks/useMetamask.jsx';
import { linuxTimeToDayTime } from 'src/hooks/useTimeFunction';

export default function Solidity() {
  const { crowdfundContract } = useWeb3();
  const { account, getAccount } = useWallet();
  const [filmImg, setFilmImg] = useState();
  const [response, setResponse] = useState();
  const [fundItems, setFundItems] = useState();
  const [totalAmt, setTotalAmt] = useState(-1);

  async function getCrowdfundInfo(_filmName) {
    const res = await crowdfundContract.methods
      .getsCrowdfundByKeyValue(_filmName)
      .call();
    setResponse(res);
  }

  async function getFundingItems(_filmName) {
    const res = await crowdfundContract.methods
      .getFundingItems(_filmName)
      .call();
    setFundItems(res);
  }

  const payFund = async _filmName => {
    const response = await crowdfundContract.methods.setFund(_filmName).send({
      from: account,
      value: 100000,
    });
    console.log(response);
  };

  const sumTotalAmt = async _filmName => {
    const response = await crowdfundContract.methods
      .getTotalAmountByFilmName(_filmName)
      .call();
    console.log('totalAmt = ', response);
    setTotalAmt(response);
    console.log('sumTotalAmt = ' + totalAmt);
  };

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    if (response) {
      console.log(response);
      console.log(fundItems);
      setFilmImg(response.imgUrl);
      sumTotalAmt(response.filmName);
    }
  }, [response]);

  return (
    <Flex direction={'column'}>
      <Box>
        <Text>{account}</Text>
        <Button
          onClick={() => {
            // getCrowdfundInfo('Avatar 3__James Cameron');
            getCrowdfundInfo('Suit Man__JY LEE');
          }}
        >
          펀드 조회하기
        </Button>
        <Button
          onClick={() => {
            // getFundingItems('Avatar 3__James Cameron');
            getFundingItems('Suit Man__JY LEE');
          }}
        >
          펀드 아이템 조회하기
        </Button>
        <Button
          onClick={() => {
            // payFund('Avatar 3__James Cameron');
            payFund('Suit Man__JY LEE');
          }}
        >
          PAY
        </Button>
      </Box>
      {response ? (
        <>
          <Text>RESPONSE : {}</Text>
          <Flex
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text fontSize={'3xl'}>
              {'제목 : ' + response.filmName.split('__')[0]}
            </Text>
            <Text fontSize={'xl'}>
              {'감독 : ' + response.filmName.split('__')[1]}
            </Text>
            <Flex direction={'row'} justifyContent={'center'} gap={'100px'}>
              <Image alignSelf={'center'} w={300} h={400} src={filmImg} />
              <Grid templateColumns={'repeat(1, 1fr)'} gap={3}>
                <Flex direction={'column'}>
                  <Text alignSelf={'center'} fontSize={'xl'}>
                    펀드 시작일 :
                    {linuxTimeToDayTime(response.startTime).YYYY_MM_DD}
                  </Text>
                  <Text fontSize={'xl'} alignSelf={'flex-end'}>
                    {linuxTimeToDayTime(response.startTime).pHours +
                      '시 ' +
                      linuxTimeToDayTime(response.startTime).pMinutes +
                      '분'}
                  </Text>
                </Flex>
                <Flex direction={'column'}>
                  <Text alignSelf={'center'} fontSize={'xl'}>
                    펀드 종료일 :
                    {linuxTimeToDayTime(response.endTime).YYYY_MM_DD}
                  </Text>
                  <Text fontSize={'xl'} alignSelf={'flex-end'}>
                    {linuxTimeToDayTime(response.endTime).pHours +
                      '시 ' +
                      linuxTimeToDayTime(response.endTime).pMinutes +
                      '분'}
                  </Text>
                </Flex>
                <Text alignSelf={'center'} fontSize={'20px'}>
                  펀드 진행 상태 : {eStatus[response.status]}
                </Text>
                <Text alignSelf={'center'} fontSize={'20px'}>
                  펀드 진행 찬성 : {response.pros}
                </Text>
                <Text alignSelf={'center'} fontSize={'20px'}>
                  펀드 진행 반대 : {response.cons}
                </Text>
              </Grid>
            </Flex>
            {response.status !== '0' ? (
              <>
                <Text alignSelf={'center'} fontSize={'40px'}>
                  펀드 달성율 {totalAmt}
                </Text>
                <Progress
                  alignSelf={'center'}
                  justifySelf={'center'}
                  w={'500px'}
                  value={20}
                  size="lg"
                  colorScheme="pink"
                />
              </>
            ) : (
              <Text color={'orange.600'} fontSize={'2xl'}>
                펀딩이 심사 중입니다.
              </Text>
            )}
            <FundingItems />
          </Flex>
        </>
      ) : (
        <Text>조회먼저</Text>
      )}
    </Flex>
  );
}
