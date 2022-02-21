/* eslint-disable @typescript-eslint/no-shadow */

import React, { useEffect, useState } from 'react';
import { AnswerObject, SprintQuestionsState } from '../../../models/WordModel';
import SprintCard from './SprintCard';
import { getDataSprintGame } from '../../../services/WordsService';
import { Button, Dimmer, Header, Icon, List, Loader, Message, Modal, Statistic } from 'semantic-ui-react';
import Timer from './SprintTimer';
import { CATEGOTY_LINKS } from '../../../constants/linksDataConstants';
import { getRandomNumber, handleAnswers, play } from '../../../utils/utils';
import { PAGES_PER_CATEGORY } from '../../../constants/wordsConstants';
import { GAME_TIMER, POINTS, SUM_POINTS } from '../../../constants/gamesConstants';
import { NavLink } from 'react-router-dom';
import correctSound from '../../../assets/sound/correct.mp3';
import wrongSound from '../../../assets/sound/wrong.mp3';
import { Game } from '../../../services/UserWordsService';
import { updateNewWordsCount } from '../../../services/StatisticsService';

const SprintGameField: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const group = queryParams.get('group');
  const page = queryParams.get('page');
  const [updated, setUpdated] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [gameStartFromBook, setGameStartFromBook] = useState(isBook(group, page));
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [gameStartFromMenu, setGameStartFromMenu] = useState(isMenu(group, page));

  function isMenu(group: string | null, page: string | null) {
    if (group === null && page === null) {
      return true;
    } else {
      return false;
    }
  }
  function isBook(group: string | null, page: string | null) {
    if (group !== null && page !== null) {
      return true;
    } else {
      return false;
    }
  }

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<SprintQuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [open, setOpen] = useState(false);

  const onGameEnd = (counter: number) => {
    setUpdated(false);
    handleAnswers(userAnswers, Game.Sprint).then((i) => {
      updateNewWordsCount(Game.Sprint, i[0], i[1], i[2]);
      setUpdated(true);
      setGameOver(true);
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onStartGame = async (group: string | null, page: string | null) => {
    setLoading(true);
    setGameStartFromMenu(false);
    setGameStartFromBook(false);
    const newQuestion = await getDataSprintGame(Number(group), Number(page));
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = async (answerCompare: boolean, compare: boolean) => {
    if (!gameOver) {
      const correct = answerCompare === compare;
      const answer = answerCompare;

      const answerObject: AnswerObject = {
        questionID: questions[number].id,
        question: questions[number].word,
        userAnswer: answer,
        correct: compare,
        result: correct,
        correctTranslate: questions[number].wordTranslate,
      };
      setUserAnswers((prev) => [...prev, answerObject]);

      if (correct === true) {
        play([correctSound]);
        if (score >= 0 && score < SUM_POINTS[30]) {
          setScore((prev) => prev + POINTS[1]);
        } else if (score >= SUM_POINTS[30] && score < SUM_POINTS[90]) {
          setScore((prev) => prev + POINTS[2]);
        } else if (score >= SUM_POINTS[90] && score < SUM_POINTS[210]) {
          setScore((prev) => prev + POINTS[3]);
        } else {
          setScore((prev) => prev + POINTS[4]);
        }
      } else {
        play([wrongSound]);
      }


      const nextQuestion = number + 1;
      if (number === questions.length - 1) {
        onGameEnd(number);
      } else {
        setNumber(nextQuestion);
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  return updated ? (
    <div>
      {gameStartFromBook && !gameStartFromMenu ? (
        <div>
          <Message info>
            <Message.Header>Welcome to the game "Sprint"</Message.Header>
            <p>
              Sprint is a game of speed where you have 20 questions and 60 seconds to complete the game. Use the mouse and the right or left key to
              select the correct answer.
            </p>
            <p>Click on START to start the game.</p>
          </Message>

          <Button
            onClick={() => {
              onStartGame(group, page);
            }}
          >
            START
          </Button>
        </div>
      ) : null}
      {gameStartFromMenu && !gameStartFromBook ? (
        <div>
          <Message info>
            <Message.Header>Welcome to the game "Sprint"</Message.Header>
            <p>
              Sprint is a game of speed where you have 20 questions and 60 seconds to complete the game. Use the mouse and the right or left key to
              select the correct answer.
            </p>
            <p>Below you need to select the level of difficulty of the questions.</p>
          </Message>

          {CATEGOTY_LINKS.map((item) => (
            <Button
              key={item.id}
              onClick={() => {
                onStartGame(item.id.toString(), getRandomNumber(1, PAGES_PER_CATEGORY).toString());
              }}
              style={{ backgroundColor: item.color }}
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
          size="tiny"
          closeOnEscape={false}
          closeOnDimmerClick={false}
          trigger={
            <Button inverted color="red">
              SHOW RESULT
            </Button>
          }
        >
          <Modal.Header>{`Total number of answers: ${userAnswers.length} (${
            userAnswers.filter((i) => i.result).length
          } - are correct)`}</Modal.Header>
          <Modal.Content image scrolling>
            <Modal.Description>
              <Header>Game result</Header>
              <List celled ordered>
                {userAnswers.map((item) => (
                  <List.Item key={item.questionID}>
                    <List.Icon name={item.result ? 'checkmark' : 'close'} color={item.result ? 'green' : 'red'} />
                    <List.Content verticalAlign="middle">
                      <List.Header as={'h3'} color="blue">{`${item.question}`}</List.Header>
                      <List.Description>{`${item.correctTranslate}`}</List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              onClick={() => {
                setOpen(false);
                setGameStartFromMenu(false);
                setGameStartFromBook(false);
                setGameOver(false);
              }}
            >
              <NavLink to="/home">Back to main page</NavLink>
            </Button>
            <Button
              content="Try again"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen(false);
                setGameStartFromMenu(true);
                setGameStartFromBook(false);
                setGameOver(false);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
      ) : null}

      {<Loader size="large">Loading</Loader>}

      {!loading && !gameStartFromMenu && !gameStartFromBook && !gameOver && (
        <div>
          <div>
            <Statistic size="small">
              <Statistic.Value>
                <Timer isActive={true} initialTime={GAME_TIMER} onCountdownFinish={() => onGameEnd(number)} />
              </Statistic.Value>
              <Statistic.Label>
                <Icon name="stopwatch" size="big" />
              </Statistic.Label>
            </Statistic>
            <Statistic size="small">
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
          <Button
            basic
            color="red"
            onClick={() => {
              setOpen(false);
              setGameStartFromMenu(false);
              setGameStartFromBook(false);
              setGameOver(true);
            }}
          >
            {' '}
            STOP THE GAME
          </Button>
        </div>
      )}
    </div>
  ) : (
    <Dimmer active>
      <Loader size="large" content="Please, wait. We are writing game results..." />
    </Dimmer>
  );
};
export default SprintGameField;
