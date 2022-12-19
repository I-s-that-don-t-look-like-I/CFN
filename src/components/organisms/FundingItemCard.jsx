import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import { FundBtn } from '../atoms/FundingBtn';

import video_example from 'src/assets/img/video_example.jpg';

export const FundItemCard = styled.div`
  margin-top: 5px;
  padding: 3px 3px;
  border: none;
  outline: none;
  color: #fff;
  font-family: inherit;
  font-weight: 500;
  font-size: 20px;
  position: relative;
  z-index: 0;
  border-radius: 15px;

  ::after {
    content: '';
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 10px;
  }
  /* glow */
  ::before {
    content: '';
    background: linear-gradient(
      45deg,
      #ff0000,
      #d89230,
      #ff00c8,
      #d89230,
      #ff0000,
      #d89230,
      #ff00c8,
      #d89230
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 600%;
    z-index: -1;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    filter: blur(8px);
    animation: glowing 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
    opacity: 0;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }

    50% {
      background-position: 400% 0;
    }

    100% {
      background-position: 0 0;
    }
  }

  /* hover */
  :hover::before {
    opacity: 1;
  }

  :active:after {
    background: transparent;
  }
`;

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

export default function FundingItemCard() {
  return (
    <FundItemCard>
      <Box w={300} h={400}>
        <Angel>
          <Box>
            <Image borderRadius={'15px'} src={video_example}></Image>
            <Box>
              <Text>기부</Text>
              <Text>영화포스터 NFT</Text>
              <Text>엔딩 크래딧 이름 표시</Text>
            </Box>
          </Box>
          <Flex
            direction={'column'}
            alignContent={'center'}
            justifyContent={'center'}
          >
            <Text>0.001 Ether</Text>
            <FundBtn>엔젤 펀딩</FundBtn>
          </Flex>
        </Angel>
      </Box>
    </FundItemCard>
  );
}
