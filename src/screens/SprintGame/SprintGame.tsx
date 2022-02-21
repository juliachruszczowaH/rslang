import React from 'react';
import SprintGameField from '../../components/Games/Sprint/SprintGameField';
import style from './sprintgame.module.css';

const SprintGame: React.FC = () => {


  return (
    <div className={style.sprint__container}>
      <div className="sprint-content">
        <SprintGameField />
      </div>
    </div>
  );
};

export default SprintGame;
