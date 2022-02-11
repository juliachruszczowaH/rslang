import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { play } from '../../utils/utils';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import './wordcard.css';


export const WordCard = (word: IWordData) => {

  function playAudio(){

    const audio = new Audio( API_URL );
    audio.play();

  }

  return (
    <Card>
      <Image
        src={API_URL + word.image}
        raised ui={false}
      />
      <Card.Content extra>

        <Button onClick={() => play(API_URL + word.audio) }>Add Me
            <Icon name='headphones' />
        </Button>
      </Card.Content>
    </Card>
  );
};
