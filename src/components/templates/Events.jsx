import styled, { keyframes } from 'styled-components';
import * as colors from 'src/styles/colors.js';
import HideScrollX from '../molecules/HideScrollX';
import SectionLayout from '../molecules/SectionLayout';
import EventCard from '../molecules/EventCard';

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
  color: ${colors.textSecondary};
`;

function Events() {
  return (
    <SectionLayout>
      <EventsTopWrapper>
        <GradientSectionTitle>Cloud Fundings</GradientSectionTitle>
        <ShowAllText>클라우드 펀딩전체 보기</ShowAllText>
      </EventsTopWrapper>
      <HideScrollX>
        {[1, 2, 3, 4].map(num => (
          <EventCard key={num} />
        ))}
      </HideScrollX>
    </SectionLayout>
  );
}

export default Events;
