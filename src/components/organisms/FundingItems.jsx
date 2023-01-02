import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import FundingItemCard from './FundingItemCard';

export default function FundingItems({ items, filmName }) {
  return (
    <Box m={'10px'}>
      <Flex gap={'15px'} alignItems={'center'} justifyContent={'center'}>
        {items.map((item, idx) => (
          <FundingItemCard
            item={item}
            index={idx}
            filmName={filmName}
            key={idx}
          />
        ))}
      </Flex>
    </Box>
  );
}
