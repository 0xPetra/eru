# 🎛 Eru

Eru is a music layer to enable devs to create tools, and help melomaniacs and fans compose, remix and share music in an open and interoperable way.

![eru-readme](https://user-images.githubusercontent.com/20055787/199198263-e97c38ad-a6e0-4666-a278-2487d1f9e721.png)

## Entity Component System

### Entities

- Sound
- Track
- Sample

#### Component Details

- EruMetadata**Component** is Component
    - Name and authors
- SoundUriComponent is StringComponent
    - URI of music binary (IPFS, etc)
- TrackConfigComponent
    - entityId of the sound
    - unordered array of positive integer values representing the number of miliseconds after the beginning of the track to play the Sound
- SampleTracksComponent is Uint256Component
    - Track entity IDs that are part of the sample

### Systems

- struct EruMetadata
    - name: string
    - authors: string[]
- setSoundEntitySystem(soundEntity, uri, eruMetadata)
    - soundEntity.SoundUriComponent = uri
    - entity.EruMetadataComponent = eruMetadata
- struct Tracks
- setSampleEntitySystem(soundEntity,
- **setSampleEntity**(sampleEntityId, tracks
- **SetSoundForTrack**(trackEntity, soundEntity)
    - trackEntity.TrackSoundComponent = soundEntity
- SchedulePlayForTrack(trackEntity, msAfterStart)
    - trackEntity.TrackTimingComponent.append(msAfterStart)
- AddTrackToSample(sampleEntity, trackEntity)
    - sampleEntity.SampleTracksComponent.append(trackEntity)
- RemoveTrackFromSample(sampleEntity, trackEntity)
    - sampleEntity.SampleTracksComponent.remove(trackEntity)

### Deploy contracts
From the contracts folder run:
```sh
yarn mud deploy --deployerPrivateKey <PRIVATE KEY> --deployClient --netlifySlug <SLUG> --netlifyPersonalToken <PERSONAL TOKEN>
```

### Test serverless functions locally

Run `vercel dev` from the client directory.
