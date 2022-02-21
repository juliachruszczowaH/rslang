import axios from 'axios';
import {
  AudioQuestionsState,
  IWordData,
  SprintQuestionsState,
} from '../models/WordModel';
import { getRandomNumber, shuffleArray } from '../utils/utils';
import { API_URL } from './AppService';

export const getWords = async (group = 0, page = 0): Promise<IWordData[]> => {
  const data = await axios.get(`${API_URL}words`, {
    params: { group: group, page: page },
  });

  return data.data;
};

export const getDataSprintGame = async (
  group = 0,
  page = 0,
): Promise<SprintQuestionsState[]> => {
  const data = await getWords(group, page);
  return data.map((wordsData: IWordData) => {
    const randomTranslate = data[getRandomNumber(1, 19)].wordTranslate;
    return {
      ...wordsData,
      answers: shuffleArray([wordsData.wordTranslate, randomTranslate]),
    };
  });
};



export const getDataAudioGame = async (
  group = 0,
  page = 0,
): Promise<AudioQuestionsState[]> => {
  const data = await getWords(group, page);
  return data.map((wordsData: IWordData) => {
    const newArr = data.filter(word => word.wordTranslate !== wordsData.wordTranslate).map(el => el.wordTranslate);

    const wrongWordArr = [];
    const WRONG_WORDS_LENGTH = 5;
    for (let i = 1; i < WRONG_WORDS_LENGTH; i++){
      wrongWordArr.push(newArr.splice(Math.random() * newArr.length, 1)[0]);
    }
    return {
      ...wordsData,
      answersAudioCall:  shuffleArray([
        wordsData.wordTranslate,
        ...wrongWordArr,
      ]),
    };
  });
};


export function randomAnswer(answers: SprintQuestionsState): string {
  return answers.answers[getRandomNumber(0, answers.answers.length - 1)];
}


