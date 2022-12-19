import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import video_example from 'src/assets/img/video_example.jpg';
import styled from 'styled-components';
import { FundBtn } from '../atoms/FundingBtn';
import FundingItemCard from './FundingItemCard';

const Angel = styled.div`
  border-radius: 20px;
  background: linear-gradient(145deg, #ffb83d, #e59b33);
  box-shadow: 5px 5px 10px #d89230, -5px -5px 10px #ffc642;
  width: 300px;
  height: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function FundingItems() {
  return (
    <Box m={10}>
      <Flex gap={3} alignItems={'center'} justifyContent={'center'}>
        <FundingItemCard />
        <Box w={300} h={400}>
          <Angel>
            <Box>
              <Image borderRadius={'15px'} src={video_example}></Image>
              <Box>
                <Text>영화포스터 NFT</Text>
                <Text>엔딩 크래딧 이름 표시</Text>
                <Text>NFT영상 지급 (10초 분량 x 2)</Text>
                <Text>시사회 초청(1인)</Text>
              </Box>
            </Box>
            <Flex
              direction={'column'}
              alignContent={'center'}
              justifyContent={'center'}
            >
              <Text>(0 / 55)　　1% Ether</Text>
              <FundBtn>펀딩</FundBtn>
            </Flex>
          </Angel>
        </Box>
        <Box w={300} h={400}>
          <Angel>
            <Box>
              <Image borderRadius={'15px'} src={video_example}></Image>
              <Box>
                <Text>영화포스터 NFT</Text>
                <Text>엔딩 크래딧 이름 표시</Text>
                <Text>NFT영상 지급 (20초 분량 x 2)</Text>
                <Text>시사회 초청(1인)</Text>
              </Box>
            </Box>
            <Flex
              direction={'column'}
              alignContent={'center'}
              justifyContent={'center'}
            >
              <Text>(0 / 20)　　1.5% Ether</Text>
              <FundBtn>펀딩</FundBtn>
            </Flex>
          </Angel>
        </Box>
        <Box w={300} h={400}>
          <Angel>
            <Box>
              <Image borderRadius={'15px'} src={video_example}></Image>
              <Box>
                <Text>영화포스터 NFT</Text>
                <Text>엔딩 크래딧 이름 표시</Text>
                <Text>NFT영상 지급 (30초 분량 x 4)</Text>
                <Text>시사회 초청(2인)</Text>
                <Text>나만의 소품 출연</Text>
              </Box>
            </Box>
            <Flex
              direction={'column'}
              alignContent={'center'}
              justifyContent={'center'}
            >
              <Text>(0 / 3)　　5% Ether</Text>
              <FundBtn>펀딩</FundBtn>
            </Flex>
          </Angel>
        </Box>
      </Flex>
    </Box>
  );
}
