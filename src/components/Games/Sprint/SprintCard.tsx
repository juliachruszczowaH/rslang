import { FC, useCallback, useEffect } from 'react';
import { disabledBtn, getRandomNumber } from '../../../utils/utils';
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
    const handleKeysControl = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === 'ArrowRight') {
        onAnswer(true, compare());
      } else if (event.key === 'ArrowLeft') {
        onAnswer(false, compare());
      }
    };
    window.addEventListener('keydown', handleKeysControl);

    return () => {
      window.removeEventListener('keydown', handleKeysControl);
    };
  }, [compare, onAnswer]);

  return (
    <div>
      <Segment raised style={{ width: '70%', margin: '20px auto' }}>
        <Statistic>
          <Statistic.Value>{questionNumber}</Statistic.Value>
          <Statistic.Label>Question</Statistic.Label>
        </Statistic>

        <Header as="h3" block style={{ width: '50%', margin: '20px auto' }}>
          {questionsWord}
        </Header>

        <Header as="h3" style={{ width: '50%', margin: '20px auto' }}>
          {randomAnswer}
        </Header>

        <div>
          <Button.Group>
            <Button
            className='button__game--audio'
              onClick={() => {
                onAnswer(false, compare());
                disabledBtn();
              }}
            >
              False
            </Button>
            <Button.Or />
            <Button
            className='button__game--audio'
              positive
              onClick={() => {
                onAnswer(true, compare());
                disabledBtn();
              }}
            >
              True
            </Button>
          </Button.Group>
        </div>
      </Segment>
    </div>
  );
};

export default SprintCard;
