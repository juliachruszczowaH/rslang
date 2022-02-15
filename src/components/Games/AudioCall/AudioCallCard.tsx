import { FC } from 'react';
import { getRandomNumber } from '../../../utils/utils';
import { AudioCallData, SprintData } from '../../../models/WordModel';
import { Button, Header, Segment, Statistic } from 'semantic-ui-react';


const AudioCallCard: FC<AudioCallData> = ({
  questionsWord,
  answersAudioCall,
  onAnswer,
  posibleAnswerTranslation,
  questionNumber,
}) => {


  return (
    <div>
      <Segment raised style={{ width: '70%', margin: '20px auto' }}>
        <Statistic>
          <Statistic.Value>{questionNumber}</Statistic.Value>
          <Statistic.Label>Question</Statistic.Label>
        </Statistic>
        <div>
          {questionsWord}
        </div>

        <div>
            {answersAudioCall.map((answer) => (
              <Button value={answer} onClick={onAnswer}>
                {`${answer}`}
              </Button>

            ))}
            {/* <Button value={posibleAnswerTranslation} onClick={onAnswer}>
              {posibleAnswerTranslation}
            </Button> */}
           {/*  <Button onClick={() => {
              onAnswer(false, compare());
            }}>False</Button>
            <Button.Or />
            <Button positive onClick={() => {
              onAnswer(true, compare());
            }}>True</Button> */}

        </div>
      </Segment>
    </div >
  );
};

export default AudioCallCard;
