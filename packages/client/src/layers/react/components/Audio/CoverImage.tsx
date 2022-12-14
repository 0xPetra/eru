import { FC, Ref, useCallback } from 'react';
import React, { useState } from 'react';
import { useToast, Flex, Image, Icon, Spinner, Text, Box } from '@chakra-ui/react'
import { FiImage } from "react-icons/fi";
import {useDropzone} from 'react-dropzone'

import { ALLOWED_IMAGE_TYPES } from '../../../../constants';

import handleAttachment from '../../../../lib/handleAttachment';
import getIPFSLink from '../../../../lib/getIPFSLink';
import imageProxy from '../../../../lib/imageProxy';

interface Props {
  isNew: boolean;
  cover: string;
  setCover: (url: string, mime: string) => void;
  imageRef: Ref<HTMLImageElement>;
}

const CoverImage: FC<Props> = ({ isNew = false, cover, setCover, imageRef }) => {
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const onDrop = useCallback(async acceptedFiles => {
    handleAttachment(acceptedFiles, setIsUploading, setCover, ALLOWED_IMAGE_TYPES, toast);
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: { "image/jpg": ALLOWED_IMAGE_TYPES }})

  return (
    <Flex align="center" justify="center" backgroundColor="grey" >
          {isNew && !cover ? (
            <div {...getRootProps()}  >
            <input {...getInputProps()} />
                <Flex align="center" justify="center" direction="column">
                  <Box minW={100} p={10}>
              {isUploading && !cover ? 
                <Spinner size='md' />
                :
                <>
                  <Icon as={FiImage} />
                  <Text as="h3">Add cover image</Text>
                </>
              }
              </Box>
                </Flex>
            </div> )
            :
            <Image
              objectFit='cover'
              src={cover ? imageProxy(getIPFSLink(cover.item)) : cover.item}
              alt='Sound cover Image'
              ref={imageRef}
              width="auto"
            />
            }
    </Flex>
  );
};

export default CoverImage;

