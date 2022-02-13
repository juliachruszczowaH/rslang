/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { QuestionsState, AnswerObject } from '../../../models/WordModel';
import SprintCard from './SprintCard';
import { getDataGame } from '../../../services/WordsService';
import { useParams } from 'react-router-dom';
import { Button, Header, Icon, Loader, Modal, Statistic } from 'semantic-ui-react';
import Timer from './SprintTimer';
import { CATEGOTY_LINKS } from '../../../constants/linksDataConstants';
import { getRandomNumber } from '../../../utils/utils';
import { PAGES_PER_CATEGORY } from '../../../constants/wordsConstants';


const SprintGameField: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [open, setOpen] = useState(false);
  const arr: AnswerObject[][] = [];
  const onGameEnd = (counter: number) => {
    setGameOver(true);
    console.log(arr);
    console.log(userAnswers);
    console.log(setGameOver);
  };

  const checkAnswer = (answerCompare: boolean, compare: boolean) => {
    if (!gameOver) {
      const correct = answerCompare === compare;
      console.log(answerCompare);
      const answer = answerCompare;

      if (correct) setScore((prev) => prev + 100);

      //сохраняем ответы в object
      const answerObject: AnswerObject = {
        questionID: questions[number].id,
        question: questions[number].word,
        userAnswer: answer,
        correct: compare,
        result: correct,
        correctTranslate: questions[number].wordTranslate,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
      const nextQuestion = number + 1;
      setNumber(number + 1);
      if (number === questions.length - 1) {
        onGameEnd(number);
      } else {
        setNumber(nextQuestion);
      }

    }
  };

  arr.push(userAnswers);


  const onStartGame = async (level: number) => {
    setLoading(true);
    setGameStart(false);
    const newQuestion = await getDataGame(
      level,
      getRandomNumber(1, PAGES_PER_CATEGORY),
    );
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  return (
    <div>
      {gameStart /* || userAnswers.length === questions.length */ ? (
        <div>
          {CATEGOTY_LINKS.map((item) => (
            <Button
            key={item.id}
              color='green'
              onClick={() => {
                onStartGame(item.id);
              }}
            >
              {`${item.id + 1} LEVEL`}
            </Button>
          ))}
        </div>
      ) : null}

      {gameOver ? (
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>SHOW RESULT</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>

          <Modal.Description>
            <Header>Default Profile Image</Header>
            {userAnswers.map((item) => (
              <div key={item.questionID}>
                <p>
                {`Question: ${item.question}`}
                </p>
                <p>
                {`Correct answer: ${item.correctTranslate}`}
                </p>
                <p>
                {`Result: ${item.result}`}
                </p>
              </div>
            ))}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => {setOpen(false); setGameStart(true); setGameOver(false);}}>
            На главную
          </Button>
          <Button
            content="Пройти снова"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {setOpen(false); setGameStart(true); setGameOver(false);}}
            positive
          />
        </Modal.Actions>
      </Modal>
      ) : null}

      {<Loader size='large'>Loading</Loader>}

      {!loading && !gameStart && !gameOver && (
        <div>
          <div>
            <Statistic size='small'>
              <Statistic.Value>
                <Timer
                  isActive={true}
                  initialTime={5}
                   onCountdownFinish={()=>onGameEnd(number)}
                />
              </Statistic.Value>
              <Statistic.Label>
                <Icon name='stopwatch' size='big' />
              </Statistic.Label>
            </Statistic>
            <Statistic size='small'>
              <Statistic.Value>{score}</Statistic.Value>
              <Statistic.Label>Score</Statistic.Label>
            </Statistic>
          </div>
          <SprintCard
            questionNumber={number + 1}
            posibleAnswerTranslation={questions[number].wordTranslate}
            questionsWord={questions[number].word}
            onAnswer={checkAnswer}
            userAnswer={userAnswers[number]}
            answers={questions[number].answers}
          />
        </div>
      )}
    </div>
  );
};

export default SprintGameField;
