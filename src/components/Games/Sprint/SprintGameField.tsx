import React, { useState } from 'react';
import {  QuestionsState, AnswerObject } from '../../../models/WordModel';
import SprintCard from './SprintCard';
import Button from '../../Common/Button';
import { getDataGame } from '../../../services/WordsService';
import { useParams } from 'react-router-dom';
import Timer from './SprintTimer';
import { CATEGOTY_LINKS } from '../../../constants/wordsConstants';



const SprintGameField: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const onGameEnd = (counter: number)=>{
    setGameOver(true);
  };
  const onCheckAnswer = (answerCompare: boolean, compare: boolean) => {
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
      setNumber(number + 1);
      if (number === questions.length - 1){
        onGameEnd(number);
      }
      if (nextQuestion === questions.length) {
        setGameOver(true);
      } else {
        setNumber(nextQuestion);
      }
    }
  };



  const onStartGame = async (level: number) => {
    setLoading(true);
    setGameOver(false);
    const newQuestion = await getDataGame(level, 1);
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    console.log(level);
  };
  console.log(setUserAnswers.name);

  return (
    <div>
      {gameOver || userAnswers.length === questions.length ? (
        <div>
          {CATEGOTY_LINKS.map((item) =>(
            <Button onClick={()=>{onStartGame(item.id);}}>
          {`${item.id + 1} LEVEL`}
        </Button>
          ))}
        </div>


      ) : null}


      {/* {!gameOver ? (

      ) : null} */}


      {loading && <p>Loading questions...</p>}


      {!loading && !gameOver && (
        <div>
<div>
        <p>Timer:<Timer isActive={true} initialTime={60} onCountdownFinish={() => onGameEnd(number)} /></p>
        <p>Score:{score}</p>
      </div>
        <SprintCard
          questionNumber={number + 1}
          posibleAnswerTranslation={questions[number].wordTranslate}
          questionsWord={questions[number].word}
          onAnswer={onCheckAnswer}
          userAnswer={userAnswers[number]}
          answers={questions[number].answers}
        />
        </div>

      )}

    </div>
  );
};




export default SprintGameField;
