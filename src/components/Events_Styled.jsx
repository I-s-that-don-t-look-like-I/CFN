import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';

export const Container = styled.div`
  width: 100%;
  height: 398px;
  font-size: 32px;
  padding: 20px 16px;
  background-color: #141a1e;
`;

export const EventsTopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GradientSectionTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  background: ${colors.textGradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
export const ShowAllText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${colors.textSecondary};
`;

export const EventCardsWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 16px;

  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const EventCardWrapper = styled.div`
  height: 200px;
  width: 320px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: ${colors.cardGradient};

  flex-shrink: 0;
  overflow: hidden;
`;

export const EventTitles = styled.div`
  margin-top: 16px;
`;

export const CountDownWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

export const EachCountWrapper = styled.div`
  display: flex;
`;

export const CountText = styled.div`
  font-family: MarkPro-Heavy;
  font-size: 36px;
  line-height: 45.63px;
  align-self: flex-start;
  color: white;
`;

export const UnitText = styled.div`
  font-size: 18px;
  line-height: 27px;
  align-self: flex-end;
  color: white;
`;

export const EventSubTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${colors.textSecondary};
`;

export const EventTitle = styled.div`
  margin-top: 4px;
  font-weight: 700;
  font-size: 16px;
  color: ${colors.textSecondary};
`;
