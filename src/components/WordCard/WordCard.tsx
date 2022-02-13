import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import { play } from '../../utils/utils';
import './wordcard.css';

export const WordCard = (word: IWordData) => {
  return (
    <Card>
      <Image src={API_URL + word.image} raised ui={false} />
      <Card.Content>
        <Card.Header>{word.word}</Card.Header>
        <Card.Meta>
          <span className='transcription'>{word.transcription}</span>
        </Card.Meta>
        <Card.Description>
          {word.wordTranslate}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          {word.textExample}
        </Card.Description>
        <Card.Description>
          {word.transcription}
        </Card.Description>
        <Card.Description>
          {word.textMeaningTranslate}
        </Card.Description>
        <Card.Description>
          {word.textExampleTranslate}
        </Card.Description>
        <Card.Description>
          {word.textMeaning}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button onClick={() => play(API_URL + word.audioMeaning)}>
          <Icon name='headphones' />
        </Button>
        <Button>
          <Icon name='arrow alternate circle down' />
        </Button>
      </Card.Content>
    </Card>
  );
};
