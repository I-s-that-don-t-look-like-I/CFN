import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import { FundBtn } from '../atoms/FundingBtn';
import video_example from 'src/assets/img/video_example.jpg';
import Ether from '../atoms/Ether';
import { useWallet, useWeb3 } from 'src/hooks/useMetamask';
import { useEffect } from 'react';

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

export default function FundingItemCard({ item, index, filmName, status }) {
  const { DBContract, crowdfundContract, getContracts } = useWeb3();
  const { account, getAccount } = useWallet();
  useEffect(() => {
    getAccount();
    getContracts();
  }, []);

  async function buyItem(_filmName, _index, _amount) {
    console.log(_filmName, _index, item.price * _amount);
    await crowdfundContract.methods
      .buyFundItem(_filmName, _index, _amount)
      .send({
        from: account.toString(),
        value: (item.price * _amount).toString(),
      });
  }

  return (
    <FundItemCard>
      <Box w={'300px'} h={'400px'}>
        <Angel>
          <Box>
            <Image borderRadius={'15px'} src={video_example}></Image>
            <Flex color={'gray.800'} mt={'10px'} direction="column" pl={'10px'}>
              {item ? item.content.map(str => <li key={str}>{str}</li>) : <></>}
            </Flex>
          </Box>
          <Flex
            direction={'column'}
            alignContent={'center'}
            justifyContent={'center'}
          >
            {status > 2 ? (
              <FundBtn
                onClick={() => {
                  buyItem(filmName, index, 1);
                }}
              >
                <Flex justifyContent={'center'} alignItems={'center'}>
                  <Text color={'white'} className="hover-underline-animation">
                    펀딩 금액 :{' '}
                  </Text>
                  &nbsp;
                  <Box alignSelf={'flex-start'}>
                    <Ether />
                  </Box>
                  &nbsp;
                  <Text color={'white'}> {item.price / 10 ** 18}</Text>
                </Flex>
              </FundBtn>
            ) : (
              <FundBtn
                onClick={() => {
                  buyItem(filmName, index, 1);
                }}
                disabled={true}
              >
                <Flex justifyContent={'center'} alignItems={'center'}>
                  <Text color={'white'} className="hover-underline-animation">
                    펀딩 금액 :{' '}
                  </Text>
                  &nbsp;
                  <Box alignSelf={'flex-start'}>
                    <Ether />
                  </Box>
                  &nbsp;
                  <Text color={'white'}> {item.price / 10 ** 18}</Text>
                </Flex>
              </FundBtn>
            )}
          </Flex>
        </Angel>
      </Box>
    </FundItemCard>
  );
}
