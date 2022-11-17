import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useGoogleAuth } from 'src/hooks/useGoogleAuth';
import { FirebaseRead, FirebaseWrite } from '../molecules/FirebaseDbManager';
import FundCard from '../molecules/FundCard';
import { Auth } from '../organisms/Auth';

export default function Test() {
  const { user, getAccount } = useGoogleAuth();
  const [film, setFilm] = useState();
  const [isFunding, setIsFunding] = useState(false);

  async function fundingBtnClick() {
    setIsFunding(true);
    getAccount();
    if (user) {
      console.log(user);
      const fundingData = {
        film_id: film.film_id,
        funding_status: 'Wait',
        payment_time: '',
        support_amount: 10000,
        support_time: Date.now(),
        supporter_id: user.uid,
      };
      await FirebaseWrite({
        _collection: 'crowdfunding.funding',
        _dataObj: fundingData,
      });
      setIsFunding(false);
    } else {
      alert('로그인을 먼저 해주세요!');
    }
  }

  async function getFundingData() {
    try {
      const filmResponse = await FirebaseRead({
        _collection: 'crowdfunding.film',
        _column: 'film_name',
        _value: 'IDLE_STORY',
        _compOpt: '==',
      });

      filmResponse.forEach(async res => {
        // console.log(res.data().film_id);
        const sum = await sumFundingAmt(res.data().film_id);
        const targetAmtRate = (sum / res.data().film_target_amount) * 100;
        // console.log(sum, targetAmtRate);
        const film = { ...res.data(), targetAmtRate: targetAmtRate };
        // console.log(test);
        setFilm(film);
      });
      // console.log(film);
    } catch (error) {
      console.error(error);
    }
  }

  async function sumFundingAmt(_film_id) {
    let sum = 0;
    try {
      // console.log('Get funding data');
      const data = await FirebaseRead({
        _collection: 'crowdfunding.funding',
        _column: 'film_id',
        _value: _film_id,
        _compOpt: '==',
      });
      data.forEach(fund => {
        sum = sum + fund.data().support_amount;
      });
      return sum;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (film) {
      getFundingData();
    }
  }, [isFunding]);

  return (
    <>
      <Box display={'flex'} flexDirection={'row'}>
        <Box
          w={300}
          h={500}
          bgColor="orange.300"
          alignItems={'center'}
          flexWrap={'wrap'}
          justifyContent={'center'}
        >
          <Box m={2} w={'280px'} h={'300px'} bgColor="pink.500">
            {film ? <FundCard {...film} /> : <FundCard />}
          </Box>
          <Box>
            <Button onClick={fundingBtnClick}>Funding</Button>
          </Box>
        </Box>
        <Auth />
        <Button onClick={getFundingData}>
          IDLE_STORY 펀딩 데이터 가져오기
        </Button>
      </Box>
    </>
  );
}
