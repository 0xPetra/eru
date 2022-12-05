import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useDrag } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'
import { defineQuery, HasValue, getComponentValue, getComponentEntities, getComponentValueStrict } from "@latticexyz/recs";
import { CircularProgress, CircularProgressLabel, CloseButton } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import * as Tone from 'tone'
import { Midi } from '@tonejs/midi'
import { map } from "rxjs";

import styles from './styles.module.css'
import { sounds } from '../constants'
import {ListIcon, PlayIcon, PadIcon} from '../../components/Icons';

const baseUrl = ""

const player = new Tone.Player({
  url: "https://tonejs.github.io/audio/drum-samples/loops/ominous.mp3",
  autostart: false,
});
const filter = new Tone.Filter(400, 'lowpass').toDestination();
const feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();

// connect the player to the feedback delay and filter in parallel
player.connect(filter);
player.connect(feedbackDelay);

export const MobileWindow: React.FC = observer(({ layers }) => {
  // Hooks
  const [mainPressed, setmainPressed] = useState(false)
  const [padPressed, setpadPressed] = useState(false)
  const [sound, setSound] = useState(null)

  const {
    network: {
      world,
      components: { SoundUri },
      network: { connectedAddress },
    },
  } = layers;

  // console.log('======>>>>', layers)
  // layers.network.api.move(0, {x: 10, y: 10})
  // layers.network.api.uploadSound(0, 'ipfs://bafybeiaymn6d3rq55wazujua7dxzirunawa6xff4knct76m6shsnmhjgva/076 Chilled Beat 1 Stick.mid');


  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {

      // =====================================
      // return query.update$.pipe(map(() => ({ matching: query.matching, world })));
      
      // This way we can "hear" changes related to a component (?)
      // const componentId = '0x7777b33884e1d056a8ca979833d686abd267f9f8';
      // const query = defineQuery([HasValue(SoundUri, { value: componentId })]);
      // console.log("🚀 =======>>>>>", SoundUri.update$.pipe(map(() => ({ matching: query.matching, world }))))
      // // console.log("🚀 =======>>>>>", query.update$.pipe(map(() => ({ matching: query.matching, world }))))

      try {
        const entityId = sounds[0].entityId
        const entityIndex = SoundUri.world.entityToIndex.get(entityId);
        console.log("🚀 =======>>>>>", entityIndex);
        const soundData = getComponentValueStrict(SoundUri, entityIndex);
        console.log("🚀 ~ file: MobileWindow.tsx ~ line 88 ~ fetchData ~ soundData", soundData.value)
        

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

      } catch {
        console.error('MobileWindow Errorrr:"')
      }

    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])



  const [style, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const bind = useDrag(({ active, movement: [x, y] }) => {
    api.start({
      x: active ? x : 0,
      y: active ? y : 0,
      scale: active ? 1.2 : 1
    })
  })

  // 
  const _mint = () => {

    return;
  }

  const _setBeat = () => {
    player.start()
    return;
  }

  // Components
  const InnerTrack = () => {
    return (
      <CircularProgressLabel>
        <div className={styles.innerTrack}>
          <p className={styles.digitalNumbers}>
            00:00
          </p>
          <p className={styles.trackName}>
            Soundtrack
          </p>
          <div>
            <PlayIcon  className={styles.playstop}/>
          </div>
        </div>
      </CircularProgressLabel>
    )
  }

  const RotaryElement = ({ styleprop, effect }) => {
    return (
      <div className={styleprop}>
        <a.div tabIndex={-1} {...bind()} className={styles.drag} style={style} />
        <div>
          <p className={styles.effectName}>
            {effect}
          </p>
        </div>
      </div>
    )
  }

  const PadComponent = () => {
    return (
      <div style={{ alignContent: 'center' }}>
        <div className={styles.padBg}>
          <a.div tabIndex={-1} {...bind()} className={styles.dragPad} style={style} />
          <div>
          </div>
        </div>
      </div>
    )
  }

  const MainButton = () => {
    return (
      <div>
        {mainPressed ?
          <>
            <img onClick={_setBeat} src="/img/check.png" className={styles.BottomCenter} />
          </>
          :
          <img onClick={() => setmainPressed(true)} src="/img/mainBtn.png" className={styles.BottomCenter} />
        }
      </div>
    )
  }

  const PadButton = () => {
    return (
      <div>
        <PadIcon onClick={() => setpadPressed(e => !e)} color={padPressed ? '#3DF69D' : '#7B7B7B'} className={styles.padButton} />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className="flex fullscreen" style={{ flexDirection: 'column' }}>
          <div style={{ height: "10vh", padding: "10px 20px", textAlign: "end" }}>
            <ListIcon />
            </div>

        <div className={styles.topWrapper}>
          <div style={{ height: "35vh" }}>
            <ArrowLeftIcon  className={styles.arrowLeft} />
            <div className={styles.circle}>
              <CircularProgress value={100} size='80vw' thickness='2px' color='#C527DF' trackColor='#C527DF' />
            </div>
            <div className={styles.circle}>
              <CircularProgress value={59} size='73vw' thickness='3px' trackColor="transparent" color="#6F6F6F">
                <InnerTrack />
              </CircularProgress>
            </div>
            <ArrowRightIcon  className={styles.arrowRight} />
          </div>
        </div>

        <div className={styles.bottomWrapper}>
          <div style={{ height: "40vh" }}>

            {!padPressed ? <>
              <RotaryElement styleprop={styles.TopLeft} effect="Reverb" />
              <RotaryElement styleprop={styles.BottomLeft} effect="Volume" />
              <RotaryElement styleprop={styles.TopRight} effect="Phaser" />
              <RotaryElement styleprop={styles.BottomRight} effect="Vibrato" />
              <MainButton />
            </>
              :
              <PadComponent />
            }
          </div>
        </div>
        {mainPressed ?
          <div className={styles.bottomWrapper}>
            <div style={{ height: "10vh" }}>
              <CloseButton onClick={() => setmainPressed(false)} color="#3DF69D" />
            </div>
          </div>
          :
          <>
            <div className={styles.bottomWrapper}>
              <div style={{ height: "10vh" }}>
                <PadButton />
              </div>
            </div>

            <div className={styles.bottomWrapper}>
              <div>
                <img onClick={_mint} src="/img/mintBtn.png" className={styles.mintBtn} />
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
});


const midiToJson = async (midiUrl: string | undefined) => {
  // load a midi file in the browser
  const midi = await Midi.fromUrl(midiUrl)
  //the file name decoded from the first track
  const name = midi.name
  //get the tracks
  midi.tracks.forEach(track => {
    //tracks have notes and controlChanges

    //notes are an array
    const notes = track.notes
    notes.forEach(note => {
      //note.midi, note.time, note.duration, note.name
    })

    //the control changes are an object
    //the keys are the CC number
    track.controlChanges[64]
    //they are also aliased to the CC number's common name (if it has one)
    track.controlChanges.sustain.forEach(cc => {
      // cc.ticks, cc.value, cc.time
    })

    //the track also has a channel and instrument
    //track.instrument.name
  })
  return midi;
}