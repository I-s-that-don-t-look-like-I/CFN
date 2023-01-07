import { useState } from 'react';
import { useEffect } from 'react';
import { eStatus } from 'src/components/atoms/EnumArray';
import FundingItems from 'src/components/organisms/FundingItems';
import { useWallet, useWeb3 } from 'src/hooks/useMetamask.jsx';
import { linuxTimeToDayTime } from 'src/hooks/useTimeFunction';
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Progress,
  Text,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Ether from 'src/components/atoms/Ether';
import {
  BsQuestionCircle,
  BsHandThumbsDown,
  BsHandThumbsUp,
} from 'react-icons/bs';
import { toast } from 'react-toastify';

export default function CrowdfundDetail() {
  const { DBContract, crowdfundContract, ownerPayContract, getContracts } =
    useWeb3();
  const { account, getAccount } = useWallet();
  const [response, setResponse] = useState();
  const [fundItems, setFundItems] = useState();
  const [totalAmt, setTotalAmt] = useState(-1);
  const [filmName, setFilmName] = useState();
  const location = useLocation();
  const [user, setUser] = useState(undefined);
  const [usePoint, setUsePoint] = useState(0);

  async function setVote(side) {
    if (usePoint > 0) {
      await ownerPayContract
        .voteCrowdfund(account, filmName, side, usePoint)
        .then(res => {
          toast.success('투표가 실행됐습니다.');
          toast.info('화면 반영은 잠시 기다려주세요', {
            autoClose: 15000,
          });
        })
        .catch(err => {
          toast.error(
            err.message.split('"reason":"execution reverted: ')[1].split(`"`)[0]
          );
        });
    } else {
      toast.error('사용 포인트 값을 입력해주세요!');
    }
    setUsePoint(0);
  }

  async function getUser() {
    if (account) {
      await crowdfundContract.methods
        .getUser(account)
        .call()
        .then(res => {
          setUser(res);
        });
    }
  }

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

  const sumTotalAmt = async _filmName => {
    await crowdfundContract.methods
      .getTotalPriceByFilmName(_filmName)
      .call()
      .then(res => {
        setTotalAmt(res);
      });
  };

  useEffect(() => {
    getAccount();
    getContracts();
    getUser();
  }, [account, user]);

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
    if (response) sumTotalAmt(filmName);
  }, [sumTotalAmt, filmName]);

  // useEffect(() => {

  //   const timerId = setInterval(() => {
  //     //함수호출
  //   }, 1000);
  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, []);
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
                <Box border={'1px dotted'} borderColor={'orange.200'}></Box>
                <Box>
                  <Text alignSelf={'flex-start'} fontSize={'lg'}>
                    [ 시놉시스 ]
                  </Text>
                  <Text
                    fontSize={'md'}
                    maxW={'600px'}
                    wordBreak={'keep-all'}
                    h={'200px'}
                  >
                    {response.synopsis.split('.').map(item =>
                      item.length > 1 ? (
                        <Text key={item} mb={'15px'} fontSize="md">
                          {`${item}.`}
                        </Text>
                      ) : (
                        <></>
                      )
                    )}
                  </Text>
                  {response.status === '1' ? (
                    <>
                      <Flex
                        alignItems={'center'}
                        gap={'10px'}
                        title={
                          '찬반 투표는 가지고 있는 포인트를 사용하여 한번에 최대 99표까지 행사할 수 있습니다.'
                        }
                      >
                        <Text alignSelf={'flex-start'} fontSize={'lg'}>
                          [ 찬반 투표 ]
                        </Text>
                        <BsQuestionCircle size={'20px'} />
                        &nbsp;
                        <Text>보유 포인트 : {user ? user.points : 0}</Text>
                      </Flex>
                      <Flex
                        justifyContent={'flex-start'}
                        alignItems={'center'}
                        mt={'5px'}
                      >
                        <InputGroup w={'200px'}>
                          <InputLeftAddon
                            borderColor="orange.300"
                            borderWidth={'3px'}
                            backgroundColor={'orange.300'}
                            children="투표 수"
                          />
                          <Input
                            w={'80px'}
                            placeholder="포인트"
                            borderColor="orange.300"
                            borderWidth={'3px'}
                            maxLength={'5'}
                            minLength={'1'}
                            onChange={e => {
                              setUsePoint(e.target.value);
                            }}
                            value={usePoint}
                          />
                        </InputGroup>
                        <Flex gap={'35px'}>
                          <Button
                            borderColor="green.400"
                            borderWidth={'3px'}
                            backgroundColor={'green.400'}
                            onClick={() => {
                              setVote(true);
                            }}
                          >
                            <BsHandThumbsUp size={'20px'} />
                            &nbsp;&nbsp;찬성
                          </Button>
                          <Button
                            borderColor="red.400"
                            borderWidth={'3px'}
                            backgroundColor={'red.400'}
                            onClick={() => {
                              setVote(false);
                            }}
                          >
                            <BsHandThumbsDown size={'20px'} />
                            &nbsp;&nbsp;반대
                          </Button>
                        </Flex>
                      </Flex>
                    </>
                  ) : (
                    <></>
                  )}
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
