import { v4 as uuid } from 'uuid';


import uploadToArweave from './uploadToArweave';
import getTags from './getTags';
import trimify from './trimify';
import getUserLocale from './getUserLocale';

import {APP_NAME, ALLOWED_AUDIO_TYPES} from '../constants'

const uploadSound = async (attachments, coverImg, formData, connectedAddress) => {
  // hooks
  // const isAudioComment = ALLOWED_AUDIO_TYPES.includes(attachments[0]?.type);
  
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
    },
    {
      traitType: 'author',
      displayType: 'string',
      value: `${connectedAddress}` // TODO: Agregar campo y completar autor o deberia ser la wallet? // audioPublication.author
    }
  ];

  const vlaues = JSON.stringify({
    version: '2.0.0',
    metadata_id: uuid(),
    // description: trimify(publicationContent),
    // content: trimify(publicationContent),
    // TODO: Add address
    external_url: `https://eru.gg/${connectedAddress}`,
    // external_url: `https://eru.gg/${currentProfile?.handle}`,
    coverImg,
    name: formData.title,
    type: formData.type,
    key: formData.key,
    bpm: formData.bpm,
    tags: getTags(formData),
    animation_url: getAnimationUrl(),
    mainContentFocus: 'AUDIO',
    contentWarning: null, // TODO
    attributes,
    media: attachments,
    locale: getUserLocale(),
    createdOn: new Date(),
    appId: APP_NAME
  })

  const arweaveId = await uploadToArweave(vlaues);

  return arweaveId;
}

export default uploadSound;