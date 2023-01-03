import React, { useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useWeb3 } from 'src/hooks/useMetamask.jsx';
import { useEffect } from 'react';
import VotingFundCard from 'src/components/molecules/VotingFundCard';
import { ShiningCard } from 'src/components/atoms/ShiningBorder';
import { Link } from 'react-router-dom';

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
  const [filmName, setFilmName] = useState('');

  useEffect(() => {
    getContracts();
  }, []);

  useEffect(() => {
    async function getFundingCrowdfund() {
      DBContract.methods
        .getCrowdfundListByStatus(3)
        .call()
        .then(res => {
          setFundingCrowdfund(res);
          setFilmName(res[0].filmName);
        });
    }
    async function getVotingCrowdfund() {
      DBContract.methods
        .getCrowdfundListByStatus(1)
        .call()
        .then(res => {
          setVotingCrowdfund(res);
        });
    }
    if (DBContract) {
      getFundingCrowdfund();
      getVotingCrowdfund();
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
      setFilmName(fundingCrowdfund[currentSlide].filmName);
    },
  };

  return (
    <>
      <Box h={'100%'}>
        <Flex h={'45px'} w={'full'}>
          <Box>
            <Text ml={15} fontSize={'2xl'} alignSelf={'center'}>
              펀딩 중인 프로젝트
            </Text>
          </Box>
        </Flex>
        <Box display={'flex'} justifyContent={'center'} alignContent="center">
          <Box m={'20px'} w={'1200px'} h={'400px'}>
            <Slider {...settings}>
              {fundingCrowdfund.map(item => (
                <Box key={item.imgUrl}>
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
                        <Text maxW={'800px'} m="5px" wordBreak={'keep-all'}>
                          {item.synopsis
                            .split('.')
                            .map(item =>
                              item.length > 1 ? (
                                <Text
                                  key={item}
                                  mb={'15px'}
                                  fontSize="xl"
                                >{`${item}.`}</Text>
                              ) : (
                                <></>
                              )
                            )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Link>
                </Box>
              ))}
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
                {votingCrowdfund.map(item => (
                  <GridItem w={'260px'} key={item.filmName} mb="25px">
                    <ShiningCard>
                      <Link to={`/detail?filmName=${item.filmName}`}>
                        <Flex
                          justifyContent={'center'}
                          bgColor={'orange.200'}
                          p={'8px'}
                          borderRadius={'10px'}
                          className="card"
                        >
                          <VotingFundCard {...item} />
                        </Flex>
                      </Link>
                    </ShiningCard>
                  </GridItem>
                ))}
              </Grid>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
}
