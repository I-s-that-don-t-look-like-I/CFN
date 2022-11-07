import React from "react";
import styled from "styled-components";
import LoadingSpinner from "@components/atoms/LoadingSpinner";
import useData from "@hooks/useData";
import Collection from "@components/molecules/Collection";

const CollectionList = styled.ul`
  margin-top: 16px;
`;

const LoadingWrapper = styled.div`
  height: 1604px;
  width: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
`;

export default function Collections() {
  const { data, isLoading, isError } = useData(
    { openseaCollections: [] },
    "http://localhost:3000/api/opensea-top-collections"
  );

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
      </LoadingWrapper>
    );
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <CollectionList>
      {data.openseaCollections.map((collection, index) => (
        <Collection
          collection={collection}
          rank={index + 1}
          key={collection.id}
        />
      ))}
    </CollectionList>
  );
}
