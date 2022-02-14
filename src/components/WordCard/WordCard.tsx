import { useCallback, useState, useEffect } from 'react';

import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import { isAuthenticated } from '../../services/AuthService';
import { play } from '../../utils/utils';
import './wordcard.css';

export const WordCard = (word: IWordData, color?: string) => {
  const [wordCounter, setWordCounter] = useState(0);
  const [playList, setPlayList] = useState([word.audio, word.audioExample, word.audioMeaning]);
  const [audio, setAudio] = useState(new Audio(word.audio));

  const playCallback = useCallback(() => {
    audio.play();
  }, [audio]);


  useEffect(() => {
    if (playList[wordCounter]) {
      audio.src = playList[wordCounter];
      audio.play();
    }
  }, [wordCounter, audio, playList]);

  audio.onended = function () {
    setWordCounter(wordCounter + 1);
  };

  return (
    <Card raised>

      <Image src={API_URL + word.image} ui={false} />
      <Card.Content>
        <Card.Header as="h3" style={{ backgroundColor: color }}>        <Button onClick={ playCallback }>
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
