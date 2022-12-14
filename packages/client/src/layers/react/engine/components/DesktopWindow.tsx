import React, {useState} from 'react'
import { observer } from "mobx-react-lite";
import { Box, Text } from '@chakra-ui/react'

import getIPFSLink from '../../../../lib/getIPFSLink'

import NavBar from '../../components/NavBar'
import Audio from '../../components/Audio'
import DropZone from '../../components/DropZone'
import styles from './stylesDesktop.module.css'



export const DesktopWindow: React.FC = observer(({layers}) => {
  const [attachments, setAttachments] = useState([]);
  const [coverImg, setCoverImg] = useState(null);
  
return (  
    <Box width="100%" height="100%" className={styles.desktop}>
      <NavBar layers={layers} />
      <div className={styles.content}>
        {/* This component uploads metadata from entity to arweave */}
        {/* TODO:  */}
        {attachments.length > 0 ? 
          <div>   
          {attachments.map((audio, id) => {
            const src = getIPFSLink(audio.item);
            return <Box key={id}>
              {/* <Text>{item.name}</Text> */}
              <Audio src={src} coverImg={coverImg} setCoverImg={setCoverImg} isNew={true} attachments={attachments} layers={layers}  />
              {/* TODO: Remove (Should also remove metadata on IPFS) */}
              {/* <IconButton aria-label='Remove ' as={FiTrash} /> */}
            </Box>
          })}
          </div>
          :
          <div>
            <Text mt={10} fontSize='2em' >Upload Beats</Text>
            {/* // This component handles IPFS uploads and attached components. Also shows attached file data */}
            {/* TODO: Make attachments and setAttachment a general state */}
            <DropZone setAttachments={setAttachments} attachments={attachments} />
          </div>
          }
        <Text>(Use mobile for remixing)</Text>
        {/* TODO: Copy link to share */}
        {/* <a>Copy</a> */}
      </div>
    </Box>
  )
});