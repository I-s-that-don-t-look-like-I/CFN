import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';

const Container = styled.div`
  width: 100%;
  height: 400px;
  padding: 20px;
`;

const BannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ff794d;
  position: relative;
  border-radius: 14px;
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

function TopBanner() {
  return (
    <Container>
      <BannerWrapper>
        {/* <TopLeftTriangle />
        <TopRightTriangle /> */}
        <BannerOrderBox> 1 / 2 </BannerOrderBox>
      </BannerWrapper>
    </Container>
  );
}

export default TopBanner;
