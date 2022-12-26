import React, { useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import FundCard from 'src/components/molecules/FundCard.jsx';
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
  const { crowdfundContract, getContracts } = useWeb3();
  const [crowdfund, setCrowdfund] = useState([]);
  const [votingCrowdfund, setVotingCrowdfund] = useState([]);

  useEffect(() => {
    getContracts();
  }, []);

  useEffect(() => {
    async function getCrowdfund(_filmName) {
      const response = await crowdfundContract.methods
        .getsCrowdfundByKeyValue(_filmName)
        .call();
      setCrowdfund(crowdfund => [...crowdfund, response]);
    }
    getCrowdfund('Mafia__JY LEE');
    getCrowdfund('Coffee Cafe__Lionel Messi');
    getCrowdfund('Dancing__Ronaldinho');
  }, [crowdfundContract]);

  useEffect(() => {
    async function getVotingCrowdfund(_filmName) {
      const response = await crowdfundContract.methods
        .getsCrowdfundByKeyValue(_filmName)
        .call();
      setVotingCrowdfund(votingCrowdfund => [...votingCrowdfund, response]);
    }
    getVotingCrowdfund('Mafia__JY LEE');
    getVotingCrowdfund('Coffee Cafe__Lionel Messi');
    getVotingCrowdfund('Dancing__Ronaldinho');
    console.log(votingCrowdfund);
  }, [crowdfundContract]);

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
          <Box m={'50px'} w={'850px'} h={'500px'}>
            <Slider {...settings}>
              {crowdfund.map(item => (
                <Box key={item.imgUrl}>
                  <Image w={'400px'} h={'600px'} mx="10px" src={item.imgUrl} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
        <Box mt={'100px'} h={'full'}>
          <Box h={'full'}>
            <Flex direction={'column'} w={'full'}>
              <Flex my={'30px'} h={'45px'} w={'full'}>
                <Box>
                  <Text ml={15} fontSize={'3xl'} alignSelf={'center'}>
                    투표 중인 크라우드 펀딩
                  </Text>
                </Box>
              </Flex>
              <Grid
                h="200px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(3, 1fr)"
                p={6}
                gap={5}
              >
                {votingCrowdfund.map(item => (
                  <GridItem h="60" w={'100%'}>
                    <VotingFundCard key={item.filmName} {...item} />
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
