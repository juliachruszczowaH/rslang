/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { AudioQuestionsState, AnswerObject } from '../../../models/WordModel';
import { getDataAudioGame } from '../../../services/WordsService';
import {
  Button,
  Divider,
  Header,
  Icon,
  Item,
  List,
  Loader,
  Modal,
  Statistic,
} from 'semantic-ui-react';
import { CATEGOTY_LINKS } from '../../../constants/linksDataConstants';
import { getRandomNumber, play } from '../../../utils/utils';
import { PAGES_PER_CATEGORY } from '../../../constants/wordsConstants';
import { GAME_TIMER, POINTS, SUM_POINTS } from '../../../constants/gamesConstants';
import AudioCallCard from './AudioCallCard';
import { API_URL } from '../../../services/AppService';

const AudioCallGameField: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<AudioQuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const onGameEnd = (counter: number) => {
    setGameOver(true);
  };


  const checkAnswer = (e: any ) => {

    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].wordTranslate === answer;

      if (correct === true) {
        if (score >= 0 && score < SUM_POINTS[30] ){
          setScore((prev) => prev + POINTS[1]);
        } else if (score >= SUM_POINTS[30] && score < SUM_POINTS[90]) {
          setScore((prev) => prev + POINTS[2]);
        } else if (score >= SUM_POINTS[90] && score < SUM_POINTS[210]) {
          setScore((prev) => prev + POINTS[3]);
        } else {
          setScore((prev) => prev + POINTS[4]);
        }
      }
      const answerObject: AnswerObject = {
        questionID: questions[number].id,
        question: questions[number].word,
        correct,
        answer,
        correctTranslate: questions[number].wordTranslate,
      };


      setUserAnswers((prev) => [...prev, answerObject]);
      const nextQuestion = number + 1;
      if (number === questions.length - 1) {
        onGameEnd(number);
      } else {
        setNumber(nextQuestion);
      }
    }

  };
  useEffect(() => {
    if (questions[number]) {
      play(API_URL + questions[number].audio);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions[number]]);

  const onStartGame = async (level: number) => {
    setLoading(true);
    setGameStart(false);
    const newQuestion = await getDataAudioGame(
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
        size='tiny'
        closeOnEscape={false}
        closeOnDimmerClick={false}
        trigger={<Button>SHOW RESULT</Button>}
        >
          <Modal.Header>{`Total number of answers: ${userAnswers.length} (${
            userAnswers.filter((i) => i.correct).length
          } - are correct)`}</Modal.Header>
          <Modal.Content image scrolling>
            <Modal.Description>
              <Header>Game result</Header>

              <List celled ordered>
                {userAnswers.map((item) => (
                  <List.Item key={item.questionID}>
                    <List.Icon
                      name={item.correct ? 'checkmark' : 'close'}
                      color={item.correct ? 'green' : 'red'}
                    />
                    <List.Content verticalAlign='middle'>
                      <List.Header
                        as={'h3'}
                        color='blue'
                      >{`${item.question}`}</List.Header>
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
                setGameStart(true);
                setGameOver(false);
              }}
            >
              Back to main page
            </Button>
            <Button
              content='Try again'
              labelPosition='right'
              icon='checkmark'
              onClick={() => {
                setOpen(false);
                setGameStart(true);
                setGameOver(false);
              }}
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
              <Statistic.Value>{score}</Statistic.Value>
              <Statistic.Label>Score</Statistic.Label>
            </Statistic>
          </div>
          <AudioCallCard
            questionNumber={number + 1}
            posibleAnswerTranslation={questions[number].wordTranslate}
            questionsWord={questions[number].word}
            onAnswer={checkAnswer}
            answersAudioCall={questions[number].answersAudioCall}
          />
          <Button onClick={()=>{
            setOpen(false);
            setGameStart(true);
            setGameOver(false);
          }}> HOME</Button>
        </div>

      )}
    </div>
  );
};

export default AudioCallGameField;
