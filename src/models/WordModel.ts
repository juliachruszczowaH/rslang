export interface IWordData {
  audio?: string;
  audioExample?: string;
  audioMeaning?: string;
  group?: number;
  id?: string;
  image?: string;
  page?: number;
  textExample?: string;
  textExampleTranslate?: string;
  textMeaning?: string;
  textMeaningTranslate?: string;
  transcription?: string;
  word: string;
  wordTranslate: string;
}
export interface IWordsDataResponse {
  words: IWordData[];
}
export enum Difficulty {
  FIRST_LEVEL,
  SECOND_LEVEL,
  THIRD_LEVEL,
  FOURTH_LEVEL,
  FIFTH_LEVEL,
  SIXTH_LEVEL,
}

export type QuestionsState = IWordData & { answers: string[] };
