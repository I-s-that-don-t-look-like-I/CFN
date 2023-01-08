import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useWeb3 } from 'src/hooks/useMetamask';
import { timeLeftCal } from 'src/hooks/useTimeLeft';
import Ether from '../atoms/Ether';
import { eStatus } from '../atoms/EnumArray';
import { toast } from 'react-toastify';

export default function FundCard({
  filmName,
  imgUrl,
  targetAmount,
  voteEndTime,
  voteStartTime,
  startTime,
  endTime,
  pros,
  cons,
  status,
}) {
  const [timeLeft, setTimeLeft] = useState(-1);
  const { ownerPayContract } = useWeb3();
  const [isChanged, setIsChanged] = useState(false);
  let checkTime = 0;
  switch (eStatus[status]) {
    case '심사 전':
      checkTime = voteStartTime;
      break;
    case '심사 중':
      checkTime = voteEndTime;
      break;
    case '펀드 오픈 전':
      checkTime = startTime;
      break;
    case '펀딩 중':
      checkTime = endTime;
      break;
    default:
      checkTime = -1;
      break;
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(timeLeftCal(checkTime));
      if (timeLeft === '0') {
        if (!isChanged) {
          if (ownerPayContract) {
            setIsChanged(true);
            console.log(isChanged);
            changeStatus();
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [timeLeft]);

  const changeStatus = async () => {
    console.log('changeStatus :', filmName);
    await ownerPayContract
      .setCrowdfundStatus(filmName)
      .call()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        toast.error(err);
      });
  };

  return (
    <>
      {filmName ? (
        <Box className="card" fontSize={'md'}>
          <Box maxHeight={'250px'}>
            <Image borderRadius={'10px'} maxWidth={'240px'} src={imgUrl} />
          </Box>
          <Flex direction={'column'} mx={'3px'} mt={'3px'} lineHeight={8}>
            <Flex direction={'column'} justifyContent={'space-between'}>
              <Text>{`제목 : ${filmName.split('__')[0]}`}</Text>
              <Text>{`감독 : ${filmName.split('__')[1]}`}</Text>
            </Flex>
            <Flex justifyContent={'space-between'}>
              <Flex
                direction={'row'}
                justifyContent="center"
                alignItems={'center'}
              >
                <Text>{`목표 금액 : `}</Text>
                <Ether />
                <Text>{`${targetAmount / 1000000000000000000}`}</Text>
              </Flex>
              <Text>{`${timeLeft}`}</Text>
            </Flex>
            <Flex justifyContent={'space-between'}>
              <Text>{`찬성 : ${pros}`}</Text>
              <Text>{`반대 : ${cons}`}</Text>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <Box>펀드 데이터를 조회해주세요</Box>
      )}
    </>
  );
}
