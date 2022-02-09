import React, { FC } from 'react';
import Button from '../../Common/Button';
import { getRandomNumber } from '../../../utils/utils';
import { SprintData } from '../../../models/WordModel';


const SprintCard: FC<SprintData> = ({
  questionsWord,
  answers,
  onAnswer,
  userAnswer,
  posibleAnswerTranslation,
  questionNumber,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const randomAnswer = answers[getRandomNumber(0, answers.length - 1)];

  const compare = () => {
    return posibleAnswerTranslation === randomAnswer;
  };

  console.log(posibleAnswerTranslation);

  return (
    <div>
      <p>Question: {questionNumber}</p>
      <p>{questionsWord}</p>
      <div>
        <div
        >
          {randomAnswer}
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            onAnswer(true, compare());
          }}
        >
          True
        </Button>
        <Button
          onClick={() => {
            onAnswer(false, compare());
          }}
        >
          False
        </Button>
      </div>
    </div>
  );
};

export default SprintCard;
