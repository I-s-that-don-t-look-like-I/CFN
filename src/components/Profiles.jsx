import * as PS from 'src/components/Profiles_Styled.jsx';

function Profiles() {
  return (
    <PS.Container>
      <PS.ActorTopWrapper>
        <PS.SectionTitle>Actors Porfiles</PS.SectionTitle>
        <PS.ShowAllText>배우들 전체보기</PS.ShowAllText>
      </PS.ActorTopWrapper>
      <PS.ActorsWrapper>
        <PS.ActorWrapper>
          <PS.ActorImage src="https://konkrit-prod-itemmedia-t837t51tz51i.s3.ap-northeast-2.amazonaws.com/0x1fec856e25f757fed06eb90548b0224e91095738/0x1fec856e25f757fed06eb90548b0224e91095738-6741.png"></PS.ActorImage>
          <PS.InfoBox>
            <PS.ActorName>FrankPunks</PS.ActorName>
          </PS.InfoBox>
        </PS.ActorWrapper>
      </PS.ActorsWrapper>
    </PS.Container>
  );
}

export default Profiles;
