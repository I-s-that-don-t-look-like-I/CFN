import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Header from 'src/components/templates/Header';
import styled from 'styled-components';
import LoadingSpinner from 'src/components/atoms/LoadingSpinner';
import NFT from 'src/components/molecules/NFT';
import useData from 'src/hooks/useData';
import SectionTop from 'src/components/molecules/SectionTop';

const EventCardWrapper = styled.div`
  margin-top: 59px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: yellow;
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  overflow: hidden;
`;

const LoadingWrapper = styled.div`
  height: 275px;
  width: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
`;

const NFTListWrapper = styled.div`
  margin-top: 59px;
  padding-left: 20px;
  padding-right: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 20px;
  grid-template-rows: auto;
  grid-template-areas:
    'NFT NFT NFT NFT NFT NFT NFT'
    'NFT NFT NFT NFT NFT NFT NFT'
    'NFT NFT NFT NFT NFT NFT NFT';

  @media screen and (max-width: 1024px) {
    grid-template-areas:
      'NFT NFT NFT'
      'NFT NFT NFT'
      'NFT NFT NFT'
      'NFT NFT NFT'
      'NFT NFT NFT'
      'NFT NFT NFT'
      'NFT NFT NFT'
      'NFT NFT NFT';
  }
`;

function NFTs() {
  const { data, isLoading, isError } = useData(
    { items: [] },
    'http://localhost:3000/api/items'
  );

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
      </LoadingWrapper>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <Header />
      <Grid
        templateAreas={`"sidebar main"`}
        gridTemplateColumns={'320px 1fr'}
        h="5000px"
        gap="24px"
        color="White"
        fontWeight="bold"
      >
        <GridItem
          marginTop={'40px'}
          h="{calc(100vh-64px)}"
          display={'block'}
          bg="orange"
          alignItems={'center'}
          area={'sidebar'}
        ></GridItem>
        <GridItem
          marginTop={'40px'}
          h="{calc(100vh-64px)}"
          display={'block'}
          bg="black"
          alignItems={'center'}
          area={'main'}
        >
          <EventCardWrapper></EventCardWrapper>
          <SectionTop title="지금 판매중인 아이템" showAll="낮은 가격순" />
          <NFTListWrapper>
            {data.items.map(item => (
              <NFT NFT={item} key={item.id} />
            ))}
          </NFTListWrapper>
        </GridItem>
      </Grid>
    </>
  );
}
export default NFTs;
