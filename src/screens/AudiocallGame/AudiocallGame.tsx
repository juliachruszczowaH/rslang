import React from 'react';
import AudioCallGameField from '../../components/Games/AudioCall/AudioCallGameField';
import './audiocallgame.css';

const AudioCallGame: React.FC = () => {

  return (
    <div className="audiocall-container">
      <div className="audiocall-content">
        <AudioCallGameField />
      </div>
    </div>
  );
};

export default AudioCallGame;
