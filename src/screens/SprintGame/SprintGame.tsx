import React from 'react';
import SprintGameField from '../../components/Games/Sprint/SprintGameField';
import './sprintgame.css';

const SprintGame: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const group = queryParams.get('group');
  const page = queryParams.get('page');
  console.log(group, page);

  //если придёт null null - старый способ с выбором категории
  // если придут цифры - то это номер группы и номер страницы

  return (
    <div className="sprint-container">
      <div className="sprint-content">
        <SprintGameField />
      </div>
    </div>
  );
};

export default SprintGame;
