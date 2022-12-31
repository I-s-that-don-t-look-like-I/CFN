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
    centerPadding: '10px',
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    fade: true,
    autoplaySpeed: 5000,
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
          <Box m={'50px'} w={'1200px'} h={'400px'}>
            <Slider {...settings}>
              {fundingCrowdfund.map(item => (
                <Box>
                  <Flex flexDirection={'row'} key={item.imgUrl}>
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
                        {item.synopsis.split('.').map(item => (
                          <Text
                            key={item}
                            mb={'15px'}
                            fontSize="2xl"
                          >{`${item}.`}</Text>
                        ))}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
        <Box mt={'50px'} h={'full'}>
          <Box h={'full'}>
            <Flex direction={'column'} w={'full'}>
              <Flex my={'5px'} h={'45px'} w={'full'}>
                <Box>
                  <Text ml={15} fontSize={'3xl'} alignSelf={'center'}>
                    심사 중인 크라우드 펀딩
                  </Text>
                </Box>
              </Flex>
              <Grid
                h="500px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                p={6}
                gap={'3px'}
              >
                {votingCrowdfund.map(item => (
                  <GridItem h="450px" w={'330px'} key={item.filmName} mb="10px">
                    <ShiningCard>
                      <Flex
                        justifyContent={'center'}
                        bgColor={'orange.400'}
                        p={'10px'}
                        borderRadius={'10px'}
                      >
                        <VotingFundCard {...item} />
                      </Flex>
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
