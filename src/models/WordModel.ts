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
export type QuestionsState = IWordData & { answers: string[] };
