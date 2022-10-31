import * as NS from 'src/components/NFT_Styled.jsx';

function NFT() {
  return (
    <NS.NFTWrapper>
      <NS.ColorBox />
      <NS.DetailBox>
        <NS.TextsBox>
          <NS.BoldText>NFT</NS.BoldText>
          <p>Dog 15</p>
        </NS.TextsBox>
        <NS.TextsBox>
          <NS.BoldText>Price</NS.BoldText>
          <p>0.101 Ether</p>
        </NS.TextsBox>
      </NS.DetailBox>
    </NS.NFTWrapper>
  );
}

export default NFT;
