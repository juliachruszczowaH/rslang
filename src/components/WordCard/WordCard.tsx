import { MouseEvent } from 'react';
import {
  Button,
  ButtonProps,
  Card,
  Divider,
  Icon,
  Image,
  Popup,
  Segment,
} from 'semantic-ui-react';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import { isAuthenticated } from '../../services/AuthService';
import './wordcard.css';

export const WordCard = (
  wordd:any,
  colorT: string,
  isDictionary: boolean,
  handleHardClick: ((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, data: ButtonProps) => void) | undefined,
  handleKnownClick: ((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, data: ButtonProps) => void) | undefined,
  handleSoundPlay: ((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, data: ButtonProps) => void) | undefined,
) => {
  console.log('card');
  console.log(wordd);
  const o = (
    <div>
   <Card.Content>
      <div>
        <Image src={API_URL + wordd.image} />
        <Segment raised style={{ backgroundColor: colorT }}>
          <Card.Header as={'h3'} textAlign='left'>
            <Popup
              content='Click to listen'
              trigger={
                <Button onClick={handleSoundPlay}>
                  <Icon name='headphones' position='center' />
                </Button>
              }
            />
            {wordd.word}{' '}
            <Card.Meta textAlign='center'>
              {' '}
              <span className='transcription'>{wordd.transcription}</span>
            </Card.Meta>
          </Card.Header>
        </Segment>
        <Card.Header as={'h3'}>{wordd.wordTranslate}</Card.Header>
        <Divider />
      </div>
      <div>
        <Card.Description textAlign='left'>
          <p>
            <span
              dangerouslySetInnerHTML={{
                __html: wordd.textMeaning ? wordd.textMeaning : '',
              }}
            ></span>
            <br />
            <span>{wordd.textMeaningTranslate}</span>
          </p>

          <p>
            <span
              dangerouslySetInnerHTML={{
                __html: wordd.textExample ? wordd.textExample : '',
              }}
            ></span>
            <br />
            <span style={{}}>{wordd.textExampleTranslate}</span>
          </p>
        </Card.Description>
        <Divider />
        {isAuthenticated() ? (
          <Card.Content extra>
            {/* {hard ? <Icon color='red' name={'eye'} /> : null} */}
            <Button onClick={handleHardClick}>
              <Icon name={isDictionary ? 'eye slash' : 'eye'} />
            </Button>
            <Button onClick={handleKnownClick}>
              <Icon name='check circle outline' />
            </Button>
          </Card.Content>
        ) : null}
      </div>
    </Card.Content>
    </div>

  );
  console.log(o);

  return o;
};
