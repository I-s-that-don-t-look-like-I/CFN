import * as TBS from 'src/components/TopBanner_Styled.jsx';

function TopBanner() {
  return (
    <TBS.Container>
      <TBS.BannerWrapper>
        <TBS.TopLeftTriangle />
        <TBS.TopRightTriangle />
        <TBS.BannerOrderBox> 1 / 2 </TBS.BannerOrderBox>
      </TBS.BannerWrapper>
    </TBS.Container>
  );
}

export default TopBanner;
