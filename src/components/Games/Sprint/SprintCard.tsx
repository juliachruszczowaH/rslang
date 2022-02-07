import React, { FC } from 'react';
import Button from '../Common/Button';
import { getRandomNumber } from '../../../utils/utils';
import { AnswerObject } from './SprintGameField';
import { getDataGame, randomAnswer } from '../../../services/WordsService';

export type SprintData = {
  questionNumber: number;
  questionsWord: string;
  answers: string[];
  posibleAnswerTranslation: string;
  onAnswer: (answerCompare: boolean, compare: boolean) => void;
  userAnswer: AnswerObject;
};
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
        /* disabled={userAnswer ? true : false} */
        >
          {randomAnswer}
        </div>
      </div>
      <div>
        <Button
          /* value={answers[randomAnswer]}  */ onClick={() => {
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
/*

   console.log(randomAnswer);
  const compare = () => {
    for (let i = 0; i < answers.length; i++) {
      answers[0] = randomAnswer;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    //console.log(answers[0] === userAnswer.answer ? true : false);

    const answerrrrrr = answers[0];
    return answerrrrrr;
  };
 */
/* console.log(compare()); */
// eslint-disable-next-line @typescript-eslint/no-shadow
