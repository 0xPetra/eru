import React, {useState} from 'react'
import { observer } from "mobx-react-lite";
import { Box, Text } from '@chakra-ui/react'

import getIPFSLink from '../../../../lib/getIPFSLink'

import NavBar from '../../components/NavBar'
import Audio from '../../components/Audio'
import DropZone from '../../components/DropZone'
import styles from './stylesDesktop.module.css'



export const DesktopWindow: React.FC = observer(({layers}) => {
  const [audio, setAudio] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  
return (  
    <Box width="100%" height="100%" className={styles.desktop}>
      <NavBar layers={layers} />
      <div className={styles.content}>
        {/* This component uploads metadata from entity to arweave */}
        {/* TODO:  */}
        {audio ? 
            <Box>
              {/* <Text>{item.name}</Text> */}
              <Audio src={getIPFSLink(audio?.item)} setAudio={setAudio} coverImg={coverImg} setCoverImg={setCoverImg} isNew={true} audio={audio} layers={layers}  />
              {/* TODO: Remove (Should also remove metadata on IPFS) */}
              {/* <IconButton aria-label='Remove ' as={FiTrash} /> */}
            </Box>
          :
          <div>
            <Text mt={10} fontSize='2em' >Upload Beats</Text>
            {/* // This component handles IPFS uploads and attached components. Also shows attached file data */}
            {/* TODO: Make attachments and setAttachment a general state */}
            <DropZone setAudio={setAudio} />
          </div>
          }
        <Text>(Use mobile for remixing)</Text>
        {/* TODO: Copy link to share */}
        {/* <a>Copy</a> */}
      </div>
    </Box>
  )
});