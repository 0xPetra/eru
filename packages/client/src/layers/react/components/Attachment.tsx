import type { ChangeEvent, FC } from 'react';
import { useRef, useState } from 'react';
import { useToast, Flex } from '@chakra-ui/react'
import { v4 as uuid } from 'uuid';

// import { PUBLICATION } from 'src/tracking';

// import { Leafwatch } from '../../../lib/leafwatch';
import uploadToIPFS from '../../../lib/uploadToIPFS';
import {
  ALLOWED_AUDIO_TYPES,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_MEDIA_TYPES,
  ALLOWED_VIDEO_TYPES
} from '../../../constants';
interface Props {
  attachments: unknown; // LensterAttachment[];
  setAttachments: unknown; // Dispatch<LensterAttachment[]>;
}

const Attachment: FC<Props> = ({ attachments, setAttachments }) => {

  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const id = uuid();
  const dropdownRef = useRef(null);
  const toast = useToast()

  // useOnClickOutside(dropdownRef, () => setShowMenu(false));

  const hasVideos = (files: any) => {
    let videos = 0;
    let images = 0;

    for (const file of files) {
      if (ALLOWED_VIDEO_TYPES.includes(file.type)) {
        videos = videos + 1;
      } else {
        images = images + 1;
      }
    }

    if (videos > 0) {
      if (videos > 1) {
        return true;
      }

      return images > 0 ? true : false;
    }

    return false;
  };

  const isTypeAllowed = (files: any) => {
    for (const file of files) {
      if (ALLOWED_MEDIA_TYPES.includes(file.type)) {
        return true;
      }
    }

    return false;
  };

  const handleAttachment = async (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setShowMenu(false);
    setLoading(true);
    console.log("🚀 ~ file: Attachment.tsx:73 ~ handleAttachment ~ evt.target.files", evt.target.files)

    try {
      // Count check
      if (evt.target.files && (hasVideos(evt.target.files) || evt.target.files.length > 4)) {
        toast({
          title: 'Error',
          description: "WPlease choose either 1 video or up to 4 photos.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return
      }

      // Type check
      if (isTypeAllowed(evt.target.files)) {
        try {
          const attachment = await uploadToIPFS(evt.target.files);
          if (attachment) {
            setAttachments(attachment);
            evt.target.value = '';
          }
        } catch (error) {
          console.log("🚀 ~ file: Attachment.tsx ~ line 97 ~ handleAttachment ~ error", error)
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
      setLoading(false);
    }
  };

  return (
    <div>
    <Flex align="center" justify="center">
    <input
      id={`audio_${id}`}
      type="file"
      accept={ALLOWED_AUDIO_TYPES.join(',')}
      className="hidden"
      // onClick={() => Leafwatch.track(PUBLICATION.NEW.ATTACHMENT.UPLOAD_AUDIO)}
      onChange={handleAttachment}
      disabled={attachments.length >= 4}
      />
    </Flex>
    </div>
  );
};

export default Attachment;
