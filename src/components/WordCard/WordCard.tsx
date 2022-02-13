import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import { isAuthenticated } from '../../services/AuthService';
import { play } from '../../utils/utils';
import './wordcard.css';

export const WordCard = (word: IWordData, color: string) => {
  return (
    <Card>
      <Image src={API_URL + word.image} ui={false} />
      <Card.Content>
        <Card.Header as="h3" style={{ backgroundColor: color }}>        <Button onClick={() => play(API_URL + word.audio)}>
          <Icon name='headphones' />
        </Button>{word.word}</Card.Header>
        <Card.Meta>
          <span className='transcription'>{word.transcription}</span>
        </Card.Meta>
        <Card.Description>
          {word.wordTranslate}
        </Card.Description>
      </Card.Content>
      {isAuthenticated() ? (<Card.Content extra>
        <Button onClick={() => console.log('difficult')}>
          <Icon name='eye' />
        </Button>
        <Button onClick={() => console.log('known')}>
          <Icon name='check circle outline' />
        </Button>
      </Card.Content>) : null}

    </Card>
  );
};
