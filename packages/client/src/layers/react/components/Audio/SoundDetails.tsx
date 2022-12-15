import * as React from 'react';

import { Tag, HStack, Text } from '@chakra-ui/react'

const SoundDetails = () => {
  return (
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
}

export default SoundDetails;