import React, {useState} from 'react'
import { observer } from "mobx-react-lite";
import { Box, Text } from '@chakra-ui/react'

import getIPFSLink from '../../../../lib/getIPFSLink'

import NavBar from '../../components/NavBar'
import Audio from '../../components/Audio'
import DropZone from '../../components/DropZone'
import styles from './stylesDesktop.module.css'



export const Explorer: React.FC = observer(({layers}) => {
const sounds = []
  
return (  
    <Box width="100%" height="100%" className={styles.desktop}>
      <NavBar layers={layers} />
      <div className={styles.content}>
        {/* This component uploads metadata from entity to arweave */}
        {/* TODO:  */}
        {sounds.length > 0 ? 
          <div>   
          {sounds.map((audio, id) => {
            // const src = getIPFSLink(audio.item);
            return <Box key={id}>
              {/* <Text>{item.name}</Text> */}
              {/* <Audio src={src} isNew={true} attachments={attachments} layers={layers}  /> */}
              <p>AAAA</p>
              {/* TODO: Remove (Should also remove metadata on IPFS) */}
              {/* <IconButton aria-label='Remove ' as={FiTrash} /> */}
            </Box>
          })}
          </div>
          :
          <div>
            <Text mt={10} fontSize='2em' >List of Beats</Text>
            <Text>(Use mobile for remixing)</Text>
          </div>
          }
        {/* TODO: Copy link to share */}
        {/* <a>Copy</a> */}
      </div>
    </Box>
  )
});