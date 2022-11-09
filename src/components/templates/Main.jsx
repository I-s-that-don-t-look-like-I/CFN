import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';

export default function SplitScreen() {
  return React.createElement(
    Stack,
    { maxH: '5xl', direction: { base: 'column', md: 'row' } },
    React.createElement(
      Flex,
      { p: 8, flex: 1, align: 'center', justify: 'center' },
      React.createElement(
        Stack,
        { spacing: 6, w: 'full', maxW: 'lg' },
        React.createElement(
          Heading,
          { fontSize: { base: '3xl', md: '4xl', lg: '5xl' } },
          React.createElement(
            Text,
            {
              as: 'span',
              position: 'relative',
              _after: {
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              },
            },
            'Freelance'
          ),
          React.createElement('br', null),
          ' ',
          React.createElement(
            Text,
            { color: 'blue.400', as: 'span' },
            'Design Projects'
          ),
          ' '
        ),
        React.createElement(
          Text,
          { fontSize: { base: 'md', lg: 'lg' }, color: 'gray.500' },
          "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters."
        ),
        React.createElement(
          Stack,
          { direction: { base: 'column', md: 'row' }, spacing: 4 },
          React.createElement(
            Button,
            {
              rounded: 'full',
              bg: 'blue.400',
              color: 'white',
              _hover: {
                bg: 'blue.500',
              },
            },
            'Create Project'
          ),
          React.createElement(Button, { rounded: 'full' }, 'How It Works')
        )
      )
    ),
    React.createElement(
      Flex,
      { flex: 1 },
      React.createElement(Image, {
        alt: 'Login Image',
        objectFit: 'cover',
        src: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      })
    )
  );
}
