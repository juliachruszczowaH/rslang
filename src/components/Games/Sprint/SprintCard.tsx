import { FC, useCallback, useEffect } from 'react';
import { getRandomNumber } from '../../../utils/utils';
import { SprintData } from '../../../models/WordModel';
import { Button, Header, Segment, Statistic } from 'semantic-ui-react';


const SprintCard: FC<SprintData> = ({
  questionsWord,
  answers,
  onAnswer,
  posibleAnswerTranslation,
  questionNumber,
}) => {
  const randomAnswer = answers[getRandomNumber(0, answers.length - 1)];

  const compare = useCallback(() => {
    return posibleAnswerTranslation === randomAnswer;
  }, [posibleAnswerTranslation, randomAnswer]);
  useEffect(() => {
    const keyHandler = (e: any) => {
      if (e.key === 39 || e.which === 39) {
        onAnswer(true, compare());
      } else if (e.key === 37 || e.which === 37) {
        onAnswer(false, compare());
      }
    };
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [compare, onAnswer]);

  return (
    <div>
      <Segment raised style={{ width: '70%', margin: '20px auto' }}>
        <Statistic>
          <Statistic.Value>{questionNumber}</Statistic.Value>
          <Statistic.Label>Question</Statistic.Label>
        </Statistic>

        <Header as='h3' block style={{ width: '50%', margin: '20px auto' }}>
          {questionsWord}
        </Header>

        <Header as='h3' style={{ width: '50%', margin: '20px auto' }}>
          {randomAnswer}
        </Header>

        <div>
          <Button.Group>
            <Button onClick={() => {
              onAnswer(false, compare());
            }}>False</Button>
            <Button.Or />
            <Button positive onClick={() => {
              onAnswer(true, compare());
            }}>True</Button>
          </Button.Group>
        </div>
      </Segment>
    </div >
  );
};

export default SprintCard;
