export type IStatOptions = {
  lastLoginDate: number,
  creationDate: number
}

export interface IStatisticsRequestData {
  learnedWords: number,
  optional: IStatOptions
}

