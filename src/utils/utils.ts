import { ILoginResponseData } from '../models/UserModel';
import { AnswerObject, IUserWordOptionals, UserWordData } from '../models/WordModel';
import { registerWordGameResult } from '../services/StatisticsService';
import { getUserWordById, initialUserWord, createUserWord, Game } from '../services/UserWordsService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffleArray = (array: any[]) => {
  return array
    .map((i) => [Math.random(), i])
    .sort()
    .map((i) => i[1]);
};
export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * max);
};

export const play = (sounds: string[]) => {
  if (sounds.length > 0) {
    const audio = new Audio(sounds[0]);
    audio.currentTime = 0;
    audio.play();
    sounds.shift();
    audio.addEventListener('ended', function () {
      return play(sounds);
    });
  }

};

export const getStorageData = (key: string): string | null => {
  const data = localStorage.getItem(key);
  if (data) {
    return data;
  }
  return null;
};

export const registerStorageData = (data: ILoginResponseData): void => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('currentId', data.userId);
  localStorage.setItem('currentName', data.name);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('authState', data.message);
};

export const handleAnswers = async (arr: AnswerObject[], game: Game.Sprint | Game.Audiocall) => {
  let count = 0;
  let indexCount = 0;
  let posCount = 0;
  let seriaLength = 0;
  let seriaLengthResult = 0;
  const results = [0, 0, 0];
  console.log(arr);
  const promises = arr.map(async (answer) => {
    indexCount = indexCount + 1;
    if (answer.questionID) {
      if (answer.correct) {
        posCount = posCount + 1;
        seriaLength = seriaLength + 1;
        seriaLengthResult = seriaLengthResult + 1;
      } else {
        seriaLengthResult = seriaLengthResult < seriaLength ? seriaLength : seriaLengthResult;
        seriaLength = 0;
      }
      let word = await getUserWordById(answer.questionID);
      if (!word) {
        const temp = initialUserWord;
        temp.optional.isNew = 'true';
        word = await createUserWord(answer.questionID, temp).then((result) => {
          count = count + 1;
          return result;
        });
      } else {
        if ((word.optional.isNew = 'false')) {
          word.optional.isNew = 'true';
          count = count + 1;
        }
      }
      if (word && word.wordId) {
        return registerWordGameResult(game, word.wordId, !!answer.correct).then(() => {
          results[0] = count;
          results[1] = posCount;
          results[2] = seriaLengthResult;
        });
      }
    }
  });
  await Promise.all(promises);
  return results;
};


export const formatDate = (date: Date): string => {

  const dd = date.getDate();

  const mm = date.toLocaleString('default', { month: 'short' });

  const yy = date.getFullYear();

  const hour = date.getHours();
  const minute = date.getMinutes();


  return `${mm} ${dd}, ${yy}, ${hour}:${minute}`;
};
