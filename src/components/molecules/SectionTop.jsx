import React from 'react';
import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';

const SectionTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
const ShowAllText = styled.span`
  font-size: 14px;
  color: black;
  margin-right: 4px;
`;

export default function SectionTop({ title, showAll }) {
  return (
    <SectionTopWrapper>
      <SectionTitle>{title}</SectionTitle>
      <ShowAllText>{showAll}</ShowAllText>
    </SectionTopWrapper>
  );
}
