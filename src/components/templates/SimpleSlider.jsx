import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Image } from '@chakra-ui/react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <Box
      onClick={onClick}
      display={'flex'}
      position={'absolute'}
      right="-60px"
      top={'40%'}
    >
      <IoIosArrowForward size={'60px '} color="#ED8936" />
    </Box>
  );
}
function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <Box
      onClick={onClick}
      display={'flex'}
      position={'absolute'}
      left="-60px"
      top={'40%'}
    >
      <IoIosArrowBack size={'60px'} color="#ED8936" />
    </Box>
  );
}

export default class CustomArrows extends Component {
  render() {
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '0px',
      slidesToShow: 1,
      speed: 500,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      autoplay: true,
      autoplaySpeed: 1500,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 2048,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 920,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const list = [
      'https://marketplace.canva.com/EAEw1VFhVFM/1/0/1131w/canva-%EC%A3%BC%ED%99%A9%EC%83%89-%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%ED%92%8D%EA%B2%BD-%EC%98%81%ED%99%94-%EC%82%AC%EC%A7%84-%EA%B3%B5%EB%AA%A8%EC%A0%84-hsdPgdeyw3M.jpg',
      'https://marketplace.canva.com/EAE_5pNNIR0/1/0/283w/canva-%EB%B0%9D%EC%9D%80-%ED%8C%8C%EB%9E%80%EC%83%89-%EC%B4%88%EB%A1%9D%EC%83%89-%ED%98%95%EA%B4%91-%EB%85%B8%EB%9E%80%EC%83%89-%EC%82%AC%EC%A7%84-%EC%97%AC%ED%96%89-%EB%AA%A9%EC%A0%81%EC%A7%80-%EC%97%AC%ED%96%89-%ED%8F%AC%EC%8A%A4%ED%84%B0-O3VTQJjVaDI.jpg',
      'https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg',
      'https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg',
      'https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg',
      'https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract04.jpg',
    ];
    return (
      <Box display={'flex'} justifyContent={'center'} alignContent="center">
        <Box m={'50px'} w={'800px'}>
          <Slider centerMode={true} {...settings}>
            {list.map(item => (
              <Box display={'block'} opacity="initial">
                <Image mx={'25px'} w={'750px'} h={'400px'} src={item} />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    );
  }
}
