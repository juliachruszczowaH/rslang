import React, { useState } from 'react';
import { Button, Message } from 'semantic-ui-react';
import { CATEGOTY_LINKS } from '../../constants/linksDataConstants';
import { PAGES_PER_CATEGORY } from '../../constants/wordsConstants';
import { AnswerObject, AudioQuestionsState } from '../../models/WordModel';
import { getDataAudioGame } from '../../services/WordsService';
import { getRandomNumber } from '../../utils/utils';


export interface IGameData {
  level?: number,
  onStart: () => void,
}

const GameStartScreen: React.FC<IGameData> = ({ onStart }) =>{


  const [gameStart, setGameStart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<AudioQuestionsState[]>([]);
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);

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

<div>
          <Message info>
            <Message.Header>Welcome to the game "AudioCall"</Message.Header>
            <p>
              The "AudioCall" is a game in which the question is pronounced in
              English and you have to choose one of the 5 proposed translation
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

    </div>
  );
};

export default GameStartScreen;
