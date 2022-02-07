import { getRandomNumber, shuffleArray } from '../../../utils/utils';
import { IWordData } from '../../../models/WordModel';
import { Difficulty, QuestionsState } from '../../../models/WordModel';

export const fetchQuizData = async (
  difficulty: Difficulty,
): Promise<QuestionsState[]> => {
  const endpoint = `https://rs-lang-be.herokuapp.com/words?group=${difficulty}&page=0`;
  const data = await (await fetch(endpoint)).json();

  return data.map((wordsData: IWordData) => {
    const randomTranslate = data[getRandomNumber(1, 19)].wordTranslate;
    return {
      ...wordsData,
      answers: shuffleArray([wordsData.wordTranslate, randomTranslate]),
      //correctAnswer: [wordsData.wordTranslate]
      /* [ wordsData.word, wordsData.wordTranslate] */
    };
  });
};
