import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Image,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { toast } from 'react-toastify';
import kaikasImageUrl from 'src/assets/img/kaikas.png';
import useKaikasAuth from 'src/hooks/useKaikasAuth';
import styled from 'styled-components';
import { Auth } from 'src/components/organisms/Auth';
import Wallet from 'src/components/atoms/Wallet.jsx';
import CFNLogo from 'src/assets/img/CFN.png';

const KaikasImage = styled.img`
  width: 20px;
  height: 20px;
`;

const klaytn = window.klaytn;

async function isKaikasAvailable() {
  const klaytn = window?.klaytn;
  if (!klaytn) {
    return false;
  }

  const results = await Promise.all([
    klaytn._kaikas.isApproved(),
    klaytn._kaikas.isEnabled(),
    klaytn._kaikas.isUnlocked(),
  ]);

  return results.every(res => res);
}
export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { user, setUser } = useKaikasAuth();

  async function logInWithKaikas() {
    if (!klaytn) {
      toast.error('kaikas 설치 해주세요!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const accounts = await toast.promise(
        klaytn.enable(),
        {
          pending: 'Kaikas 지갑 연동 중',
        },
        { closeButton: true }
      );
      setUser(accounts[0]);
      localStorage.setItem('_user', accounts[0]);
      toast.success(`${accounts[0].slice(0, 13)}...님 환영합니다.`);
    } catch {
      toast.error('로그인을 실패했습니다.');
    }
  }

  function handleLogin() {
    logInWithKaikas();
  }

  async function handleDone() {
    const isAvailable = await isKaikasAvailable();
    if (isAvailable) {
      toast.success('이미 로그인이 되어있습니다.');
      return;
    }

    toast.warn('로그인을 다시 시도해주세요.');
    setUser('');
    localStorage.removeItem('_user');
  }

  return (
    <Box pos={'fixed'} top={0} width={'100%'} zIndex={999}>
      <Flex
        bg={'rgba(255, 255, 255, 0.6)'}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        backdropFilter={'saturate(50%) blur(7px)'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Image boxSize={'32px'} src={CFNLogo} />

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          alignItems={'center'}
          direction={'row'}
          spacing={2}
        >
          <IconButton
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'md'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            href={'#'}
            _hover={{
              bg: 'blue.300',
            }}
            icon={user ? <KaikasImage src={kaikasImageUrl} /> : <Wallet />}
            onClick={user ? handleDone : handleLogin}
          />
          <Text>(</Text>
          <Auth />
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'pink.800'}
            bg={'yellow.400'}
            size="xs"
            href={'#'}
            _hover={{
              bg: 'yellow.300',
            }}
          >
            Kakao
          </Button>
          <Text>)</Text>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar
                size={'sm'}
                src={'https://avatars.dicebear.com/api/male/username.svg'}
              />
            </MenuButton>
            <MenuList alignItems={'center'}>
              <br />
              <Center>
                <Avatar
                  size={'2xl'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </Center>
              <br />
              <Center>
                <p>Username</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Your Servers</MenuItem>
              <MenuItem>Account Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('orange.500', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack pt={'2px'} direction={'row'} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'md'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                  bg: 'pink.50',
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'orange.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text
            transition={'all 0.3s ease'}
            fontSize={'sm'}
            _groupHover={{ color: 'orange.700' }}
          >
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'orange.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'CrowdFunding',
    href: '/crowdfunding',
  },
  {
    label: 'Profiles',
    href: '/myprofile',
  },
  {
    label: 'Recruits',
    children: [
      {
        label: '배우 / 스탭',
        href: '#',
      },
    ],
  },
  {
    label: 'Community',
    children: [
      {
        label: '게시판',
        subLabel: '자유게시판, 로케이션 등',
        href: '#',
      },
      {
        label: '참여극장',
        href: '#',
      },
    ],
  },
  {
    label: 'TestingPages',
    children: [
      {
        label: 'crowdfundingTest',
        href: '/test',
      },
      {
        label: 'NFTs',
        href: '#',
      },
    ],
  },
];
