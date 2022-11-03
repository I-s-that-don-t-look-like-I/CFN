import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';
import Ether from '../atoms/Ether copy';

const CardWrapper = styled.div`
  border-radius: 16px;
  flex-shrink: 0;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  vertical-align: middle;
`;

const InfoBox = styled.div`
  width: 150px;
  height: 73px;
  padding: 16px;
  background-color: ${colors.bgSecondary};
`;

const PriceBox = styled.div`
  padding: 8px 16px 16px 16px;
  width: 150px;
  height: 50px;
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

export default function Item({ item }) {
  return (
    <CardWrapper>
      <CardImage src={item.mediaUrl}></CardImage>
      <InfoBox>
        <CollectionTitle>{item.collectionTitle}</CollectionTitle>
        <Title>{item.title}</Title>
      </InfoBox>
      <PriceBox>
        <PriceTitle>판매가</PriceTitle>
        <PriceWrapper>
          <Ether />
          <PriceText>{item.price}</PriceText>
        </PriceWrapper>
      </PriceBox>
    </CardWrapper>
  );
}
