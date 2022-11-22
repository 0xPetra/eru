import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';


import uploadToArweave from './uploadToArweave';
import getTags from './getTags';
import trimify from './trimify';
import getUserLocale from './getUserLocale';

import {APP_NAME, ALLOWED_AUDIO_TYPES} from '../constants'

export const uploadFiles = async (attachments, publicationContent, setIsUploading) => {
  // hooks
  const [postContentError, setPostContentError] = useState('')
  const [audioPublication, setPublicationContent] = useState(null)


  const isAudioComment = ALLOWED_AUDIO_TYPES.includes(attachments[0]?.type);
  
  // effects
  useEffect(() => {
    setPostContentError('');
  }, [audioPublication]);
  
  // handlers
  const getAnimationUrl = () => {
    if (attachments.length > 0) {
      return attachments[0]?.item;
    }
    return null;
  };

  const attributes = [
    {
      traitType: 'type',
      displayType: 'string',
      value: 'audio'
    }
  ];
  if (isAudioComment) {
    attributes.push({
      traitType: 'author',
      displayType: 'string',
      value: 'Iluvaltar' // TODO: Agregar campo y completar autor o deberia ser la wallet? // audioPublication.author
    });
  }

  const arweaveId = await uploadToArweave({
    version: '2.0.0',
    metadata_id: uuid(),
    description: trimify(publicationContent),
    content: trimify(publicationContent),
    // TODO: Add address
    external_url: `https://eru.gg/${currentProfile?.handle}`,
    // image: attachments.length > 0 ? getAttachmentImage() : textNftImageUrl,
    // imageMimeType: attachments.length > 0 ? getAttachmentImageMimeType() : 'image/svg+xml',
    name: publicationContent.title,
    tags: getTags(publicationContent),
    animation_url: getAnimationUrl(),
    mainContentFocus: 'AUDIO',
    contentWarning: null, // TODO
    attributes,
    media: attachments,
    locale: getUserLocale(),
    createdOn: new Date(),
    appId: APP_NAME
  }).finally(() => setIsUploading(false));

  return arweaveId;
}
