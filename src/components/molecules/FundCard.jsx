import { Box, Image, Link, Progress, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { linuxTimeToDayTime } from 'src/hooks/useTimeFunction';

export default function FundCard({
  film_name,
  film_target_amount,
  film_director,
  fund_maker_id,
  imgUrl,
  max_amount,
  min_amount,
  start_date,
  end_date,
  targetAmtRate,
}) {
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    setStartDate(linuxTimeToDayTime(start_date).YYYY_MM_DD);
    setStartTime(linuxTimeToDayTime(start_date).HMS);
    setEndDate(linuxTimeToDayTime(end_date).YYYY_MM_DD);
    setEndTime(linuxTimeToDayTime(end_date).HMS);
  }, [film_name]);

  return (
    <>
      {film_name ? (
        <Box>
          <Box maxHeight={'500px'}>
            <Link href="/realfund">
              <Image maxWidth={'400px'} src={imgUrl} />
            </Link>
          </Box>
          <Text>{`영화제목 : ${film_name}`}</Text>
          <Text>{`영화감독 : ${film_director}`}</Text>
          <Text>{`펀드생성자 : ${fund_maker_id}`}</Text>
          <Text>{`펀드시작일 : ${startDate + ' ' + startTime}`}</Text>
          <Text>{`펀드종료일 : ${endDate + ' ' + endTime}`}</Text>
          <Text>{`펀드 최대금액 : ${max_amount}`}</Text>
          <Text>{`펀드 최소금액 : ${min_amount}`}</Text>
          <Text>{`펀드목표액 : ${film_target_amount}`}</Text>
          <Progress colorScheme="orange" size="md" value={targetAmtRate} />
        </Box>
      ) : (
        <Box>펀드 데이터를 조회해주세요</Box>
      )}
    </>
  );
}
