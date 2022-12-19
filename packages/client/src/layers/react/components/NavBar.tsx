import React from "react";
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Image,
  useColorMode,
  Center,
  LinkBox,
  LinkOverlay,
  Stack,
  Avatar,
  MenuDivider,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { FiUser, FiCopy } from "react-icons/fi";
import Blockies from 'react-blockies';

import formatAddress from '../../../lib/formatAddress'
import CustomBtn from '../components/CustomBtn'

const NavBar = ({layers}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    network: {
      world,
      components: { SoundUri },
      network: { connectedAddress },
    },
  } = layers;

  const stringAddress = `${connectedAddress}`

  return (
    <>
      <Box px={4}>
      {/* <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}> */}
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <LinkBox>
          <LinkOverlay href='/'>         
            <Image src='/img/eruwhite.png' alt='Eru Logo' height="60%" />
          </LinkOverlay>
          </LinkBox>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}

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
                  <Icon as={FiUser}/>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                      <Avatar
                        size={'xl'}
                        variant="circular"
                        // src={'https://avatars.dicebear.com/api/male/username.svg'}
                        icon={
                          <Blockies
                          seed={stringAddress} 
                          size={10} 
                          scale={14}
                          bgColor="#100687" 
                          spotColor="#FF0080" 
                          className="identicon"
                          />
                          }
                      />
                  </Center>
                  <br />
                  <Center>
                    <p>{formatAddress(stringAddress)} <Icon aria-label='Copy Address' as={FiCopy} mx={5}/></p>
                  </Center>
                  <br />
                  {/* <MenuDivider /> */}
                  {/* <MenuItem>Copy pk</MenuItem> */}
                  {/* <MenuItem>Account Settings</MenuItem> */}
                  {/* <MenuItem>Logout</MenuItem> */}
                </MenuList>
              </Menu>
              {location.pathname == "/" && <CustomBtn href="create" text="Add Music" />}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default NavBar;