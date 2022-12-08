import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  SelectField,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from 'src/fbase';
import {
  FirebaseRead,
  FirebaseWrite,
  FirebaseReadMultiWhere,
} from '../molecules/FirebaseDbManager';
import FundCard from '../molecules/FundCard';
import SimpleSlider from '../SimpleSlider';

export default function CrowdTest() {
  const [userObj, setUserObj] = useOutletContext();
  const [film, setFilm] = useState();
  const [isFunding, setIsFunding] = useState(false);
  const [fundAmt, setFundAmt] = useState(0);

  async function fundingBtnClick(_amt) {
    _amt = parseInt(_amt);
    console.log(film.max_amount);
    // console.log(_amt, film.data.max_amount);
    if (!film) {
      toast.error('영화 데이터를 조회해주세요!');
    } else if (!userObj) {
      toast.error('로그인을 해주세요!');
    } else if (_amt > film.max_amount) {
      toast.error(
        `해당 펀드는 최대 ${film.max_amount}원 까지만 펀딩 가능합니다.`
      );
    } else if (_amt < film.min_amount) {
      toast.error(
        `해당 펀드는 최소 ${film.min_amount}원 이상 펀딩 가능합니다.`
      );
    } else {
      setIsFunding(true);
      // console.log(userObj.uid);
      const fundingData = {
        film_id: film.film_id,
        funding_status: 'PENDING',
        payment_time: '',
        support_amount: _amt,
        support_time: Date.now(),
        supporter_id: userObj.uid,
      };
      const response = await FirebaseWrite({
        _collection: 'crowdfunding.funding',
        _dataObj: fundingData,
      });
      if (response) {
        setIsFunding(false);
        toast.success('펀딩이 완료되었습니다.');
      }
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

  async function where1test() {
    try {
      const response = await FirebaseRead({
        _collection: 'crowdfunding.film',
        _column: 'isFunding',
        _compOpt: '==',
        _value: true,
      });
      console.log('================');
      response.forEach(data => {
        console.log(data.data().imgUrl);
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function where2test() {
    try {
      const response = await FirebaseReadMultiWhere({
        _collection: 'crowdfunding.funding',
        _column1: 'supporter_id',
        _compOpt1: '==',
        _value1: '2EWgMyNpYudMPw77kNy0WjnlIia2',
        _column2: 'support_amount',
        _compOtp2: '==',
        _value2: 50000,
      });
      console.log('================');
      response.forEach(dt => {
        console.log(dt.data().support_amount);
      });
    } catch (error) {
      console.error(error);
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box h={'100vh'}>
      <Button onClick={where1test}>WHERE TEST1</Button>
      <Button onClick={where2test}>WHERE TEST2</Button>
      <Flex flexDirection={'row'} m={3} gap={3}>
        <Box>
          <Button w={'300px'} onClick={() => getFundingData('IDLE_STORY')}>
            IDLE_STORY 펀딩 데이터 가져오기
          </Button>
          <Flex
            w={'300px'}
            h={'fill'}
            bgColor="orange.300"
            alignItems={'center'}
            direction={'column'}
            p={'10px'}
          >
            <Box w={'280px'} h={'fill'} bgColor="pink.300">
              {film ? <FundCard {...film} /> : <FundCard />}
            </Box>
            <Flex mt={'10px'} flexDirection={'row'} gap={'15px'}>
              <Input
                w={'130px'}
                type={'number'}
                onChange={event => {
                  setFundAmt(event.target.value);
                  console.log(fundAmt);
                }}
              />
              <Button
                onClick={() => {
                  fundingBtnClick(fundAmt);
                }}
              >
                펀딩하기
              </Button>
            </Flex>
          </Flex>
        </Box>
        <Flex direction={'column'} gap={3}>
          <Box bgColor="orange.400" p={4}>
            <form onSubmit={onSubmit} className="container articleEdit">
              <Grid
                templateRows={'repeat(6,1fr)'}
                templateColumns={'repeat(4,1fr)'}
                gap={6}
              >
                {/* <Input type="text" placeholder="film_id" required w={150} /> */}
                <Input type="text" placeholder="감독명" required w={150} />
                <Input type="text" placeholder="영화 제목" required w={150} />
                <Input type="number" placeholder="목표 금액" required w={150} />
                <Input
                  type="text"
                  placeholder="펀드 신청자 명"
                  required
                  w={150}
                />
                <Input type="text" placeholder="희망 시작일" required w={150} />
                <Input type="text" placeholder="희망 종료일" required w={150} />
                <Input
                  type="number"
                  placeholder="최대 펀딩 금액"
                  required
                  w={150}
                />
                <Input
                  type="number"
                  placeholder="최소 펀딩 금액"
                  required
                  w={150}
                />
                <GridItem rowSpan={3} colSpan={4}>
                  <Input
                    h={'100%'}
                    type="text"
                    placeholder="시놉시스"
                    required
                  />
                </GridItem>
                <Button type="submit" className="formBtn">
                  이미지 첨부
                </Button>
                <Button type="submit" className="formBtn">
                  영상 첨부
                </Button>
                <Button type="submit" className="formBtn">
                  크라우드 펀딩 신청
                </Button>
              </Grid>
            </form>
          </Box>
          <Text>2차</Text>
          <Box bgColor="orange.400" p={4}>
            <form onSubmit={onSubmit} className="container articleEdit">
              <Grid
                templateRows={'repeat(6,1fr)'}
                templateColumns={'repeat(4,1fr)'}
                gap={6}
              >
                <Select>
                  <option>IDLE_STORY (1차)</option>
                </Select>
                <Input type="number" placeholder="목표 금액" required w={150} />
                <Input type="text" placeholder="희망 시작일" required w={150} />
                <Input type="text" placeholder="희망 종료일" required w={150} />
                <Input
                  type="number"
                  placeholder="최대 펀딩 금액"
                  required
                  w={150}
                />
                <Input
                  type="number"
                  placeholder="최소 펀딩 금액"
                  required
                  w={150}
                />
                <GridItem rowSpan={2} colSpan={4}>
                  <Input
                    h={'100%'}
                    type="text"
                    placeholder="촬영 진척도 및 변경 사항"
                    required
                  />
                </GridItem>
                <GridItem rowSpan={2} colSpan={4}>
                  <Input
                    h={'100%'}
                    type="text"
                    placeholder="계약 내용 및 수익 배분"
                    required
                  />
                </GridItem>
                <Button type="submit" className="formBtn">
                  이미지 첨부
                </Button>
                <Button type="submit" className="formBtn">
                  영상 첨부
                </Button>
                <Button type="submit" className="formBtn">
                  크라우드 펀딩 신청
                </Button>
              </Grid>
            </form>
          </Box>
        </Flex>
      </Flex>
      <SimpleSlider />
    </Box>
  );
}
