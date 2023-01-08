import React, { useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useWeb3 } from 'src/hooks/useMetamask.jsx';
import { useEffect } from 'react';
import FundCard from 'src/components/molecules/FundCard';
import { ShiningCard } from 'src/components/atoms/ShiningBorder';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'orange',
        borderRadius: '10px',
      }}
      onClick={onClick}
    />
  );
}

export default function CrowdFunding() {
  const { DBContract, getContracts } = useWeb3();
  const [fundingCrowdfund, setFundingCrowdfund] = useState([]);
  const [votingCrowdfund, setVotingCrowdfund] = useState([]);
  const [bdCrowdfund, setBdCrowdfund] = useState([]);
  const [filmName, setFilmName] = useState('');
  useEffect(() => {
    getContracts();
  }, []);

  useEffect(() => {
    async function getFundingCrowdfund() {
      await DBContract.methods
        .getCrowdfundListByStatus(3)
        .call()
        .then(res => {
          setFundingCrowdfund(res);
          setFilmName(res[0].filmName);
        })
        .catch(err => {
          console.log(
            'FUNDINGSTATUS ',
            err.message.split('"execution reverted: ')[1].split('"')[0]
          );
        });
    }
    async function getVotingCrowdfund() {
      await DBContract.methods
        .getCrowdfundListByStatus(1)
        .call()
        .then(res => {
          setVotingCrowdfund(res);
        })
        .catch(err => {
          console.log(
            'DIPSTATUS ',
            err.message.split('"execution reverted: ')[1].split('"')[0]
          );
        });
    }

    async function getBdCrowdfund() {
      await DBContract.methods
        .getCrowdfundListByStatus(0)
        .call()
        .then(res => {
          setBdCrowdfund(res);
        })
        .catch(err => {
          console.log(
            'BDSTATUS ',
            err.message.split('"execution reverted: ')[1].split('"')[0]
          );
        });
    }
    if (DBContract) {
      getFundingCrowdfund();
      getVotingCrowdfund();
      getBdCrowdfund();
    }
  }, [DBContract]);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '10px',
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    fade: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
    afterChange: currentSlide => {
      if (fundingCrowdfund.length > 0)
        setFilmName(fundingCrowdfund[currentSlide].filmName);
    },
  };

  return (
    <>
      <Box h={'100%'}>
        <Flex h={'100%'} w={'full'} direction={'column'}>
          <Link to={'/makeCrowdfund'}>
            <Flex
              direction={'column'}
              justifyContent="center"
              alignItems={'center'}
              backgroundColor={'orange.300'}
              py={'10px'}
              gap={'10px'}
            >
              <Text fontSize={'3xl'}>독립영화 제작비용이 고민이신가요?</Text>
              <Text fontSize={'lg'}>크라우드 펀드를 신청해보세요</Text>
            </Flex>
          </Link>
          <Box>
            <Text ml={15} fontSize={'2xl'} alignSelf={'center'}>
              펀딩 중인 프로젝트
            </Text>
          </Box>
        </Flex>
        <Box display={'flex'} justifyContent={'center'} alignContent="center">
          <Box m={'20px'} w={'1200px'} h={'400px'}>
            <Slider {...settings}>
              {fundingCrowdfund ? (
                fundingCrowdfund.map((item, index) => (
                  <Box key={index}>
                    <Link to={`/detail?filmName=${filmName}`}>
                      <Flex flexDirection={'row'}>
                        <Image
                          w={'350px'}
                          h={'400px'}
                          mx="10px"
                          src={item.imgUrl}
                        />
                        <Flex direction={'column'}>
                          <Text maxW={'450px'} fontSize="3xl" m={'5px'}>
                            {`< ${item.filmName.split('__')[0]} >`}
                          </Text>
                          <Box maxW={'800px'} m="5px">
                            {item.synopsis.split('.').map((item, index) =>
                              item.length > 1 ? (
                                <Box key={index}>
                                  <Text
                                    mb={'15px'}
                                    fontSize="xl"
                                    wordBreak={'keep-all'}
                                  >{`${item}.`}</Text>
                                </Box>
                              ) : (
                                <Box key={index}></Box>
                              )
                            )}
                          </Box>
                        </Flex>
                      </Flex>
                    </Link>
                  </Box>
                ))
              ) : (
                <></>
              )}
            </Slider>
          </Box>
        </Box>
        <Box mt={'10px'} h={'full'}>
          <Box h={'full'}>
            <Flex direction={'column'} w={'full'}>
              <Flex my={'5px'} h={'30px'} w={'full'}>
                <Box>
                  <Text ml={15} fontSize={'2xl'} alignSelf={'center'}>
                    심사 중인 프로젝트
                  </Text>
                </Box>
              </Flex>
              <Grid
                templateColumns="repeat(5, 1fr)"
                p={'6px'}
                gap={'10px'}
                justifyItems="center"
              >
                {votingCrowdfund.map((item, index) => (
                  <Box key={index}>
                    <GridItem w={'260px'} mb="25px">
                      <ShiningCard>
                        <Link to={`/detail?filmName=${item.filmName}`}>
                          <Flex
                            justifyContent={'center'}
                            bgColor={'orange.200'}
                            p={'8px'}
                            borderRadius={'10px'}
                            className="card"
                          >
                            <FundCard {...item} />
                          </Flex>
                        </Link>
                      </ShiningCard>
                    </GridItem>
                  </Box>
                ))}
              </Grid>
            </Flex>
          </Box>
        </Box>
        {bdCrowdfund.length ? (
          <Box mt={'10px'} h={'full'}>
            <Box h={'full'}>
              <Flex direction={'column'} w={'full'}>
                <Flex my={'5px'} h={'30px'} w={'full'}>
                  <Box>
                    <Text ml={15} fontSize={'2xl'} alignSelf={'center'}>
                      심사 예정 프로젝트
                    </Text>
                  </Box>
                </Flex>
                <Grid
                  templateColumns="repeat(5, 1fr)"
                  p={'6px'}
                  gap={'10px'}
                  justifyItems="center"
                >
                  {bdCrowdfund.map((item, index) => (
                    <Box key={index}>
                      <GridItem w={'260px'} mb="25px">
                        <ShiningCard>
                          <Link to={`/detail?filmName=${item.filmName}`}>
                            <Flex
                              justifyContent={'center'}
                              bgColor={'orange.200'}
                              p={'8px'}
                              borderRadius={'10px'}
                              className="card"
                            >
                              <FundCard {...item} />
                            </Flex>
                          </Link>
                        </ShiningCard>
                      </GridItem>
                    </Box>
                  ))}
                </Grid>
              </Flex>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
