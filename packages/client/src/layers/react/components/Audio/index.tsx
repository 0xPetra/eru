import * as React from 'react';
import { useRef, useState } from 'react';
import { FiPlay, FiPause } from "react-icons/fi";
import { useFormik } from "formik";
import { Input, FormControl, Select, useToast, Button, IconButton, Stack, Card, Box, CardBody, CardFooter, HStack, Text } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Tag } from '@chakra-ui/react'
import { object, string } from 'zod';
import { utils } from "ethers";


import type { FC } from 'react';
import type { APITypes } from 'plyr-react';

import getThumbnailUrl from '../../../../lib/getThumbnailUrl';
import uploadSound from '../../../../lib/uploadSound';

import CoverImage from './CoverImage';
import Player from './Player';

type CoverType = {
  url?: string;
  mime: string
}

type AudioType = {
  item?: string;
  mime: string
}
interface Props {
  src: string;
  coverImg: CoverType | null;
  setCoverImg?: (setCoverImg: CoverType) => void;
  isNew?: boolean;
  audio?: AudioType;
  txn?: any;
  layers: any
}

export const AudioPublicationSchema = object({  
  title: string().trim().min(1, { message: 'Invalid audio title' }),
  cover: string().trim().min(1, { message: 'Invalid cover image' })
});

const Audio: FC<Props> = ({ src, coverImg, setCoverImg, isNew = false, audio, txn= null, layers }) => {
  const [playing, setPlaying] = useState(false);
  
  const toast = useToast();

  const playerRef = useRef<APITypes>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const {
    network: {
      world,
      components: { SoundUri },
      network: { connectedAddress },
    },
  } = layers;
  
  const formik = useFormik({
    initialValues: {
      title: '',
      type: '',
      key: '',
      bpm: ''
    },
    // TODO: Check a;; fields comply
    onSubmit: (values) => {
      publishSound(values);
      alert(JSON.stringify(values, null, 2))
    },
  })

  const publishSound = async (values) => {
    try {
      // TODO: Spinner/Loading
      const arweaveId = await uploadSound(audio, coverImg, values, connectedAddress);
      console.log("🚀 ~ file: index.tsx:68 ~ publishSound ~ arweaveId", arweaveId)
      // const id = crypto.randomBytes(32).toString('hex');
      // const pk = "0x"+id;
      const pk = window.localStorage.burnerWallet;
      // TODO: Get burnerWallet from local cache
      const entitiId = utils.computeAddress(pk);
      console.log("🚀 ~ file: DesktopWindow.tsx ~ line 44 ~ onDrop ~ entitiId, metadata.ipnft", entitiId, arweaveId)
      layers.network.api.uploadSound(entitiId, arweaveId)
      toast({
        title: 'Success',
        description: "Please choose less than 4 audio files.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setCoverImg(null);
      formik.resetForm();
    }catch (error) {
      console.log("🚀 ~ file: index.tsx:87 ~ publishSound ~ error", error)
      toast({
        title: 'Error',
        description: "Error uploading sound.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  // TODO: Add sound attached to coverImg
  const isMintEnabled = formik.values.title && coverImg;

  const handlePlayPause = () => {
    if (!playerRef.current) {
      return;
    }
    if (playerRef.current?.plyr.paused && !playing) {
      setPlaying(true);
      return playerRef.current?.plyr.play();
    }
    setPlaying(false);
    playerRef.current?.plyr.pause();
  };

  const remixSound = () => {
    // TODO: Define what remixing looks like
    console.log('remixSound remixSound')
  }

  const SoundDetails = (
      <>
      <Text as="h3">Titleeee</Text>

      <HStack spacing='20px' justifyContent='space-around'>

          <Text mb='8px'>TYPE</Text>
          <Tag>Tag type</Tag>

          <Text mb='8px'>KEY</Text>
          <Tag>Tag KEY</Tag>

          <Text mb='8px'>BPM</Text>
          <Tag>Tag BPM</Tag>
      </HStack>
      </>
    )

  const NewSoundForm = (     
      <>
      <FormControl>
          <Input 
            id='title'
            variant='unstyled' 
            placeholder='Add title' 
            onChange={formik.handleChange}
            value={formik.values.title}
            my={3}
            size='lg'
            />
        </FormControl>

        <HStack spacing='20px' justifyContent='space-around'>

          <Text mb='8px'>TYPE</Text>
          <Select 
            id='type'
            placeholder='Type' 
            size='sm'
            onChange={formik.handleChange}
            value={formik.values.type}
            >
            <option value='sound'>Sound</option>
            <option value='beat'>Beat</option>
            <option value='track'>Track</option>
            <option value='song'>Song</option>
          </Select>

          <Text mb='8px'>KEY</Text>
          <Select 
            id='key'
            placeholder='Key' 
            size='sm'
            onChange={formik.handleChange}
            value={formik.values.key}
            >
            <option value='G'>G</option>
            <option value='C'>C</option>
            <option value='F'>F</option>
          </Select>

          <Text mb='8px'>BPM</Text>
          <NumberInput size='sm' variant='outline'>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

        </HStack>
      </>
    )

  return (
      <Card
        my={20}
        mx={{sm: 5, md: 20}}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        maxH='300px'
        boxShadow='xl'
      >
        <CoverImage
          isNew={isNew && !txn}
          cover={isNew ? (txn ? txn?.cover : coverImg) : getThumbnailUrl(coverImg)}
          setCover={(item) =>
            setCoverImg(item)
          }
          // setCover={(url, mimeType) =>
          //   setCoverImg({ ...publication, cover: url, coverMimeType: mimeType })
          // }
          imageRef={imageRef}
        />
        <Box>

        <Stack>
        <form onSubmit={formik.handleSubmit}>
          <CardBody>
            <HStack spacing='24px'>
            {playing && !playerRef.current?.plyr.paused ? (
                <IconButton
                  bgGradient="linear(to-br, #553C9A , #FF0080)"
                  _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                  }}
                  size='lg'
                  aria-label='Stop play'
                  onClick={handlePlayPause}
                  as={FiPause}
                />
              ) : (
                <IconButton
                  bgGradient="linear(to-br, #553C9A , #FF0080)"
                  _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                  }}
                  size='md'
                  aria-label='Start play'
                  onClick={handlePlayPause}
                  as={FiPlay}
                />
                )}
              <Box>
                {isNew ? 
                <NewSoundForm />
                :
                <SoundDetails />
                }
              </Box>

            </HStack>
          </CardBody>
          <div className="md:pb-3">
            <Player src={src} playerRef={playerRef} />
          </div>
          <CardFooter justify="center">
          {isNew ?
            <Button
                type='submit'
                variant='solid' 
                disabled={!isMintEnabled}
                maxW={80} 
                bgGradient="linear(to-br, #553C9A , #FF0080)"
                _hover={{
                  bgGradient: 'linear(to-r, red.500, yellow.500)',
                }}
              >
              Mint Sound
            </Button>
            :
          <Button 
              onClick={remixSound}
              variant='solid' 
              maxW={80} 
              bgGradient="linear(to-br, #553C9A , #FF0080)"
              _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
              }}
            >
              Remix Sound
            </Button>
            }
          </CardFooter>
        </form>
        </Stack>
        </Box>
  </Card>
  );
};

export default Audio;
