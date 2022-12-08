import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Image,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, Icon } from '@chakra-ui/icons';
import { FiUser, FiCopy } from "react-icons/fi";

import formatAddress from '../../../lib/formatAddress'

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

const NavBar = ({layers}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    network: {
      world,
      components: { SoundUri },
      network: { connectedAddress },
    },
  } = layers;

  return (
    <>
      <Box px={4}>
      {/* <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}> */}
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>         
            <Image src='/img/eruwhite.png' alt='Eru Logo' height="60%" />
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  {/* <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  /> */}
                  <Icon as={FiUser} size="md"/>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    {/* <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    /> */}
                    <Icon as={FiUser} size="lg"/>
                  </Center>
                  <br />
                  <Center>
                    <p>{formatAddress(`${connectedAddress}`)} <Icon aria-label='Copy Address' as={FiCopy} size="sm" mx={5}/></p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {/* <MenuItem>Copy pk</MenuItem> */}
                  {/* <MenuItem>Account Settings</MenuItem> */}
                  {/* <MenuItem>Logout</MenuItem> */}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default NavBar;