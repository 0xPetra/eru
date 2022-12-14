import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { Spinner, Flex, useToast } from '@chakra-ui/react'

import { ALLOWED_MEDIA_TYPES } from '../../../constants';
import handleAttachment from '../../../lib/handleAttachment';

import styles from '../engine/components/stylesDesktop.module.css'

const DropZone = ({setAudio}) => {
  const [isUploading, setIsUploading] = useState(false)
  const toast = useToast()

  const onDrop = useCallback(async acceptedFiles => {
    handleAttachment(acceptedFiles, setIsUploading, setAudio, ALLOWED_MEDIA_TYPES, toast);
    const publicationContent = {
      audio: acceptedFiles[0]
    }
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: { "audio/*": ALLOWED_MEDIA_TYPES }})

    
return (
    <Flex align="center" justify="center" minH="40vh">
      <div {...getRootProps()}  >
        <input {...getInputProps()} />
        
        {isUploading ? 
          <Spinner size='lg'/>
          :
          <div className={styles.dropzone}>
          {
            isDragActive ?
            <p>Drop the music files here or click to upload...</p> :
            <p>Drag 'n' drop some music files here</p>
          }
        </div>}
      </div>
    </Flex>
)
}

export default DropZone;