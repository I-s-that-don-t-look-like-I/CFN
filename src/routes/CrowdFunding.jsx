import React from 'react';
import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
  FormLabel,
} from '@chakra-ui/react';
import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';
import actorImageOne from 'src/assets/img/movie1.jpg';
import actorImageTwo from 'src/assets/img/movie2.jpg';
import actorImageThree from 'src/assets/img/movie3.png';
import FundCard from 'src/components/molecules/FundCard.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FirebaseRead } from 'src/components/molecules/FirebaseDbManager';
import { useEffect, useState } from 'react';

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
  const [filmData, setFilmData] = useState();

  useEffect(() => {
    async function getActorsSimpleData() {
      let films = []; // films 배열 생성

      try {
        const response = await FirebaseRead({
          _collection: 'crowdfunding.film',
          _column: 'film_id',
          _compOpt: '>=',
          _value: 0,
        });
        response.docs.map(doc => {
          films.push(doc.data());
        });
        films.sort((a, b) => (a.film_id < b.film_id ? 1 : -1));
        console.log(films);
        setFilmData(films);
      } catch (error) {
        console.error(error);
      }
    }
    getActorsSimpleData();
  }, []);
  const Neumorphism = styled.div`
    background: linear-gradient(225deg, #cacaca, #f0f0f0);
    box-shadow: -20px 20px 60px #bebebe, 20px -20px 60px #ffffff;
    width: 345px;
    height: 345px;
  `;

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
      <Box h={'200vh'}>
        <Box display={'flex'} justifyContent={'center'} alignContent="center">
          <Box m={'50px'} w={'1100px'} h={'400px'}>
            <Slider {...settings}>
              {filmData.map(film => (
                <Box>
                  <Image
                    justifySelf={'center'}
                    mx={'50px'}
                    my={'50px'}
                    border={'3px solid cream'}
                    w={'1000px'}
                    h={'500px'}
                    src={film.imgUrl}
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

              <Box my={'30px'} h={'60px'} w={'full'} bgColor={'orange'}>
                <Flex justifyContent={'space-between'} direction={'row'}>
                  {/* <Box>크라우드펀딩 대기중</Box> */}

                  <Box w={'30%'} h={'60px'} bgColor={'orange'}></Box>
                </Flex>
              </Box>
            </Flex>
            <Grid h="200px" templateColumns="repeat(3, 1fr)" p={6} gap={3}>
              <GridItem h="60" w="100%" bg="papayawhip">
                {filmData.map(film => (
                  <ActorImage src={film.imgUrl} />
                ))}
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
