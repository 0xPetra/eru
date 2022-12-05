import uploadToIPFS from './uploadToIPFS'

const handleAttachment = async (files: string | unknown[], setIsUploading, setAttachments, allowedMedia, toast) => {
    const isTypeAllowed = (files: any) => {
        for (const file of files) {
          if (allowedMedia.includes(file.type)) {
            return true;
          }
        }
        return false;
      };

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

  export default handleAttachment;