import React, { useState, useEffect } from 'react'
import { observer } from "mobx-react-lite";
import { Box, Text } from '@chakra-ui/react'
import axios from 'axios';
import { defineQuery, HasValue, getComponentValue, getComponentEntities, getComponentValueStrict } from "@latticexyz/recs";

import Audio from '../../components/Audio'
import NavBar from '../../components/NavBar'
import styles from './stylesDesktop.module.css'
import { sounds } from '../constants'
import { ARWEAVE_GATEWAY } from '../../../../constants'

export const Explorer: React.FC = observer(({layers}) => {
  const {
    network: {
      world,
      components: { SoundUri },
      network: { connectedAddress },
    },
  } = layers;
  console.log("🚀 ~ file: Explorer.tsx:21 ~ constExplorer:React.FC=observer ~ SoundUri", SoundUri)

const [soundList, setSoundList] = useState([])

useEffect(() => {
  ( async () => {
    try {
      if (world.entityToIndex.size > 0){
        const entityId = sounds[0].entityId
        const entityIndex = world.entityToIndex.get(entityId);
        console.log("🚀 =======>>>>>", entityIndex);
        const soundData = getComponentValueStrict(SoundUri, entityIndex);
        console.log("🚀 ~ file: Explorer.tsx:32 ~ soundData", soundData)
        const response = await axios(`${ARWEAVE_GATEWAY}/tx/${soundData}/data`, {
          method: 'GET',
        });
        console.log("🚀 ~ file: Explorer.tsx:43 ~ response", response)
        setSoundList([soundData.value]);
      }
    } catch (error) {
     console.error(error.message) 
    }
} )()
}, [world.entityToIndex.size])


//  const soundssss = SoundUri.values('SoundUri')[0].keys()
//  console.log("🚀 ~ file: Explorer.tsx:27 ~ constExplorer:React.FC=observer ~ soundssss", soundssss)

      // =====================================
      // return query.update$.pipe(map(() => ({ matching: query.matching, world })));
      
      // This way we can "hear" changes related to a component (?)
      // const componentId = '0x7777b33884e1d056a8ca979833d686abd267f9f8';
      // const query = defineQuery([HasValue(SoundUri, { value: componentId })]);
      // console.log("🚀 =======>>>>>", SoundUri.update$.pipe(map(() => ({ matching: query.matching, world }))))
      // // console.log("🚀 =======>>>>>", query.update$.pipe(map(() => ({ matching: query.matching, world }))))
        

      // console.log("🚀 ~ file: MobileWindow.tsx ~ line 79 ~ fetchData ~ jsonMidi", jsonMidi)

        // =====================================
      // const componentEntities = getComponentEntities(SoundUri);
      // console.log("🚀 ~ file: MobileWindow.tsx ~ line 88 ~ fetchData ~ componentEntities", componentEntities)
      // const currentSound = getComponentValue(SoundUri, '0x7777b33884e1d056a8ca979833d686abd267f9f8');
      // console.log("🚀 currentSound:", currentSound)


      // const eee = [...getComponentEntities(SoundUri)].map((e) => {
      //   const soundData = getComponentValueStrict(SoundUri, e);
      //   console.log('soundData', e, '-', soundData)
      // })
  
return (  
    <Box width="100%" height="100%" className={styles.desktop}>
      <NavBar layers={layers} />
      <div className={styles.content}>
        {/* This component uploads metadata from entity to arweave */}
        {/* TODO:  */}
        {soundList.length > 0 ? 
          <div>   
          <div>
            <Text fontSize='2em'>Sounds, beats and Music</Text>
            <Text>(Use mobile for remixing)</Text>
          </div>
          {soundList.map((audio, id) => {
            // const src = getIPFSLink(audio.item);
            return <Box key={id}>
              {/* <Text>{item.name}</Text> */}
              <Audio src={audio.animation_url} coverImg={audio?.coverImg} isNew={false} layers={layers}  />
              {/* TODO: Remove (Should also remove metadata on IPFS) */}
              {/* <IconButton aria-label='Remove ' as={FiTrash} /> */}
            </Box>
          })}
          </div>
          :
          <div>
            <Text mt={10} fontSize='2em'>Nothing to show</Text>
            <Text>(Use mobile for remixing)</Text>
          </div>
          }
      </div>
    </Box>
  )
});