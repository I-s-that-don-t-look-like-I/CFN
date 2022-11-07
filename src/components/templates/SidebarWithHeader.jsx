import React from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

const LinkItems = [
  { name: 'Home', icon: FiHome },
  { name: 'Crowd Funding', icon: FiTrendingUp },
  { name: 'Actor Pofiles', icon: FiCompass },
  { name: 'Recruitment', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return React.createElement(
    Box,
    { minH: '100vh', bg: useColorModeValue('gray.100', 'gray.900') },
    React.createElement(SidebarContent, {
      onClose: () => onClose,
      display: { base: 'none', md: 'block' },
    }),
    React.createElement(
      Drawer,
      {
        autoFocus: false,
        isOpen: isOpen,
        placement: 'left',
        onClose: onClose,
        returnFocusOnClose: false,
        onOverlayClick: onClose,
        size: 'full',
      },
      React.createElement(
        DrawerContent,
        null,
        React.createElement(SidebarContent, { onClose: onClose })
      )
    ),
    React.createElement(MobileNav, { onOpen: onOpen }),
    React.createElement(Box, { ml: { base: 0, md: 60 }, p: '4' }, children)
  );
}

const SidebarContent = _a => {
  var { onClose } = _a,
    rest = __rest(_a, ['onClose']);
  return React.createElement(
    Box,
    Object.assign(
      {
        transition: '3s ease',
        bg: useColorModeValue('white', 'gray.900'),
        borderRight: '1px',
        borderRightColor: useColorModeValue('gray.200', 'gray.700'),
        w: { base: 'full', md: 60 },
        pos: 'fixed',
        h: 'full',
      },
      rest
    ),
    React.createElement(
      Flex,
      {
        h: '20',
        alignItems: 'center',
        mx: '8',
        justifyContent: 'space-between',
      },
      React.createElement(
        Text,
        { fontSize: '2xl', fontFamily: 'monospace', fontWeight: 'bold' },
        'Logo'
      ),
      React.createElement(CloseButton, {
        display: { base: 'flex', md: 'none' },
        onClick: onClose,
      })
    ),
    LinkItems.map(link =>
      React.createElement(
        NavItem,
        { key: link.name, icon: link.icon },
        link.name
      )
    )
  );
};
const NavItem = _a => {
  var { icon, children } = _a,
    rest = __rest(_a, ['icon', 'children']);
  return React.createElement(
    Link,
    {
      href: '#',
      style: { textDecoration: 'none' },
      _focus: { boxShadow: 'none' },
    },
    React.createElement(
      Flex,
      Object.assign(
        {
          align: 'center',
          p: '4',
          mx: '4',
          borderRadius: 'lg',
          role: 'group',
          cursor: 'pointer',
          _hover: {
            bg: 'cyan.400',
            color: 'white',
          },
        },
        rest
      ),
      icon &&
        React.createElement(Icon, {
          mr: '4',
          fontSize: '16',
          _groupHover: {
            color: 'white',
          },
          as: icon,
        }),
      children
    )
  );
};
const MobileNav = _a => {
  var { onOpen } = _a,
    rest = __rest(_a, ['onOpen']);
  return React.createElement(
    Flex,
    Object.assign(
      {
        ml: { base: 0, md: 60 },
        px: { base: 4, md: 4 },
        height: '20',
        alignItems: 'center',
        bg: useColorModeValue('white', 'gray.900'),
        borderBottomWidth: '1px',
        borderBottomColor: useColorModeValue('gray.200', 'gray.700'),
        justifyContent: { base: 'space-between', md: 'flex-end' },
      },
      rest
    ),
    React.createElement(IconButton, {
      display: { base: 'flex', md: 'none' },
      onClick: onOpen,
      variant: 'outline',
      'aria-label': 'open menu',
      icon: React.createElement(FiMenu, null),
    }),
    React.createElement(
      Text,
      {
        display: { base: 'flex', md: 'none' },
        fontSize: '2xl',
        fontFamily: 'monospace',
        fontWeight: 'bold',
      },
      'Logo'
    ),
    React.createElement(
      HStack,
      { spacing: { base: '0', md: '6' } },
      React.createElement(IconButton, {
        size: 'lg',
        variant: 'ghost',
        'aria-label': 'open menu',
        icon: React.createElement(FiBell, null),
      }),
      React.createElement(
        Flex,
        { alignItems: 'center' },
        React.createElement(
          Menu,
          null,
          React.createElement(
            MenuButton,
            { py: 2, transition: 'all 0.3s', _focus: { boxShadow: 'none' } },
            React.createElement(
              HStack,
              null,
              React.createElement(Avatar, {
                size: 'sm',
                src: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
              }),
              React.createElement(
                VStack,
                {
                  display: { base: 'none', md: 'flex' },
                  alignItems: 'flex-start',
                  spacing: '1px',
                  ml: '2',
                },
                React.createElement(Text, { fontSize: 'sm' }, 'Justina Clark'),
                React.createElement(
                  Text,
                  { fontSize: 'xs', color: 'gray.600' },
                  'Admin'
                )
              ),
              React.createElement(
                Box,
                { display: { base: 'none', md: 'flex' } },
                React.createElement(FiChevronDown, null)
              )
            )
          ),
          React.createElement(
            MenuList,
            {
              bg: useColorModeValue('white', 'gray.900'),
              borderColor: useColorModeValue('gray.200', 'gray.700'),
            },
            React.createElement(MenuItem, null, 'Profile'),
            React.createElement(MenuItem, null, 'Settings'),
            React.createElement(MenuItem, null, 'Billing'),
            React.createElement(MenuDivider, null),
            React.createElement(MenuItem, null, 'Sign out')
          )
        )
      )
    )
  );
};
