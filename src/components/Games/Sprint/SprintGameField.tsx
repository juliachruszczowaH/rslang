
import React, {  useState } from 'react';
import { AnswerObject, SprintQuestionsState } from '../../../models/WordModel';
import SprintCard from './SprintCard';
import { getDataSprintGame } from '../../../services/WordsService';
import {
  Button,
  Header,
  Icon,
  List,
  Loader,
  Modal,
  Statistic,
} from 'semantic-ui-react';
import Timer from './SprintTimer';
import { CATEGOTY_LINKS } from '../../../constants/linksDataConstants';
import { getRandomNumber, play } from '../../../utils/utils';
import { PAGES_PER_CATEGORY } from '../../../constants/wordsConstants';
import {
  GAME_TIMER,
  POINTS,
  SUM_POINTS,
} from '../../../constants/gamesConstants';
import { NavLink } from 'react-router-dom';
import correctSound from '../../../assets/sound/correct.mp3';
import wrongSound from '../../../assets/sound/wrong.mp3';


const SprintGameField: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<SprintQuestionsState[]>([]);
  const [page, setPage] = useState(29);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [open, setOpen] = useState(false);

  const onGameEnd = (counter: number) => {
    setGameOver(true);
  };
  const onStartGame = async (level: number) => {
    setLoading(true);
    setGameStart(false);
    const randomNumberPage = getRandomNumber(1, PAGES_PER_CATEGORY);
    setPage(randomNumberPage);
    const newQuestion = await getDataSprintGame(level, page);
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
      if (correct === true) {
        play(correctSound);
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
        play(wrongSound);
      }

      setUserAnswers((prev) => [...prev, answerObject]);
      const nextQuestion = number + 1;
      if (number === questions.length - 1) {
        onGameEnd(number);
      } else {
        setNumber(nextQuestion);
      }
    }
  };
  /* useEffect(() => {

    if (questions.length - 1 === number) {
      getDataSprintGame(
        1,
        page - 1,
      ).then((res) => {
        setQuestions(res);

      });
    }

  }, [questions.length, number, page]); */

  return (
    <div>
      {gameStart /* || userAnswers.length === questions.length */ ? (
        <div>
          {CATEGOTY_LINKS.map((item) => (
            <Button
              key={item.id}
              onClick={() => {
                onStartGame(item.id);
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
          size='tiny'
          closeOnEscape={false}
          closeOnDimmerClick={false}
          trigger={<Button>SHOW RESULT</Button>}
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
                    <List.Icon
                      name={item.result ? 'checkmark' : 'close'}
                      color={item.result ? 'green' : 'red'}
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
              <Statistic.Value>
                <Timer
                  isActive={true}
                  initialTime={GAME_TIMER}
                  onCountdownFinish={() => onGameEnd(number)}
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
          <Button
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
export default SprintGameField;
