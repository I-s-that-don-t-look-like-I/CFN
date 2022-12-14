import React from 'react';
import { Box, Flex, Image, Link } from '@chakra-ui/react';
import { Grid, GridItem, Button, ButtonGroup } from '@chakra-ui/react';
import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';
import actorImageOne from 'src/assets/img/movie1.jpg';
import actorImageTwo from 'src/assets/img/movie2.jpg';
import actorImageThree from 'src/assets/img/movie3.png';
import FundCard from 'src/components/molecules/FundCard.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';

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

const ActorImage = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: ${colors.cardGradient}, ${props => `url(${props.imgUrl})`};
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  overflow: hidden;
  /* justify-content: center; */
`;

export default function CrowdFunding() {
  const movielist = [
    'https://marketplace.canva.com/EAEw1VFhVFM/1/0/1131w/canva-%EC%A3%BC%ED%99%A9%EC%83%89-%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%ED%92%8D%EA%B2%BD-%EC%98%81%ED%99%94-%EC%82%AC%EC%A7%84-%EA%B3%B5%EB%AA%A8%EC%A0%84-hsdPgdeyw3M.jpg',
    'https://marketplace.canva.com/EAE_5pNNIR0/1/0/283w/canva-%EB%B0%9D%EC%9D%80-%ED%8C%8C%EB%9E%80%EC%83%89-%EC%B4%88%EB%A1%9D%EC%83%89-%ED%98%95%EA%B4%91-%EB%85%B8%EB%9E%80%EC%83%89-%EC%82%AC%EC%A7%84-%EC%97%AC%ED%96%89-%EB%AA%A9%EC%A0%81%EC%A7%80-%EC%97%AC%ED%96%89-%ED%8F%AC%EC%8A%A4%ED%84%B0-O3VTQJjVaDI.jpg',
    'https://fishkinght.com/wp-content/uploads/2022/11/p_blackwidow_21043_v2_6d1b73b8.jpeg',
  ];
  const Neumorphism = styled.div`
    border-radius: 50px;
    background: linear-gradient(225deg, #cacaca, #f0f0f0);
    box-shadow: -20px 20px 60px #bebebe, 20px -20px 60px #ffffff;
    width: 345px;
    height: 345px;
  `;

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

  const film4 = {
    film_name: 'LoveLoveLove',
    film_target_amount: 26000,
    film_director: '260',
    fund_maker_id: '0330',
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

  const initialFocusRef = React.useRef();
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
              {/* <Box flexGrow={1} bgColor={'red.500'}> */}

              {/* </Box> */}

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
                <Neumorphism>
                  <GridItem h="60" w="100%" bg="papayawhip">
                    <Link href="/realfund">
                      <ActorImage imgUrl={actorImageOne} />
                    </Link>
                    <FundCard {...film2} />
                    <Box>
                      <Popover
                        initialFocusRef={initialFocusRef}
                        placement="bottom"
                        closeOnBlur={false}
                      >
                        <PopoverTrigger>
                          <Button>Trigger</Button>
                        </PopoverTrigger>
                        <PopoverContent
                          color="white"
                          bg="blue.800"
                          borderColor="blue.800"
                        >
                          <PopoverHeader pt={4} fontWeight="bold" border="0">
                            Manage Your Channels
                          </PopoverHeader>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore.
                          </PopoverBody>
                          <PopoverFooter
                            border="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            pb={4}
                          >
                            <Box fontSize="sm">Step 2 of 4</Box>
                            <ButtonGroup size="sm">
                              <Button colorScheme="green">Setup Email</Button>
                              <Button colorScheme="blue" ref={initialFocusRef}>
                                Next
                              </Button>
                            </ButtonGroup>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                    </Box>
                  </GridItem>
                </Neumorphism>
                <GridItem h="60" w="100%" bg="papayawhip">
                  <ActorImage imgUrl={actorImageTwo} />
                  <FundCard {...film3} />
                  <Box>
                    <Popover
                      initialFocusRef={initialFocusRef}
                      placement="bottom"
                      closeOnBlur={false}
                    >
                      <PopoverTrigger>
                        <Button>Trigger</Button>
                      </PopoverTrigger>
                      <PopoverContent
                        color="white"
                        bg="blue.800"
                        borderColor="blue.800"
                      >
                        <PopoverHeader pt={4} fontWeight="bold" border="0">
                          Manage Your Channels
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore.
                        </PopoverBody>
                        <PopoverFooter
                          border="0"
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          pb={4}
                        >
                          <Box fontSize="sm">Step 2 of 4</Box>
                          <ButtonGroup size="sm">
                            <Button colorScheme="green">Setup Email</Button>
                            <Button colorScheme="blue" ref={initialFocusRef}>
                              Next
                            </Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </GridItem>
                <GridItem h="60" w="100%" bg="papayawhip">
                  <ActorImage imgUrl={actorImageThree} />
                  <FundCard {...film4} />
                  <Box>
                    <Popover
                      initialFocusRef={initialFocusRef}
                      placement="bottom"
                      closeOnBlur={false}
                    >
                      <PopoverTrigger>
                        <Button>Trigger</Button>
                      </PopoverTrigger>
                      <PopoverContent
                        color="white"
                        bg="blue.800"
                        borderColor="blue.800"
                      >
                        <PopoverHeader pt={4} fontWeight="bold" border="0">
                          Manage Your Channels
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore.
                        </PopoverBody>
                        <PopoverFooter
                          border="0"
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          pb={4}
                        >
                          <Box fontSize="sm">Step 2 of 4</Box>
                          <ButtonGroup size="sm">
                            <Button colorScheme="green">Setup Email</Button>
                            <Button colorScheme="blue" ref={initialFocusRef}>
                              Next
                            </Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </GridItem>
              </Grid>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
}
