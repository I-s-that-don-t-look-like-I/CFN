import React from 'react';
import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';
import CountDown from './CountDown';

const EventCardWrapper = styled.div`
  width: 320px;
  height: 200px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: ${colors.cardGradient}, ${props => `url(${props.imgUrl})`};
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  overflow: hidden;
`;

const EventTitles = styled.div`
  margin-top: 16px;
`;

const EventSubTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: black;
`;

const EventTitle = styled.div`
  margin-top: 4px;
  font-weight: 700;
  font-size: 16px;
`;

export default function EventCard({ props }) {
  const _targetDate = new Date(props.end_date.seconds * 1000)
    .toISOString()
    .split('T')[0];

  return (
    <div>
      <EventCardWrapper imgUrl={props.imgUrl}>
        <CountDown targetDate={_targetDate} />
      </EventCardWrapper>
      <EventTitles>
        <EventSubTitle>{props.film_director}</EventSubTitle>
        <EventTitle>{props.film_name}</EventTitle>
      </EventTitles>
    </div>
  );
}
