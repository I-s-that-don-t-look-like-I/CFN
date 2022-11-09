import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';

const Container = styled.div`
  width: 100%;
  height: 450px;
  padding: 20px;
  margin-top: 70px;
  display: flex;
`;

const BannerWrapper = styled.div`
  width: 50%;
  height: 100%;
  background-color: #ff794d;
  position: relative;
  bottom: 1;
  left: 0;
`;
const _BannerWrapper = styled.div`
  width: 50%;
  height: 100%;
  background-color: yellow;
  position: relative;
  bottom: 1;
  right: 0;
`;

const BannerOrderBox = styled.div`
  width: 51px;
  height: 29px;
  background-color: ${colors.bgBannerButton};
  border-radius: 6px;
  position: absolute;
  left: 16px;
  bottom: 16px;
  font-size: 14px;
  color: ${colors.textSecondary};
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TopBanner2() {
  return (
    <Container>
      <BannerWrapper>
        {/* <TopLeftTriangle />
        <TopRightTriangle /> */}
        <BannerOrderBox> 1 / 2 </BannerOrderBox>
      </BannerWrapper>
      <_BannerWrapper />
    </Container>
  );
}

export default TopBanner2;
