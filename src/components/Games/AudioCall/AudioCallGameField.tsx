import React, { useEffect, useState } from 'react';
import { AudioQuestionsState, AnswerObject } from '../../../models/WordModel';
import { getDataAudioGame } from '../../../services/WordsService';
import {
  Button,
  Header,
  List,
  Loader,
  Message,
  Modal,
  Statistic,
} from 'semantic-ui-react';
import { CATEGOTY_LINKS } from '../../../constants/linksDataConstants';
import { getRandomNumber, play } from '../../../utils/utils';
import { PAGES_PER_CATEGORY } from '../../../constants/wordsConstants';
import { POINTS, SUM_POINTS } from '../../../constants/gamesConstants';
import AudioCallCard from './AudioCallCard';
import { API_URL } from '../../../services/AppService';
import { NavLink } from 'react-router-dom';
import correctSound from '../../../assets/sound/correct.mp3';
import wrongSound from '../../../assets/sound/wrong.mp3';


const AudioCallGameField: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<AudioQuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [open, setOpen] = useState(false);

  const onGameEnd = (counter: number) => {
    setGameOver(true);
  };


  const checkAnswer = (/* e: any, */ answer: string ) => {

    if (!gameOver) {
      /* const answer = e.currentTarget.value; */
      const correct = questions[number].wordTranslate === answer;

      if (correct === true) {
        play(correctSound);
        if (score >= 0 && score < SUM_POINTS[30] ){
          setScore((prev) => prev + POINTS[1]);
        } else if (score >= SUM_POINTS[30] && score < SUM_POINTS[90]) {
          setScore((prev) => prev + POINTS[2]);
        } else if (score >= SUM_POINTS[90] && score < SUM_POINTS[210]) {
          setScore((prev) => prev + POINTS[3]);
        } else {
          setScore((prev) => prev + POINTS[4]);
        }
      } else {
        play(wrongSound);
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
        setTimeout(() => {setNumber(nextQuestion);}, 1000);
      }
    }

  };



  useEffect(() => {
    if (questions[number]) {
      play(API_URL + questions[number].audio);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions[number]]);


  useEffect(() => {
    if (gameOver || gameStart) return undefined;
    const handleKeysControl = (event: KeyboardEvent) =>{
      if (event.repeat) return;
      if (event.key === '1') checkAnswer(questions[number].answersAudioCall[0]);
      if (event.key === '2') checkAnswer(questions[number].answersAudioCall[1]);
      if (event.key === '3') checkAnswer(questions[number].answersAudioCall[2]);
      if (event.key === '4') checkAnswer(questions[number].answersAudioCall[3]);
      if (event.key === '5') checkAnswer(questions[number].answersAudioCall[4]);
      if (event.key === ' ') play(API_URL + questions[number].audio);
      console.log(questions[number].answersAudioCall[0]);
    };
    window.addEventListener<'keypress'>('keypress', handleKeysControl);
    return () => window.removeEventListener('keypress', handleKeysControl);
  });
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
          <Message info>
            <Message.Header>Welcome to the game "AudioCall"</Message.Header>
            <p>
            The "AudioCall" is a game in which the question is pronounced
            in English and you have to choose one of the 5 proposed translation
            options. Use the mouse and keys from 1 to 5 to select the correct
            answer, to repeat the question, press the space bar.
            </p>
            <p>
              Below you need to select the level of difficulty of the questions.
            </p>
          </Message>
          {CATEGOTY_LINKS.map((item) => (
            <Button
              key={item.id}
              style={{ backgroundColor: item.color }}
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
        trigger={<Button inverted color='red'>SHOW RESULT</Button>}
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
                setGameStart(false);
                setGameOver(false);
              }}
            >
              <NavLink to='/home' >Back to main page</NavLink>

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
          <Button basic color='red'
            onClick={() => {
              setOpen(false);
              setGameStart(false);
              setGameOver(true);
            } }          >
            {' '}
            STOP THE GAME
          </Button>
        </div>

      )}
    </div>
  );
};

export default AudioCallGameField;
