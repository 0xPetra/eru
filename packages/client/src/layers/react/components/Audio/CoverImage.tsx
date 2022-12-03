import type { ChangeEvent, FC, Ref } from 'react';
import React, { useState } from 'react';
import { useToast, Box, Image, Icon, Spinner, Stack, Text } from '@chakra-ui/react'
import { FiImage } from "react-icons/fi";


import getIPFSLink from '../../../../lib/getIPFSLink';
import imageProxy from '../../../../lib/imageProxy';
import uploadToIPFS from '../../../../lib/uploadToIPFS';
import { COVER, ERROR_MESSAGE } from '../../../../constants';

interface Props {
  isNew: boolean;
  cover: string;
  setCover: (url: string, mimeType: string) => void;
  imageRef: Ref<HTMLImageElement>;
}

const CoverImage: FC<Props> = ({ isNew = false, cover, setCover, imageRef }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onError = (error: any) => {
    toast({
      title: 'Error',
      description: error?.data?.message ?? error?.message ?? ERROR_MESSAGE,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
    setLoading(false);
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      try {
        setLoading(true);
        const attachment = await uploadToIPFS(e.target.files);
        setCover(attachment[0].item, attachment[0].type);
      } catch (error) {
        onError(error);
      }
    }
  };

  return (
    <Box pos="relative"  >
    {/* <div className="relative flex-none overflow-hidden group"> */}

      <Image
        borderRadius='24px'
        objectFit='cover'
        // boxSize='150px'
        maxW={{ base: '100%', sm: '200px' }}
        src={cover ? imageProxy(getIPFSLink(cover), COVER) : cover}
        alt='Sound cover Image'
        ref={imageRef}
      />

      {isNew && !cover && (
        <Box>
          {loading && !cover ? (
            <Spinner size='md' />
          ) : (
            <label className="form-control d-flex justify-content-start align-items-center" htmlFor="file-name" >
              <Stack>
                <Icon as={FiImage} />
                <span >Add cover</span>
              </Stack>
            </label>
          )}
          <input type="file" accept=".png, .jpg, .jpeg, .svg" className="hidden w-full" onChange={onChange} id="file-name"/>
        </Box>
      )}

    </Box>
  );
};

export default CoverImage;

