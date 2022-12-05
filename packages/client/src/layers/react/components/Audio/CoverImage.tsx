import { FC, Ref, useCallback } from 'react';
import React, { useState } from 'react';
import { useToast, Flex, Image, Icon, Spinner, Stack, Text, Box } from '@chakra-ui/react'
import { FiImage } from "react-icons/fi";
import {useDropzone} from 'react-dropzone'

import { ALLOWED_IMAGE_TYPES } from '../../../../constants';

import handleAttachment from '../../../../lib/handleAttachment';
import getIPFSLink from '../../../../lib/getIPFSLink';
import imageProxy from '../../../../lib/imageProxy';

interface Props {
  isNew: boolean;
  cover: string;
  setCover: (url: string, mimeType: string) => void;
  imageRef: Ref<HTMLImageElement>;
}

const CoverImage: FC<Props> = ({ isNew = false, cover, setCover, imageRef }) => {
  console.log("🚀 ~ file: CoverImage.tsx:22 ~ cover", cover)
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const onDrop = useCallback(async acceptedFiles => {
    handleAttachment(acceptedFiles, setIsUploading, setCover, ALLOWED_IMAGE_TYPES, toast);
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: { "image/jpg": ALLOWED_IMAGE_TYPES }})

  return (
    <Flex align="center" justify="center" backgroundColor="grey">
          {isNew && !cover ? (
            <div {...getRootProps()}  >
            <input {...getInputProps()} />
              {isUploading && !cover ? 
                <Spinner size='md'/>
                :
                <Flex align="center" justify="center">
                  <Stack>
                  <Icon as={FiImage} size="md"/>
                  <Text as="h3">Add cover</Text>
                  </Stack>
                </Flex>
              }
            </div> )
            :
            <Image
              borderLeftRadius='24px'
              objectFit='cover'
              src={cover ? imageProxy(getIPFSLink(cover[0].item)) : cover}
              alt='Sound cover Image'
              ref={imageRef}
            />
            }
        </Flex>
  );
};

export default CoverImage;

