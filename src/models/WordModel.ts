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
  word?: string;
  wordTranslate?: string;
}
export interface IWordsDataResponse {
  words: IWordData[];
}
export type SprintQuestionsState = IWordData & { answers: string[] };

export type AudioQuestionsState = IWordData & { answersAudioCall: string[] };

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
  onAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;

};
