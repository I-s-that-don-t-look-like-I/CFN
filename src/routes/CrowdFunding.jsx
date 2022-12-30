import React, { useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useWeb3 } from 'src/hooks/useMetamask.jsx';
import { useEffect } from 'react';
import VotingFundCard from 'src/components/molecules/VotingFundCard';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'black',
        borderRadius: '10px',
      }}
      onClick={onClick}
    />
  );
}

export default function CrowdFunding() {
  const { DBContract, crowdfundContract, getContracts } = useWeb3();
  const [fundingCrowdfund, setFundingCrowdfund] = useState([]);
  const [votingCrowdfund, setVotingCrowdfund] = useState([]);

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
        });
    }
    getFundingCrowdfund();
    async function getVotingCrowdfund() {
      DBContract.methods
        .getCrowdfundListByStatus(1)
        .call()
        .then(res => {
          setVotingCrowdfund(res);
        });
    }
    getVotingCrowdfund();
  }, [DBContract]);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '200px',
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
  };

  return (
    <>
      <Box h={'150vh'}>
        <Flex h={'45px'} w={'full'}>
          <Box>
            <Text ml={15} fontSize={'3xl'} alignSelf={'center'}>
              진행 중인 크라우드 펀딩
            </Text>
          </Box>
        </Flex>
        <Box display={'flex'} justifyContent={'center'} alignContent="center">
          <Box m={'50px'} w={'800px'} h={'400px'}>
            <Slider {...settings}>
              {fundingCrowdfund.map(item => (
                <Box key={item.imgUrl}>
                  <Image w={'350px'} h={'400px'} mx="10px" src={item.imgUrl} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
        <Box mt={'50px'} h={'full'}>
          <Box h={'full'}>
            <Flex direction={'column'} w={'full'}>
              <Flex my={'30px'} h={'45px'} w={'full'}>
                <Box>
                  <Text ml={15} fontSize={'3xl'} alignSelf={'center'}>
                    심사 중인 크라우드 펀딩
                  </Text>
                </Box>
              </Flex>
              <Grid
                h="500px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(3, 1fr)"
                p={6}
                gap={5}
              >
                {votingCrowdfund.map(item => (
                  <GridItem h="450px" w={'300px'} key={item.filmName}>
                    <VotingFundCard {...item} />
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
