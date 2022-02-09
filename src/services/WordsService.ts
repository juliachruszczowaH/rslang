import axios from 'axios';
import { IWordData, QuestionsState } from '../models/WordModel';
import { getRandomNumber, shuffleArray } from '../utils/utils';
import { API_URL } from './AppService';

export const getWords = async (group = 0, page = 0): Promise<IWordData[]> => {
  const data = await axios.get(`${API_URL}words`, {
    params: { group: group, page: page },
  });
  console.log(data);
  return data.data;
};

export const getDataGame = async (
  group = 0,
  page = 0,
): Promise<QuestionsState[]> => {
  const data = await getWords(group, page);

  return data.map((wordsData: IWordData) => {
    const randomTranslate = data[getRandomNumber(1, 19)].wordTranslate;
    return {
      ...wordsData,
      answers: shuffleArray([wordsData.wordTranslate, randomTranslate]),
    };
  });
};
export function randomAnswer(answers: QuestionsState): string {
  return answers.answers[getRandomNumber(0, answers.answers.length - 1)];
}
