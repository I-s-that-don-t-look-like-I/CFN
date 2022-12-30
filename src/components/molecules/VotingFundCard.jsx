import { Box, Flex, Image, Link, Progress, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { linuxTimeToDayTime } from 'src/hooks/useTimeFunction';

export default function VotingFundCard({
  filmName,
  imgUrl,
  targetAmount,
  voteEndTime,
  pros,
  cons,
}) {
  const [_endTime, setEndTime] = useState();

  useEffect(() => {
    setEndTime(linuxTimeToDayTime(voteEndTime).HMS);
    getTime();
  }, [filmName]);

  useEffect(() => {
    getTime();
  }, [_endTime]);
  function getTime() {
    const endTime = new Date(voteEndTime * 1000);
    const currDay = new Date();

    let diff = endTime - currDay;
    const diffDays = Math.floor(
      (endTime.getTime() - currDay.getTime()) / (1000 * 60 * 60 * 24)
    );
    diff -= diffDays * (1000 * 60 * 60 * 24);
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    diff -= diffHours * (1000 * 60 * 60);
    const diffMin = Math.floor(diff / (1000 * 60));
    diff -= diffMin * (1000 * 60);
    const diffSec = Math.floor(diff / 1000);

    if (diffDays >= 1) {
      setEndTime(`${diffDays}일 남음`);
    } else {
      setEndTime(
        `${diffHours < 10 ? `0${diffHours}` : diffHours}시간 ${
          diffMin < 10 ? `0${diffMin}` : diffMin
        }분 ${diffSec < 10 ? `0${diffSec}` : diffSec}초 남음`
      );
    }
  }

  return (
    <>
      {filmName ? (
        <Box>
          <Box maxHeight={'400px'}>
            <Link href="/realfund">
              <Image maxWidth={'300px'} src={imgUrl} />
            </Link>
          </Box>
          <Box mx={3} lineHeight={8}>
            <Flex direction={'column'} justifyContent={'space-between'}>
              <Text>{`제목 : ${filmName.split('__')[0]}`}</Text>
              <Text>{`감독 : ${filmName.split('__')[1]}`}</Text>
            </Flex>
            <Flex justifyContent={'space-between'}>
              <Text>{`찬성 : ${pros}`}</Text>
              <Text>{`반대 : ${cons}`}</Text>
            </Flex>
            <Flex justifyContent={'space-between'}>
              <Text>{`목표 : ${targetAmount / 1000000000000000000} Eth`}</Text>
              <Text>{`${_endTime}`}</Text>
            </Flex>
          </Box>
        </Box>
      ) : (
        <Box>펀드 데이터를 조회해주세요</Box>
      )}
    </>
  );
}
