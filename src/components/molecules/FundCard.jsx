import { Box, Image, Progress, Text } from '@chakra-ui/react';
import React from 'react';
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
  useEffect(() => {}, [film_target_amount]);

  return (
    <Box>
      <Image src={imgUrl} w={300} h={300} />
      <Text>{`영화제목 : ${film_name}`}</Text>
      <Text>{`영화감독 : ${film_director}`}</Text>
      <Text>{`펀드생성자 : ${fund_maker_id}`}</Text>
      <Text>{`펀드시작일 : ${start_date}`}</Text>
      <Text>{`펀드종료일 : ${end_date}`}</Text>
      <Text>{`펀드 최대금액 : ${max_amount}`}</Text>
      <Text>{`펀드 최소금액 : ${min_amount}`}</Text>
      <Text>{`펀드목표액 : ${film_target_amount}`}</Text>
      <Progress colorScheme="green" size="lg" value={targetAmtRate} />
    </Box>
  );
}
