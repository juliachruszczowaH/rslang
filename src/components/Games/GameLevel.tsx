import React from 'react';
import { Button } from 'semantic-ui-react';
import { CATEGOTY_LINKS } from '../../constants/linksDataConstants';


export interface IGameData {
  level?: number,
  onStart: () => void,
}

const GameLevel: React.FC<IGameData> = ({ onStart }) =>{
  return (
    <div>

        <div>
          {CATEGOTY_LINKS.map((item) => (
            <Button
              key={item.id}
              onClick={onStart}
              style={{ backgroundColor: item.color }}
            >
              {`${item.id + 1} LEVEL`}
            </Button>
          ))}
        </div>

    </div>
  );
};

export default GameLevel;
