export type UserWordOptions = {
  isNew: boolean
}
export type totalCount = {
  count: boolean
}
export type UserWordData = {
  id: string,
  difficulty: string,
  wordId: string
}
export interface IWordData {
  audio?: string;
  audioExample?: string;
  audioMeaning?: string;
  group?: number;
  id?: string;
  _id?: string;
  image?: string;
  page?: number;
  textExample?: string;
  textExampleTranslate?: string;
  textMeaning?: string;
  textMeaningTranslate?: string;
  transcription?: string;
  word?: string;
  wordTranslate?: string;
  userWord?: UserWordData
}

export interface IUserWordData {
  paginatedResults:IWordData[];
  totaCount: totalCount[];
}

export interface IWordsDataResponse {
  words: IWordData[];
}
export type QuestionsState = IWordData & { answers: string[] };

export interface IWordsDataResponse {
  words: IWordData[];
}

export type AnswerObject = {
  questionID?: string;
  question?: string;
  userAnswer: boolean;
  correct: boolean;
  correctTranslate?: string;
  transcription?: string;
  result: boolean;
};
export type SprintData = {
  questionNumber: number;
  questionsWord: string | undefined;
  answers: string[];
  posibleAnswerTranslation: string | undefined;
  onAnswer: (answerCompare: boolean, compare: boolean) => void;
  userAnswer: AnswerObject;
};
