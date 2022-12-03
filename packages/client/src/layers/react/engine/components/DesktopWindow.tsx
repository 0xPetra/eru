import React, {useState} from 'react'
import { observer } from "mobx-react-lite";
import { Box, IconButton, Text, useToast, Flex } from '@chakra-ui/react'
import { FiTrash } from "react-icons/fi";


import getSrc from '../../../../utils/getSrc'



import Audio from '../../components/Audio'
import DropZone from '../../components/DropZone'
import Attachment from '../../components/Attachment'
import styles from './stylesDesktop.module.css'

const PUB_BOILERPLATE = {
  cover: '',
  author: '0xpetra',
  title: 'Musikita'
}

export const DesktopWindow: React.FC = observer(({layers}) => {
  const [attachments, setAttachments] = useState([]);
  const [publication, setPublication] = useState(PUB_BOILERPLATE);
  const toast = useToast()

  const createPost = (item) => {
    setAttachments([])
    toast({
      title: 'Success',
      description: "Your sound has been uploaded.",
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }

return (  
    <Box width="100%" height="100%" className={styles.desktop}>
      <div className={styles.content}>
        <Flex alignItems="center" justifyContent="center">
          <img src="/img/eruwhite.png" />
        </Flex>


        {/* <Attachment attachments={attachments} setAttachments={setAttachments} /> */}

        {/* This component uploads metadata from entity to arweave */}
        {/* TODO:  */}
        {attachments.length > 0 ? 
          <div>   
          {attachments.map((audio, id) => {
            const src = getSrc(audio.item);
            console.log("🚀 ~ file: DropZone.tsx:98 ~ {attachments.map ~ src", src)
            return <Box key={id}>
              {/* <Text>{item.name}</Text> */}
              <Audio src={src} isNew={true} publication={publication} setPublication={setPublication} txn={null} />
              {/* TODO: Remove (Should also remove metadata on IPFS) */}
              {/* <IconButton aria-label='Remove ' as={FiTrash} /> */}
            </Box>
          })}
          </div>
          :
          <div>
            <Text mt={10} fontSize='2em' color="white">Upload Beats</Text>
            {/* // This component handles IPFS uploads and attached components. Also shows attached file data */}
            <DropZone setAttachments={setAttachments} attachments={attachments} />
          </div>
          }
        <Text color="white">(Use mobile for remixing)</Text>
        {/* TODO: Copy link to share */}
        {/* <a>Copy</a> */}
      </div>
    </Box>
  )
});