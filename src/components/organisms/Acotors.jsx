import React from 'react';
import HideScrollX from '../molecules/HideScrollX';
import Actor from '../molecules/Actor';
import styled from 'styled-components';
import LoadingSpinner from '../atoms/LoadingSpinner';
import useData from 'src/hooks/useData';

const LoadingWrapper = styled.div`
  height: 275px;
  width: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
`;

export default function Actors() {
  const { data, isLoading, isError } = useData(
    { items: [] },
    'http://localhost:3000/api/items'
  );

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
      </LoadingWrapper>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <HideScrollX>
      {data.items.map(item => (
        <Actor item={item} key={item.id} />
      ))}
    </HideScrollX>
  );
}
