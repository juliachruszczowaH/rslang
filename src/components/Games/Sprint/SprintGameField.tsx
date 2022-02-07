import React, { useState } from 'react';
import {  QuestionsState } from '../../../models/WordModel';
import SprintCard from './SprintCard';
import Button from '../Common/Button';
import { getDataGame } from '../../../services/WordsService';
import { useParams } from 'react-router-dom';
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const SprintGameField: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const checkAnswer = (answerCompare: boolean) => {
    if (!gameOver) {
      //users answer
      const answer = 'true';
      //сравнение ответа с корректным ответом
      const correct = questions[number].wordTranslate === answer;
      //добавляем скор
      if (correct) setScore((prev) => prev + 100);

      //сохраняем ответы в object
      const answerObject = {
        question: questions[number].word,
        answer: answer,
        correct: correct,
        correctAnswer: questions[number].wordTranslate,
      };

      setUserAnswers((prev) => [...prev, answerObject]);

      const nextQuestion = number + 1;
      if (nextQuestion === questions.length) {
        setGameOver(true);
      } else {
        setNumber(nextQuestion);
      }
      console.log(correct);
      return correct;
    }

    /* передает тру или фолс и сравнивает тру или фолс заложено и еще надо тут же реализовать переключение на след вопрос */
  };
  const { groupId, pageId } = useParams();
  console.log(`Category: group: ${groupId}; page: ${pageId}`);
  const onStartGame = async () => {
    setLoading(true);
    setGameOver(false);
    /* const newQuestion = await fetchQuizData(Difficulty.FIRST_LEVEL); */
    const newQuestion = await getDataGame(1, 1);

    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  console.log(getDataGame(1, 1));

  return (
    <div>
      {gameOver || userAnswers.length === questions.length ? (
        <Button onClick={onStartGame}>
          START/тут будкт выбор уровня сложности
        </Button>
      ) : null}


      {!gameOver ? (
        <div>
          <p>Timer:</p>
          <p>Score:{score}</p>
        </div>
      ) : null}


      {loading && <p>Loading questions...</p>}


      {!loading && !gameOver && (
        <SprintCard
          questionNumber={number + 1}
          /* posibleAnswerTranslation={questions[number].answers[number]} */
          questionsWord={questions[number].word}
          onAnswer={checkAnswer}
          userAnswer={userAnswers[number]}
          answers={questions[number].answers}
        />
      )}

      {/*  {!gameOver &&
      !loading &&
      userAnswers.length === number &&
      number !== questions.length ? (
        <div>
          <Button>True</Button>
          <Button>False</Button>
        </div>
      ) : null} */}
    </div>
  );
};

export default SprintGameField;
