import { useState } from 'react';
import { Button, Card, Divider, Grid, Icon, Image, Popup, Segment } from 'semantic-ui-react';
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
    <Card key={word.id} >
      <Card.Content >
        <div>
          <Image
            src={API_URL + word.image}
          />
          <Segment raised style={{ backgroundColor: color }}>
            <Card.Header as={'h3'} textAlign='left'>          <Popup content='Click to listen' trigger={<Button onClick={() => play(API_URL + word.audio)}>
              <Icon name='headphones' position='center' />
            </Button>} />
              {word.word} <Card.Meta textAlign='center'> <span className='transcription'>{word.transcription}</span></Card.Meta></Card.Header>

          </Segment>
          <Card.Header as={'h3'}>
            {word.wordTranslate}
          </Card.Header>
          <Divider />
        </div>
        <div>
          <Card.Description textAlign='left' >
            <p>
              <span dangerouslySetInnerHTML={{ __html: word.textMeaning ? word.textMeaning : '' }}>
              </span>
              <br />
              <span >
                {word.textMeaningTranslate}
              </span>
            </p>

            <p>
              <span dangerouslySetInnerHTML={{ __html: word.textExample ? word.textExample : '' }}>

              </span>
              <br />
              <span style={{}}>
                {word.textExampleTranslate}
              </span>
            </p>

          </Card.Description>
          <Divider />
          {isAuthenticated() ? (
            <Card.Content extra>
              <Button onClick={handleHardClick}>
                <Icon name={isDictionary ? 'eye slash' : 'eye'} />
              </Button>
              <Button onClick={handleKnownClick}>
                <Icon name='check circle outline' />
              </Button>
            </Card.Content>) : null}
        </div>

      </Card.Content>

    </Card>
  );
};
