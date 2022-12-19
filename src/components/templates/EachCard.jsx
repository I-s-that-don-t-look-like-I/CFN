import React from 'react';
import { Box, Flex, Image, Link } from '@chakra-ui/react';
import { GridItem, Button, ButtonGroup } from '@chakra-ui/react';
import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';
import FundCard from 'src/components/molecules/FundCard.jsx';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';

const Neumorphism = styled.div`
  border-radius: 50px;
  background: linear-gradient(225deg, #cacaca, #f0f0f0);
  box-shadow: -20px 20px 60px #bebebe, 20px -20px 60px #ffffff;
  width: 345px;
  height: 600px;
`;

const ActorImage = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: ${colors.cardGradient}, ${props => `url(${props.imgUrl})`};
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  overflow: hidden;
  /* justify-content: center; */
`;

export default function EachCard({ imgUrl, film }) {
  const initialFocusRef = React.useRef();
  return (
    <>
      <Neumorphism>
        <GridItem h="60" w="100%" bg="papayawhip">
          <Link href="/realfund">
            <ActorImage imgUrl={imgUrl} />
          </Link>
          <Box>
            <Popover
              initialFocusRef={initialFocusRef}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button>Trigger</Button>
              </PopoverTrigger>
              <PopoverContent
                color="white"
                bg="blue.800"
                borderColor="blue.800"
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <FundCard {...film} />
                </PopoverBody>
                <PopoverFooter
                  border="0"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pb={4}
                >
                  <Box fontSize="sm">Step 2 of 4</Box>
                  <ButtonGroup size="sm">
                    <Button colorScheme="green">Setup Email</Button>
                    <Button colorScheme="blue" ref={initialFocusRef}>
                      Next
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>
        </GridItem>
      </Neumorphism>
    </>
  );
}
