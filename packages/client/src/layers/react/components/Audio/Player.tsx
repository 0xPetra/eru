import 'plyr-react/plyr.css';

import React from 'react';
import type { FC, Ref } from 'react';
import type { APITypes } from 'plyr-react';
import Plyr from 'plyr-react';

type Props = {
  src: string;
  playerRef: Ref<APITypes>;
};

const Player: FC<Props> = ({ playerRef, src }) => {
  // const resetPlayer = () => {
  //   playerRef.current?.plyr.
  // };

  return (
    <Plyr
      ref={playerRef}
      source={{
        type: 'audio',
        sources: [{ src }]
      }}
      options={{
        controls: ['progress', 'current-time', 'mute', 'volume'],
        resetOnEnd: true
      }}
    />
  );
};

export default React.memo(Player);
