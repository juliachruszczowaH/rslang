import React from 'react';
import AudioCallGameField from '../../components/Games/AudioCall/AudioCallGameField';
import style from './audiocallgame.module.css';

const AudioCallGame: React.FC = () => {

  return (
    <div className={style.audiocall__container}>
      <div className="audiocall-content">
        <AudioCallGameField />
      </div>
    </div>
  );
};

export default AudioCallGame;
