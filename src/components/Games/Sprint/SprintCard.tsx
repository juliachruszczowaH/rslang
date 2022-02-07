import React, { FC, useState, useCallback } from 'react';
import Button from '../Common/Button';
import { getRandomNumber } from '../../../utils/utils';
import { AnswerObject } from './SprintGameField';

type Props = {
  questionNumber: number;
  questionsWord: string;
  answers: string[];
  /* posibleAnswerTranslation: string; */
  onAnswer: (answerCompare: boolean) => void;
  userAnswer: AnswerObject;
  correctAnswer?: boolean;
};
const SprintCard: FC</*ISprintData  */ Props> = ({
  questionsWord,
  answers,
  onAnswer,
  /* userAnswer, */
  correctAnswer,
  questionNumber,
}) => {
  const randomAnswer = getRandomNumber(0, answers.length - 1);

  return (
    <div>
      <p>Question: {questionNumber}</p>
      <p>{questionsWord}</p>
      <div>
        <div
        /* disabled={userAnswer ? true : false} */
        >
          {answers[randomAnswer]}
        </div>
      </div>
      <div>
        <Button
          /* value={answers[randomAnswer]}  */ onClick={() => {
      onAnswer(true);
    }}
        >
          True
        </Button>
        <Button
          onClick={() => {
            onAnswer(false);
          }}
        >
          False
        </Button>
      </div>
    </div>
  );
};

export default SprintCard;
