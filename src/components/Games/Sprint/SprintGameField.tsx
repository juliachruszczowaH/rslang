import React, { useState } from 'react';
import { QuestionsState, AnswerObject } from '../../../models/WordModel';
import SprintCard from './SprintCard';
import { getDataGame } from '../../../services/WordsService';
import { useParams } from 'react-router-dom';
import { Button, Icon, Loader, Statistic } from 'semantic-ui-react';



const SprintGameField: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const checkAnswer = (answerCompare: boolean, compare: boolean) => {
    if (!gameOver) {
      const correct = answerCompare === compare;
      const answer = '';

      if (correct) setScore((prev) => prev + 100);

      //сохраняем ответы в object
      const answerObject = {
        question: questions[number].word,
        answer: answer,
        correct: correct,
        correctAnswer: questions[number].wordTranslate,
      };

      /* setUserAnswers((prev) => [...prev, answerObject]); */

      const nextQuestion = number + 1;
      if (nextQuestion === questions.length) {
        setGameOver(true);
      } else {
        setNumber(nextQuestion);
      }
    }
  };

  const onStartGame = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestion = await getDataGame(1, 1);
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };


  return (
    <div>
      {gameOver || userAnswers.length === questions.length ? (
        <Button onClick={onStartGame}>
          START/тут будкт выбор уровня сложности
        </Button>
      ) : null}


      {!gameOver ? (
        <div>
          <Statistic size='small'>
            <Statistic.Value>
              00:00
            </Statistic.Value>
            <Statistic.Label><Icon name='stopwatch' size='big' /></Statistic.Label>
          </Statistic>
          <Statistic size='small'>
            <Statistic.Value>
              {score}
            </Statistic.Value>
            <Statistic.Label>Score</Statistic.Label>
          </Statistic>
        </div>
      ) : null}


      {
        <Loader size='large'>Loading</Loader>
      }


      {!loading && !gameOver && (
        <SprintCard
          questionNumber={number + 1}
          posibleAnswerTranslation={questions[number].wordTranslate}
          questionsWord={questions[number].word}
          onAnswer={checkAnswer}
          userAnswer={userAnswers[number]}
          answers={questions[number].answers}
        />
      )}

    </div>
  );
};


export default SprintGameField;
