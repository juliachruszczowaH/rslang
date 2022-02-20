import axios from 'axios';
import { ILoginResponseData } from '../models/UserModel';
import { IUserWordData, IUserWordOptionsData, IWordData, UserWordData } from '../models/WordModel';
import { registerStorageData } from '../utils/utils';
import { API_URL } from './AppService';
import { getCurrentUserId, getCurrentToken, getCurrentRefreshToken } from './AuthService';
import { updateLearnedWordsCount } from './StatisticsService';

export enum Difficulty {
  Hard = 'hard',
  Normal = 'normal'
}

export enum Known {
  True = 'true',
  False = 'false'
}

export enum New {
  True = 'true',
  False = 'false'
}

export enum Game {
  Sprint = 'sprint',
  Audiocall = 'audio'
}

export enum UserOptionsFields {
  IsNew = 'isNew',
  IsKnown = 'isKnown',
  Attempts = 'attempts',
  SprintPositive = 'sprintPositive',
  SprintNegative = 'sprintNegative',
  AudioPositive = 'audioPositive',
  AudioNegative = 'audioNegative',
}

export const initialUserWord: UserWordData = {
  difficulty: Difficulty.Normal,
  optional: {
    isNew: New.False,
    isKnown: Known.False,
    attempts: 0,
    sprintPositive: 0,
    sprintNegative: 0,
    audioPositive: 0,
    audioNegative: 0,
  },
};

export const refreshToken = async (): Promise<ILoginResponseData | null> => {
  const id = getCurrentUserId();
  const token = getCurrentRefreshToken();
  return axios.get(encodeURI(`${API_URL}users/${id}/tokens`), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    (response) => {
      if (response) {
        console.log(response);
        registerStorageData(response.data);
        return response.data;
      }
    },
    (error: any) => {
      console.log(error.response.status);
      if (error.response.status === 401) {
        localStorage.clear();

      }
      if (error.response.status === 403) {
        localStorage.clear();
      }
      const content = (error.response && error.response.data) || error.message || error.toString();
      console.log(content);
      return null;
    }
  );
};

export const getUserWords = async (): Promise<UserWordData[]> => {
  const id = getCurrentUserId();
  const token = getCurrentToken();

  const data = await axios.get(`${API_URL}users/${id}/words`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(data);
  return data.data;
};

export const createUserWord = async (wordId: string, wordData: UserWordData): Promise<UserWordData> => {
  const id = getCurrentUserId();
  const token = getCurrentToken();
  const data = await axios.post(`${API_URL}users/${id}/words/${wordId}`, wordData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return data.data;
};

export const getUserWordById = async (wordId: string): Promise<UserWordData | null> => {
  const id = getCurrentUserId();
  const token = getCurrentToken();
  try {
    const data = await axios.get(`${API_URL}users/${id}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
    return data.data;
  } catch (error) {
    return null;
  }
};

export const updateUserWordById = async (wordId: string, wordData: UserWordData): Promise<UserWordData> => {
  const id = getCurrentUserId();
  const token = getCurrentToken();

  const data = await axios.put(`${API_URL}users/${id}/words/${wordId}`, wordData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return data.data;

};

export const createUpdateUserWordById = async (wordId: string, wordData: IUserWordOptionsData): Promise<UserWordData> => {

  const word = await getUserWordById(wordId);
  const oldWordState: UserWordData = word ? word : initialUserWord;
  const newWordState: UserWordData = {
    difficulty: oldWordState.difficulty,
    optional: oldWordState.optional
  };

  Object.keys(wordData).forEach(key => {
    if (key === 'difficulty') {
      if (wordData.difficulty) {
        newWordState.difficulty = wordData.difficulty;
        if (wordData[key] === Difficulty.Hard) {
          newWordState.optional.isKnown = Known.False;
          updateLearnedWordsCount(false);
        }
      }
    } else if (key === 'attempts') {
      // console.log(wordData[key]);


      newWordState.optional.attempts = wordData[key];
    } else if (wordData[key]) {
      newWordState.optional[key] = wordData[key];
      if (wordData[key] === Known.True) {
        newWordState.difficulty = Difficulty.Normal;
        updateLearnedWordsCount(true);
      }

    }

  });
  const result = word ? await updateUserWordById(wordId, newWordState) : await createUserWord(wordId, newWordState);

  return result;
};

export const getHardWords = async (): Promise<IUserWordData[]> => {
  const id = getCurrentUserId();
  const token = getCurrentToken();

  const data = await axios.get(encodeURI(`${API_URL}users/${id}/aggregatedWords?group=&page=&wordsPerPage=${600}`), {
    params: { filter: JSON.stringify({ '$and': [{ 'userWord.difficulty': 'hard' }] }) },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(data);
  return data.data;
};

export const getPaginatedAllUserAggregatedWords = async (group: number, page: number, wordsPerPage = 20): Promise<IUserWordData[] | null> => {
  const id = getCurrentUserId();
  const token = getCurrentToken();
  return axios.get(encodeURI(`${API_URL}users/${id}/aggregatedWords?wordsPerPage=${wordsPerPage}`), {
    params: { filter: JSON.stringify({ '$and': [{ 'group': group, 'page': page }] }) },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    (response) => {
      if (response) {
        console.log(response);
        return response.data;
      }
    },
    (error: any) => {
      console.log(error.response.status);
      if (error.response.status === 401 || error.response.status === 422) {
        refreshToken().then((response) => {
          if (response) {
            getPaginatedAllUserAggregatedWords(group, page);
          } else {
            return null;
          }
        });

      }
      const content = (error.response && error.response.data) || error.message || error.toString();
      console.log(content);
    }
  );
};

export const getNewWords = async (wordsPerPage = 4000): Promise<IUserWordData[] | null> => {
  const id = getCurrentUserId();
  const token = getCurrentToken();
  return axios.get(encodeURI(`${API_URL}users/${id}/aggregatedWords?wordsPerPage=${wordsPerPage}`), {
    params: { filter: JSON.stringify({ '$and': [{ 'userWord.optional.isKnew': 'true' }] }) },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    (response) => {
      if (response) {
        console.log(response);
        return response.data;
      }
    },
    (error: any) => {
      console.log(error.response.status);
      if (error.response.status === 401 || error.response.status === 422) {
        refreshToken().then((response) => {
          if (response) {
            getNewWords();
          } else {
            return null;
          }
        });

      }
      const content = (error.response && error.response.data) || error.message || error.toString();
      console.log(content);
    }
  );
};


