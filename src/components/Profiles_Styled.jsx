import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';

export const Container = styled.div`
  width: 100%;
  height: 394px;
  padding: 20px 16px;
  background-color: #141a1e;
`;

export const ActorTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.textSecondary};
`;

export const ShowAllText = styled.span`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin-right: 4px;
`;

export const ActorsWrapper = styled.div`
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

export const ActorWrapper = styled.div`
  border-radius: 16px;
  flex-shrink: 0;
  overflow: hidden;
`;

export const ActorImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  display: block;
`;

export const InfoBox = styled.div`
  width: 200px;
  height: 53px;
  padding: 16px;
  background-color: ${colors.bgSecondary};
  align-items: center;
  justify-content: center;
`;

export const ActorName = styled.div`
  font-size: 12px;
  color: ${colors.textSecondary};
`;
