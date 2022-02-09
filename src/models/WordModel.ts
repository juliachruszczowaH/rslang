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
export type QuestionsState = IWordData & { answers: string[] };

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
export type SprintData = {
  questionNumber: number;
  questionsWord: string | undefined;
  answers: string[];
  posibleAnswerTranslation: string | undefined;
  onAnswer: (answerCompare: boolean, compare: boolean) => void;
  userAnswer: AnswerObject;
};
