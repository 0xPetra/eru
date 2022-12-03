import * as React from 'react';
import { useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import type { APITypes } from 'plyr-react';
import { FiPlay, FiPause } from "react-icons/fi";

import getAttributeFromTrait from '../../../../lib/getAttributeFromTrait';
import getThumbnailUrl from '../../../../lib/getThumbnailUrl';
// import { Leafwatch } from '@lib/leafwatch';
import { usePublicationStore } from 'src/store/publication';
// import { PUBLICATION } from 'src/tracking';
import { object, string } from 'zod';
import { useToast, Button, IconButton, Text, Heading, Stack, Card, Box, CardBody, CardFooter, HStack } from '@chakra-ui/react'

import CoverImage from './CoverImage';
import Player from './Player';


interface Props {
  src: string;
  isNew?: boolean;
  publication?: unknown;
  setPublication?: unknown;
  txn: any;
}

export const AudioPublicationSchema = object({  
  title: string().trim().min(1, { message: 'Invalid audio title' }),
  author: string().trim().min(1, { message: 'Invalid author name' }),
  cover: string().trim().min(1, { message: 'Invalid cover image' })
});

const Audio: FC<Props> = ({ src, isNew = false, publication, setPublication ,txn }) => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<APITypes>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // TODO: Add sound attached to publication
  const isMintEnabled = publication?.author && publication?.cover && publication?.sound;

  console.log("🚀 ~ file: index.tsx:46 ~ handlePlayPause ~ playerRef.current?.plyr", playerRef.current?.plyr)
  const handlePlayPause = () => {
    if (!playerRef.current) {
      return;
    }
    if (playerRef.current?.plyr.paused && !playing) {
      setPlaying(true);
      // Leafwatch.track(PUBLICATION.ATTACHEMENT.AUDIO.PLAY);

      return playerRef.current?.plyr.play();
    }
    setPlaying(false);
    f.current?.plyr.pause();
    // Leafwatch.track(PUBLICATION.ATTACHEMENT.AUDIO.PAUSE);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPublication({ ...publication, [e.target.name]: e.target.value });
  };

  return (
      <Card
        my={20}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='solid'
        backgroundColor="#1A202C"
        boxShadow='xl'
      >
        <CoverImage
          isNew={isNew && !txn}
          cover={isNew ? (txn ? txn.cover : publication.cover) : getThumbnailUrl(publication)}
          setCover={(url, mimeType) =>
            setPublication({ ...publication, cover: url, coverMimeType: mimeType })
          }
          imageRef={imageRef}
        />
      <Stack>
        <CardBody>
        <HStack spacing='24px'>
          {playing && !playerRef.current?.plyr.paused ? (
              <IconButton
                colorScheme='teal'
                size='lg'
                borderRadius="full"
                padding={2}
                aria-label='Stop play'
                onClick={handlePlayPause}
                as={FiPause}
              />
            ) : (
              <IconButton
                colorScheme='teal'
                size='lg'
                borderRadius="full"
                padding={2}
                aria-label='Start play'
                onClick={handlePlayPause}
                as={FiPlay}
              />
            )}
            <Box>
              <Heading size='md' color="white">The perfect latte</Heading>
              <Text py='2' color="white">
                Caffè latte is a coffee beverage of Italian origin made with espresso
                and steamed milk.
              </Text>
            </Box>
          </HStack>
        </CardBody>
        <CardFooter>

          <div className="md:pb-3">
            <Player src={src} playerRef={playerRef} />
          </div>
        </CardFooter>

          <Button variant='solid' isActive={isMintEnabled} maxW={80} >
            Mint Sound
          </Button>
      </Stack>
  </Card>
  );
};

export default Audio;
