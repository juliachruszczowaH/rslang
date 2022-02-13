import { FC } from 'react';
import { getRandomNumber } from '../../../utils/utils';
import { AudioCallData, SprintData } from '../../../models/WordModel';
import { Button, Header, Segment, Statistic } from 'semantic-ui-react';


const AudioCallCard: FC<AudioCallData> = ({
  questionsWord,
  answersAudioCall,
  userAnswer,
  onAnswer,
  posibleAnswerTranslation,
  questionNumber,
}) => {
  const randomAnswer = answersAudioCall[getRandomNumber(0, answersAudioCall.length - 1)];

  const compare = () => {
    return posibleAnswerTranslation === randomAnswer;
  };
  console.log(posibleAnswerTranslation);

   const randomAnswers = () => {
      for()
   }

  return (
    <div>
      <Segment raised style={{ width: '70%', margin: '20px auto' }}>
        <Statistic>
          <Statistic.Value>{questionNumber}</Statistic.Value>
          <Statistic.Label>Question</Statistic.Label>
        </Statistic>


        <div>
            {answersAudioCall.map((el) => (
              <Button disabled={userAnswer}>
                {`${el}`}
              </Button>

            ))}
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
