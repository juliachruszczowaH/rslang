// eslint-disable-next-line @typescript-eslint/naming-convention
export type totalCount = {
  count: boolean
};

export type IUserWordOptionals = {
  [key: string]: number | string | undefined;
  isNew?: string,
  isKnown?: string
  attempts?: number,
  sprintPositive?: number,
  sprintNegative?: number,
  audioPositive?: number,
  audioNegative?: number,
};

export type UserWordData = {
  id?: string,
  difficulty: string,
  wordId?: string,
  optional: IUserWordOptionals
};

export type IUserWordOptionsData = {
  [key: string]: number | string | undefined;
  difficulty?: string,
  isKnown?: string,
  isNew?: string,
  attempts?: number,
  sprintPositive?: number,
  sprintNegative?: number,
  audioPositive?: number,
  audioNegative?: number,
}
export interface IWordData {
  audio?: string;
  audioExample?: string;
  audioMeaning?: string;
  group?: number;
  id?: string;
  _id?: string;
  image?: string;
  page: number;
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
  paginatedResults: IWordData[];
  totaCount: totalCount[];
}

export interface IWordsDataResponse {
  words: IWordData[];
}
export type SprintQuestionsState = IWordData & { answers: string[] };

export type AudioQuestionsState = IWordData & { answersAudioCall: string[] };

export interface IWordsDataResponse {
  words: IWordData[];
}

export type AnswerObject = {
  questionID?: string;
  question?: string;
  userAnswer?: boolean;
  answer?: string;
  correct: boolean;
  correctTranslate?: string;
  transcription?: string;
  result?: boolean;
};
export type SprintData = {
  questionNumber: number;
  questionsWord: string | undefined;
  answers: string[];
  posibleAnswerTranslation: string | undefined;
  onAnswer: (answerCompare: boolean, compare: boolean) => void;
  userAnswer: AnswerObject;
};
export type AudioCallData = {
  questionNumber: number;
  questionsWord: string | undefined;
  answersAudioCall: string[];
  posibleAnswerTranslation: string | undefined;
  onAnswer: (/* e: React.MouseEvent<HTMLButtonElement> | */ answer: string) => void;

};
