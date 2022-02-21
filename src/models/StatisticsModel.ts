export type IStatOptions = {
  [key: string]: number | IMonthStatData;
  lastLoginDate: number;
  creationDate: number;
};

export interface LongStatData {
  learnedWords: number;
  optional: IStatOptions;
}

export interface IMonthStatData {
  newSprint: number[];
  posSprint: number[];
  seriaSprint: number[];
  newAudio: number[];
  posAudio: number[];
  seriaAudio: number[];
  newTotal: number[];
  knownTotal: number[];
  sprintTotal: number[];
  audioTotal:number[];
};

export type IStatisticsRequestData = {
  [key: string]: number | IMonthStatData;
  learnedWords: number;
  lastLoginDate: number;
  creationDate: number;
};
