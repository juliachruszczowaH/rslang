import React from 'react';
import AudioCallGameField from '../../components/Games/AudioCall/AudioCallGameField';
import style from './audiocallgame.module.css';

const AudioCallGame: React.FC = () => {

  /*  const queryParams = new URLSearchParams(window.location.search);
  const group = queryParams.get('group');
  const page = queryParams.get('page');
  console.log(group, page);

  //если придёт null null - старый способ с выбором категории
  // если придут цифры - то это номер группы и номер страницы */

  return (
    <div className={style.audiocall__container}>
      <div className="audiocall-content">
        <AudioCallGameField />
      </div>
    </div>
  );
};

export default AudioCallGame;
