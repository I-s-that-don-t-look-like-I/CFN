import { Box, Image, Progress, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function FundCard({
  film_id,
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
  const [stdate, setStDate] = useState();
  const [sttime, setStTime] = useState();
  const [eddate, setEdDate] = useState();
  const [edtime, setEdTime] = useState();

  useEffect(() => {
    if (film_id) timeChange();
  }, [film_id, stdate, sttime, eddate, edtime]);

  function timeChange() {
    setStDate(new Date(start_date.seconds * 1000).toISOString().split('T')[0]);
    setStTime(
      new Date(start_date.seconds * 1000)
        .toISOString()
        .split('T')[1]
        .split('.')[0]
    );
    setEdDate(new Date(end_date.seconds * 1000).toISOString().split('T')[0]);
    setEdTime(
      new Date(end_date.seconds * 1000)
        .toISOString()
        .split('T')[1]
        .split('.')[0]
    );
  }

  return (
    <>
      {film_id ? (
        <Box>
          <Image src={imgUrl} w={'300px'} h={'300px'} />
          <Text>{`영화제목 : ${film_name}`}</Text>
          <Text>{`영화감독 : ${film_director}`}</Text>
          <Text>{`펀드생성자 : ${fund_maker_id}`}</Text>
          <Text>{`펀드시작일 : ${stdate + ' ' + sttime}`}</Text>
          <Text>{`펀드종료일 : ${eddate + ' ' + edtime}`}</Text>
          <Text>{`펀드 최대금액 : ${max_amount}`}</Text>
          <Text>{`펀드 최소금액 : ${min_amount}`}</Text>
          <Text>{`펀드목표액 : ${film_target_amount}`}</Text>
          <Progress colorScheme="green" size="lg" value={targetAmtRate} />
        </Box>
      ) : (
        <Box>펀드 데이터를 조회해주세요</Box>
      )}
    </>
  );
}
