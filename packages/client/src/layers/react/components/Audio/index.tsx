import * as React from 'react';
import { useRef, useState } from 'react';
import { FiPlay, FiPause } from "react-icons/fi";
import { useFormik } from "formik";
import { Input, FormControl, Select, useToast } from '@chakra-ui/react'

import type { FC } from 'react';
import type { APITypes } from 'plyr-react';

import getAttributeFromTrait from '../../../../lib/getAttributeFromTrait';
import getThumbnailUrl from '../../../../lib/getThumbnailUrl';
import uploadSound from '../../../../lib/uploadSound';
import { object, string } from 'zod';
import { Button, IconButton, Stack, Card, Box, CardBody, CardFooter, HStack } from '@chakra-ui/react'

import CoverImage from './CoverImage';
import Player from './Player';


interface Props {
  src: string;
  isNew?: boolean;
  publication?: unknown;
  setPublication?: unknown;
  txn?: any;
}

export const AudioPublicationSchema = object({  
  title: string().trim().min(1, { message: 'Invalid audio title' }),
  cover: string().trim().min(1, { message: 'Invalid cover image' })
});

const Audio: FC<Props> = ({ src, isNew = false, attachments, publication, setPublication ,txn= null, connectedAddress= "0x0" }) => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<APITypes>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      title: '',
      type: '',
      key: '',
      bpm: ''
    },
    // TODO: Check a;; fields comply
    onSubmit: (values) => {
      publishSound();
      alert(JSON.stringify(values, null, 2))
    },
  })

  const publishSound = async () => {
    try {
      // TODO: Spinner/Loading
      await uploadSound(attachments, publication, connectedAddress);
      toast({
        title: 'Success',
        description: "Please choose less than 4 audio files.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setPublication(null);
    }catch (error) {
      toast({
        title: 'Error',
        description: "Error uploading sound.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  // TODO: Add sound attached to publication
  const isMintEnabled = formik.values.title && publication?.cover && publication?.sound;

  console.log("🚀 ~ file: index.tsx:46 ~ handlePlayPause ~ playerRef.current?.plyr", playerRef.current?.plyr)
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

  return (
      <Card
        my={20}
        mx={{sm: 5, md: 20}}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        boxShadow='xl'
      >
        <CoverImage
          isNew={isNew && !txn}
          cover={isNew ? (txn ? txn?.cover : publication?.cover) : getThumbnailUrl(publication)}
          setCover={(item) =>
            setPublication({ ...publication, cover: item })
          }
          // setCover={(url, mimeType) =>
          //   setPublication({ ...publication, cover: url, coverMimeType: mimeType })
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
              colorScheme='purple'
              size='lg'
              borderRadius="full"
              padding={2}
              aria-label='Stop play'
              onClick={handlePlayPause}
              as={FiPause}
              color="white"
              />
              ) : (
                <IconButton
                colorScheme='purple'
                size='lg'
                borderRadius="full"
                padding={2}
                aria-label='Start play'
                onClick={handlePlayPause}
                as={FiPlay}
                color="white"
                />
                )}

              <Box>
                <FormControl>
                  <Input 
                    id='title'
                    variant='unstyled' 
                    placeholder='Add title' 
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    my={3}
                    />
                </FormControl>

                <HStack spacing='24px' justifyContent='space-around'>
                  <Select 
                    id='type'
                    placeholder='Type' 
                    size='sm'
                    onChange={formik.handleChange}
                    value={formik.values.type}
                    >
                    <option value='option1'>Sound</option>
                    <option value='option2'>Beat</option>
                    <option value='option3'>Song</option>
                  </Select>

                  <Select 
                    id='key'
                    placeholder='Key' 
                    size='sm'
                    onChange={formik.handleChange}
                    value={formik.values.key}
                    >
                    <option value='option1'>G</option>
                    <option value='option2'>C</option>
                    <option value='option3'>F</option>
                  </Select>

                  <Select 
                    id='bpm'
                    placeholder='BPM' 
                    size='sm'
                    onChange={formik.handleChange}
                    value={formik.values.bpm}
                    >
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>

                </HStack>

              </Box>

            </HStack>
          </CardBody>
          <div className="md:pb-3">
            <Player src={src} playerRef={playerRef} />
          </div>
          <CardFooter justify="center">
            <Button 
              type='submit'
              variant='solid' 
              isActive={isMintEnabled}
              disabled={!isMintEnabled}
              maxW={80} 
              bgGradient="linear(to-br, #553C9A , #FF0080)"
            >
              Mint Sound
            </Button>
          </CardFooter>
        </form>
        </Stack>
        </Box>
  </Card>
  );
};

export default Audio;
