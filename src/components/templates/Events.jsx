import styled, { keyframes } from 'styled-components';
import * as colors from 'src/styles/colors.js';
import HideScrollX from '../molecules/HideScrollX';
import SectionLayout from '../molecules/SectionLayout';
import EventCard from '../molecules/EventCard';
import eventImageOne from 'src/assets/img/한자와나오키.jpg';
import eventImageTwo from 'src/assets/img/천원짜리변호사.jpg';
import eventImageThree from 'src/assets/img/너의췌장을먹고싶어.jpg';
import eventImageFour from 'src/assets/img/위처.jpg';

const EventsTopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const shine = keyframes`
  form{
    background-position:0%;
  }
  to{
    background-position:200%;
  }
`;

const GradientSectionTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  background: ${colors.textGradient};
  background-clip: text;
  background-size: 200% auto;
  background-position: 0%;
  animation: ${shine} 4s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ShowAllText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: black;
`;

const eventData = [
  {
    id: 1,
    imgUrl: eventImageOne,
    title: '한자와 나오키',
    subtitle: '일본 드라마',
    targetDate: new Date(2022, 11, 30),
  },
  {
    id: 2,
    imgUrl: eventImageTwo,
    title: '천원짜리 변호사',
    subtitle: '한국 드라마',
  },
  {
    id: 3,
    imgUrl: eventImageThree,
    title: '너의 췌장을 먹고 싶어',
    subtitle: '일본 영화',
  },
  {
    id: 4,
    imgUrl: eventImageFour,
    title: '위처',
    subtitle: '미국 드라마',
  },
];

function Events() {
  return (
    <SectionLayout>
      <EventsTopWrapper>
        <GradientSectionTitle>Crowd Fundings</GradientSectionTitle>
        <ShowAllText>클라우드 펀딩전체 보기</ShowAllText>
      </EventsTopWrapper>
      <HideScrollX>
        {eventData.map(event => (
          <EventCard {...event} key={event.id} />
        ))}
      </HideScrollX>
    </SectionLayout>
  );
}

export default Events;
