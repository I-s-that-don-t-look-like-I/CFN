import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';
import Ether from '../atoms/Ether';

const CardWrapper = styled.div`
  border-radius: 16px;
  flex-shrink: 0;
  overflow: hidden;
  background-color: gray;
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  vertical-align: middle;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 60px;
  padding: 16px;
  background-color: ${colors.bgSecondary};
`;

const PriceBox = styled.div`
  padding: 8px 16px 16px 16px;
  width: 100%;
  height: 60px;
  background-color: ${colors.bgSecondary};
`;

const CollectionTitle = styled.div`
  font-size: 12px;
  color: ${colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Title = styled.div`
  font-family: MarkPro-Heavy;
  font-size: 14px;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PriceTitle = styled.div`
  font-size: 10px;
  color: ${colors.textSecondary};
  font-weight: 700;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

const PriceText = styled.div`
  font-family: MarkPro-Heavy;
  font-size: 14px;
`;

export default function NFT({ NFT }) {
  return (
    <CardWrapper>
      <CardImage src={NFT.mediaUrl}></CardImage>
      <InfoBox>
        <CollectionTitle>{NFT.collectionTitle}</CollectionTitle>
        <Title>{NFT.title}</Title>
      </InfoBox>
      <PriceBox>
        <PriceTitle>판매가</PriceTitle>
        <PriceWrapper>
          <Ether />
          <PriceText>{NFT.price}</PriceText>
        </PriceWrapper>
      </PriceBox>
    </CardWrapper>
  );
}
