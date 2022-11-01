import * as ES from 'src/components/Events_Styled.jsx';

function Events() {
  return (
    <ES.Container>
      <ES.EventsTopWrapper>
        <ES.GradientSectionTitle>Cloud Fundings</ES.GradientSectionTitle>
        <ES.ShowAllText>이벤트 전체보기</ES.ShowAllText>
      </ES.EventsTopWrapper>
      <ES.EventCardsWrapper>
        {[1, 2, 3, 4].map(num => (
          <div>
            <ES.EventCardWrapper>
              <ES.CountDownWrapper>
                <ES.EachCountWrapper>
                  <ES.CountText>08</ES.CountText>
                  <ES.UnitText>일</ES.UnitText>
                </ES.EachCountWrapper>
                <ES.EachCountWrapper>
                  <ES.CountText>08</ES.CountText>
                  <ES.UnitText>일</ES.UnitText>
                </ES.EachCountWrapper>
                <ES.EachCountWrapper>
                  <ES.CountText>08</ES.CountText>
                  <ES.UnitText>일</ES.UnitText>
                </ES.EachCountWrapper>
                <ES.EachCountWrapper>
                  <ES.CountText>08</ES.CountText>
                  <ES.UnitText>일</ES.UnitText>
                </ES.EachCountWrapper>
              </ES.CountDownWrapper>
            </ES.EventCardWrapper>
            <ES.EventTitles>
              <ES.EventSubTitle>영화 : 귀향</ES.EventSubTitle>
              <ES.EventTitle>클라우드 펀딩 -영화-</ES.EventTitle>
            </ES.EventTitles>
          </div>
        ))}
      </ES.EventCardsWrapper>
    </ES.Container>
  );
}

export default Events;
