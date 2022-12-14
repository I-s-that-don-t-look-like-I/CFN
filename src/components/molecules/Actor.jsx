import React from 'react';
import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';

const ActorsWrapper = styled.div`
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

const ActorWrapper = styled.div`
  border-radius: 16px;
  flex-shrink: 0;
  overflow: hidden;
`;

const ActorImage = styled.div`
  width: 240px;
  height: 240px;
  object-fit: contain;
  display: block;
  background: ${colors.cardGradient}, ${props => `url(${props.imgUrl})`};
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  overflow: hidden;
`;

const InfoBox = styled.div`
  width: 240px;
  height: 73px;
  padding: 12px;
  background-color: ${colors.bgSecondary};
  align-items: center;
  justify-content: center;
`;

const ActorName = styled.div`
  font-size: 21px;
  color: ${colors.textSecondary};
  align-items: center;
  justify-content: center;
  display: flex;
`;
const ActorBirth = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
  justify-content: center;
  display: flex;
`;

export default function Actor({ props }) {
  const birth = new Date(props.birth.seconds * 1000)
    .toISOString()
    .split('T')[0];
  return (
    <>
      <ActorsWrapper>
        <ActorWrapper>
          <ActorImage imgUrl={props.imgUrl} />
          <InfoBox>
            <ActorName>{props.actor_name}</ActorName>
            <ActorBirth>{birth}</ActorBirth>
          </InfoBox>
        </ActorWrapper>
      </ActorsWrapper>
    </>
  );
}
