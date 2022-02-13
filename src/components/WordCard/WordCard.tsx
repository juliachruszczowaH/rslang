import { useState } from 'react';
import { Button, Card, Icon, Image, Popup } from 'semantic-ui-react';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import { isAuthenticated } from '../../services/AuthService';
import { play } from '../../utils/utils';
import './wordcard.css';

export const WordCard = (word: IWordData, color: string, isDictionary: boolean) => {
  console.log('Dictionary => ' + isDictionary);

  const handleHardClick = () => {
    console.log('HARD: ' + (word.id || word._id));

  };

  const handleKnownClick = () => {
    console.log('KNOWN: ' + (word.id || word._id));
  };


  return (
    <Card raised key={word.id}>
      <Image src={API_URL + word.image} ui={false} />
      <Card.Content>
        <Card.Header as="h3" style={{ backgroundColor: color }}>
          <Popup content='Click to listen' trigger={<Button onClick={() => play(API_URL + word.audio)}>
            <Icon name='headphones' position='center' />
          </Button>} />
          {word.word}</Card.Header>
        <Card.Meta>
          <span className='transcription'>{word.transcription}</span>
        </Card.Meta>
        <Card.Description>
          {word.wordTranslate}
        </Card.Description>
      </Card.Content>
      {isAuthenticated() ? (<Card.Content extra>
        <Button onClick={handleHardClick}>
          <Icon name={isDictionary ? 'eye slash' : 'eye'} />
        </Button>
        <Button onClick={handleKnownClick}>
          <Icon name='check circle outline' />
        </Button>
      </Card.Content>) : null}

    </Card>
  );
};
