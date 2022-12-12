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
  Circle
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, Icon } from '@chakra-ui/icons';
import { FiUser, FiCopy, FiMusic } from "react-icons/fi";
import Blockies from 'react-blockies';

import formatAddress from '../../../lib/formatAddress'

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
                  <Icon as={FiUser}/>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                      <Avatar
                        size={'xl'}
                        variant="circular"
                        // src={'https://avatars.dicebear.com/api/male/username.svg'}
                        icon={<Circle>
                          <Blockies
                          seed={stringAddress} 
                          size={10} 
                          scale={14}
                          bgColor="#100687" 
                          spotColor="#FF0080" 
                          className="identicon"
                          />
                          </Circle>
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
              {location.pathname == "/" && <LinkBox>
              <LinkOverlay href='create'>
                <Button 
                    leftIcon={<FiMusic />}
                    type='submit'
                    variant='solid' 
                    maxW={80} 
                    bgGradient="linear(to-br, #553C9A , #FF0080)"
                    _hover={{
                      bgGradient: 'linear(to-r, red.500, yellow.500)',
                    }}
                    >
                    Add Music
                </Button>
                </LinkOverlay>
                    </LinkBox>
                }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default NavBar;