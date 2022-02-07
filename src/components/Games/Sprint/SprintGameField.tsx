import React, { FC, useState } from 'react';
import { Button } from '../common/Button';
import { Difficulty, QuestionsState } from "../common/interface";
import { fetchQuizData } from "../common/fetchQuizData";
import SprintCard from "./SprintCard";

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
      const answer = e.currentTarget.value;
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
  const onStartGame = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestion = await fetchQuizData(Difficulty.FIRST_LEVEL);
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  console.log(fetchQuizData(Difficulty.SECOND_LEVEL));

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
