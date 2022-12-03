import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { useToast, Spinner, Box } from '@chakra-ui/react'

import { ALLOWED_MEDIA_TYPES } from '../../../constants';
import uploadToIPFS from '../../../lib/uploadToIPFS';

import styles from '../engine/components/stylesDesktop.module.css'

const DropZone = ({setAttachments, attachments}) => {
  const [isUploading, setIsUploading] = useState(false)
  const toast = useToast()

  const isTypeAllowed = (files: any) => {
    for (const file of files) {
      if (ALLOWED_MEDIA_TYPES.includes(file.type)) {
        return true;
      }
    }
    return false;
  };

  const handleAttachment = async (files: string | unknown[]) => {
    setIsUploading(true);
    try {
      // Count check
      if (files && (files.length > 4)) {
        toast({
          title: 'Error',
          description: "Please choose less than 4 audio files.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return
      }

      // Type check
      if (isTypeAllowed(files)) {
        try {
          const attachment = await uploadToIPFS(files);
          console.log("🚀 ~ file: DropZone.tsx:57 ~ handleAttachment ~ attachment", attachment)
          if (attachment) {
            setAttachments(attachment);
          }
        } catch (error) {
          console.error("🚀 ~ error", error)
          toast({
            title: 'Error',
            description: "Error uploading file.",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })          
        }
      } else {
        toast({
          title: 'Error',
          description: "File format not allowed.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return
      }
    } finally {
      setIsUploading(false);
    }
  };


  const onDrop = useCallback(async acceptedFiles => {
    handleAttachment(acceptedFiles);
    const publicationContent = {
      audio: acceptedFiles[0]
    }
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: { "audio/mpeg": ALLOWED_MEDIA_TYPES }})

    
return (
  <Box minH="40vh">

  <div {...getRootProps()}  >
    <input {...getInputProps()} />
    
    {isUploading ? 
      <Spinner size='md'/>
      :
      <div className={styles.dropzone}>
      {
        isDragActive ?
        <p>Drop the music files here ...</p> :
        <p>Drag 'n' drop some music files here</p>
      }
    </div>}
  </div>
  </Box>
)
}

export default DropZone;