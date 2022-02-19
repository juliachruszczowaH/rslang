import React from 'react';
import SprintGameField from '../../components/Games/Sprint/SprintGameField';
import './sprintgame.css';

const SprintGame: React.FC = () => {


  return (
    <div className="sprint-container">
      <div className="sprint-content">
        <SprintGameField />
      </div>
    </div>
  );
};

export default SprintGame;
