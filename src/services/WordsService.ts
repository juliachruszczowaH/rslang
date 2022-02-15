import axios from 'axios';
import { AudioQuestionsState, IWordData, SprintQuestionsState } from '../models/WordModel';
import { getRandomNumber, shuffleArray } from '../utils/utils';
import { API_URL } from './AppService';

export const getWords = async (group = 0, page = 0): Promise<IWordData[]> => {
  const data = await axios.get(`${API_URL}words`, {
    params: { group: group, page: page },
  });
  console.log(data);
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
    }
    ;
  });
};
export const getDataAudioGame = async (
  group = 0,
  page = 0,
) : Promise<AudioQuestionsState[]> => {
  const data = await getWords(group, page);


  return data.map((wordsData: IWordData) => {
    const randomTranslate = () =>  {
      const atherAnswerArray = [];
      for (let i = 0; i < 5; i++){
        if (data[i].wordTranslate !== wordsData.wordTranslate){
          atherAnswerArray.push(data[i].wordTranslate);
          console.log(data[i]);
        }

      }
      console.log(wordsData.wordTranslate);

      return atherAnswerArray;
      /* data[getRandomNumber(1, 19)].wordTranslate */
    };
    //console.log(randomTranslate());
    return {
      ...wordsData,
      answersAudioCall: shuffleArray([ wordsData.wordTranslate, ...randomTranslate()]),
    };
  });
};



//export function
export function randomAnswer(answers: SprintQuestionsState): string {
  return answers.answers[getRandomNumber(0, answers.answers.length - 1)];
}
