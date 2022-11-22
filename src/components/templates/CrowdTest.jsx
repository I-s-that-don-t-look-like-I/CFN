import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { authService } from 'src/fbase';
import { FirebaseRead, FirebaseWrite } from '../molecules/FirebaseDbManager';
import FundCard from '../molecules/FundCard';
import { SocialLogin } from '../organisms/SocialLogin';

export default function CrowdTest() {
  const [userObj, setUserObj] = useOutletContext();
  const [film, setFilm] = useState();
  const [isFunding, setIsFunding] = useState(false);

  async function fundingBtnClick() {
    setIsFunding(true);
    // getAccount();
    if (userObj) {
      // console.log(userObj.uid);
      const fundingData = {
        film_id: film.film_id,
        funding_status: 'PENDING',
        payment_time: '',
        support_amount: 50000,
        support_time: Date.now(),
        supporter_id: userObj.uid,
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

  async function getFundingData(film_name) {
    // console.log(film_name);
    try {
      const filmResponse = await FirebaseRead({
        _collection: 'crowdfunding.film',
        _column: 'film_name',
        _value: film_name,
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

  async function addCrowdfundingFilm(
    _film_id,
    _film_director,
    _film_name,
    _film_target_amount,
    _fund_maker_id,
    _imgUrl,
    _isFunding,
    _max_amount,
    _min_amount,
    _start_date,
    _end_date,
    _status
  ) {
    const dataObj = {
      film_id: _film_id,
      film_director: _film_director,
      film_name: _film_name,
      film_target_amount: _film_target_amount,
      fund_maker_id: _fund_maker_id,
      imgUrl: _imgUrl,
      isFunding: _isFunding,
      max_amount: _max_amount,
      min_amount: _min_amount,
      start_date: _start_date,
      end_date: _end_date,
      status: _status,
    };
    try {
      const response = await FirebaseWrite({
        _collection: 'crowdfunding.film',
        _dataObj: dataObj,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getUserObj() {
      await setUserObj(authService.currentUser);
    }
    getUserObj();
    // console.log(userObj);
    if (film) {
      getFundingData('IDLE_STORY');
    }
  }, [userObj, isFunding]);

  const onSubmit = async event => {
    event.preventDefault();
    addCrowdfundingFilm();
  };

  return (
    <>
      <Box w={'100vw'} mt={'72px'} />
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
        {userObj ? `${userObj.displayName}님 안녕하세요` : <SocialLogin />}
        <Button onClick={() => getFundingData('IDLE_STORY')}>
          IDLE_STORY 펀딩 데이터 가져오기
        </Button>
        <Box position={'absolute'} left={300} top={300}>
          <form onSubmit={onSubmit} className="container articleEdit">
            {/* <Input
              type="text"
              placeholder="film_id"
              value=""
              required
              autoFocus
              onChange=""
              w={150}
            />
            <Input
              type="text"
              placeholder="film_director"
              value=""
              required
              autoFocus
              onChange=""
              w={150}
            />
            <Input
              type="text"
              placeholder="film_name"
              value=""
              required
              autoFocus
              onChange=""
              w={150}
            />
            <Input
              type="number"
              placeholder="film_target_amount"
              value=""
              required
              autoFocus
              onChange=""
              w={180}
            />
            <Input
              type="text"
              placeholder="fund_maker_id"
              value=""
              required
              autoFocus
              onChange=""
              w={150}
            />
            <Input
              type="text"
              placeholder="imgUrl"
              value=""
              required
              autoFocus
              onChange=""
              w={150}
            />
            <Input
              type="text"
              placeholder="isFunding"
              value=""
              required
              autoFocus
              onChange=""
              w={150}
            />
            <Input
              type="number"
              placeholder="max_amount"
              value=""
              required
              autoFocus
              // onChange=""
              w={150}
            />
            <Input
              type="number"
              placeholder="min_amount"
              value=""
              required
              autoFocus
              onChange=""
              w={150}
            />

            <Input
              w={300}
              type="submit"
              value="크라우드 펀딩 영화 추가하기"
              className="formBtn"
            /> */}
          </form>
        </Box>
      </Box>
    </>
  );
}
