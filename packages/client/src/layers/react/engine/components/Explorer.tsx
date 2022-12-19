import React, { useState, useEffect } from 'react'
import { observer } from "mobx-react-lite";
import { Box, Text } from '@chakra-ui/react'
import axios from 'axios';
import { defineQuery, getComponentValueStrict } from "@latticexyz/recs";

import Audio from '../../components/Audio'
import NavBar from '../../components/NavBar'
import CustomBtn from '../../components/CustomBtn'
import styles from './stylesDesktop.module.css'
import { ARWEAVE_GATEWAY } from '../../../../constants'

export const Explorer: React.FC = observer(({layers}) => {
  const {
    network: {
      world,
      components: { SoundUri }
    },
  } = layers;
  
const formattedResponse = JSON.parse("{\"version\":\"2.0.0\",\"metadata_id\":\"477a3c24-4860-462d-992d-3d567797021f\",\"external_url\":\"https://eru.gg/0xdd70040edad97c0b55287034f0b8e99838614155\",\"coverImg\":{\"item\":\"ipfs://bafybeifxarggpx2dkeqir4yfctzpnxpodo4plgifoycj3ujs7fqbikzrpu\",\"type\":\"image/png\",\"altTag\":\"\"},\"name\":\"Smashing wassei\",\"type\":\"sound\",\"key\":\"G\",\"bpm\":\"\",\"tags\":[],\"animation_url\":null,\"mainContentFocus\":\"AUDIO\",\"contentWarning\":null,\"attributes\":[{\"traitType\":\"type\",\"displayType\":\"string\",\"value\":\"audio\"},{\"traitType\":\"author\",\"displayType\":\"string\",\"value\":\"0xdd70040edad97c0b55287034f0b8e99838614155\"}],\"media\":{\"item\":\"ipfs://bafybeianrbu4fkhk7n7dmmw3jc3d3y7qdtek3jar3aqsins56niscegbbi\",\"type\":\"audio/wav\",\"altTag\":\"\"},\"locale\":\"en-US\",\"createdOn\":\"2022-12-14T21:56:11.221Z\",\"appId\":\"Eru\"}")
console.log("🚀 ~ file: Explorer.tsx:22 ~ constExplorer:React.FC=observer ~ formattedResponse", formattedResponse)

  const [soundList, setSoundList] = useState([
    formattedResponse
  ])
  
useEffect(() => {
  ( async () => {
      if (world.entityToIndex.size > 0){
        const entities = layers.network.world.entities;
        for (let index = 0; index < entities.length; index++) {
          const entityId = entities[index];
          const entityIndex = world.entityToIndex.get(entityId);
        try {
          const soundData = getComponentValueStrict(SoundUri, entityIndex);
          console.log("🚀 ~ file: Explorer.tsx:32 ~ soundData", soundData)
          const response = await axios(`${ARWEAVE_GATEWAY}/${soundData.value}`, {
            method: 'GET',
          });
          console.log("🚀 ~ file: Explorer.tsx:43 ~ response", JSON.parse(response.data))
          const itemData =  JSON.parse(response.data);
          if (itemData) {
            setSoundList(prev => [...prev, itemData]);
          }
          } catch (error) {
            console.error(error.message) 
          }
        }
      }
} )()
}, [world.entityToIndex.size])

return (  
    <Box width="100%" height="100%" className={styles.desktop}>
      <NavBar layers={layers} />
      <div className={styles.content}>
        {soundList.length > 0 ? 
          <div>   
          <div>
            <Text fontSize='2em'>Sounds, beats and Music</Text>
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
            <CustomBtn href="create" text="Add Music" />
          </div>
          }
      </div>
    </Box>
  )
});