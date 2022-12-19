import React from 'react';
import { Box, Flex, Image, Link } from '@chakra-ui/react';
import { Grid, GridItem, Button, ButtonGroup } from '@chakra-ui/react';
import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';
import actorImageOne from 'src/assets/img/movie1.jpg';
import actorImageTwo from 'src/assets/img/movie2.jpg';
import actorImageThree from 'src/assets/img/movie3.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EachCard from 'src/components/templates/EachCard';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'brown' }}
      onClick={onClick}
    />
  );
}

export default function CrowdFunding() {
  const movielist = [
    'https://marketplace.canva.com/EAEw1VFhVFM/1/0/1131w/canva-%EC%A3%BC%ED%99%A9%EC%83%89-%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%ED%92%8D%EA%B2%BD-%EC%98%81%ED%99%94-%EC%82%AC%EC%A7%84-%EA%B3%B5%EB%AA%A8%EC%A0%84-hsdPgdeyw3M.jpg',
    'https://marketplace.canva.com/EAE_5pNNIR0/1/0/283w/canva-%EB%B0%9D%EC%9D%80-%ED%8C%8C%EB%9E%80%EC%83%89-%EC%B4%88%EB%A1%9D%EC%83%89-%ED%98%95%EA%B4%91-%EB%85%B8%EB%9E%80%EC%83%89-%EC%82%AC%EC%A7%84-%EC%97%AC%ED%96%89-%EB%AA%A9%EC%A0%81%EC%A7%80-%EC%97%AC%ED%96%89-%ED%8F%AC%EC%8A%A4%ED%84%B0-O3VTQJjVaDI.jpg',
    'https://fishkinght.com/wp-content/uploads/2022/11/p_blackwidow_21043_v2_6d1b73b8.jpeg',
  ];

  const film2 = {
    film_name: 'CFN',
    film_target_amount: 10000,
    film_director: 'TEST',
    fund_maker_id: '12312',
    imgUrl: '',
    max_amount: '100000',
    min_amount: '1000',
    start_date: 166040301,
    end_date: 1660403011,
    targetAmtRate: 30,
  };

  const film3 = {
    film_name: 'CHRISTMAS',
    film_target_amount: 5000,
    film_director: 'yukyeong',
    fund_maker_id: '60',
    imgUrl: '',
    max_amount: '100000',
    min_amount: '1000',
    start_date: 20221207,
    end_date: 20221231,
    targetAmtRate: 50,
  };

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
  };

  return (
    <>
      <Box my={'30px'} h={'60px'} w={'full'} bgColor={'yellow.300'}>
        <Flex justifyContent={'space-between'} direction={'row'}>
          <Box>현재 인기 있는 크라우드펀딩 모음</Box>
        </Flex>
      </Box>
      <Box h={'200vh'}>
        <Box display={'flex'} justifyContent={'center'} alignContent="center">
          <Box m={'50px'} w={'600px'} h={'400px'}>
            <Slider {...settings}>
              {movielist.map(item => (
                <Box>
                  <Image
                    justifySelf={'center'}
                    mx={'50px'}
                    my={'50px'}
                    border={'3px solid cream'}
                    w={'500px'}
                    h={'300px'}
                    src={item}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
        <Box mt={'100px'} h={'full'}>
          <Box h={'full'}>
            <Flex direction={'column'} w={'full'}>
              <Box my={'30px'} h={'60px'} w={'full'} bgColor={'yellow.300'}>
                <Flex justifyContent={'space-between'} direction={'row'}>
                  <Box>크라우드펀딩 대기중</Box>

                  <Box w={'30%'} h={'60px'} bgColor={'green'}>
                    dddd
                  </Box>
                </Flex>
              </Box>
              <Grid
                h="200px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(3, 1fr)"
                p={6}
                gap={3}
              >
                <EachCard imgUrl={actorImageOne} film={film2} />
                <EachCard props={(actorImageTwo, film3)} />
                <EachCard props={(actorImageThree, film3)} />
              </Grid>
              <Box></Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
}
