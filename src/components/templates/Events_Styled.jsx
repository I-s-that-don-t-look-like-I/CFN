import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';

export const EventsTopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GradientSectionTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  background: #ff794d;
  background-clip: text;
  background-size: 200% auto;
  background-position: 0%;
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

export const EventCardWrapper = styled.div`
  width: 320px;
  height: 200px;
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
`;

export const UnitText = styled.div`
  font-size: 18px;
  line-height: 27px;
  align-self: flex-end;
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
`;
