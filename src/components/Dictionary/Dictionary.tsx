import React, { useEffect, useState } from 'react';
import { IUserWordData, IWordData } from '../../models/WordModel';
import { getCurrentToken, getCurrentUserId } from '../../services/AuthService';
import { getHardWords, getUserWords } from '../../services/UserWordsService';
import { WordsList } from '../WordsList';
type State = {
  words: IWordData[],
};

const initialState: State = {
  words: [],
};

export const Dictionary: React.FC = () => {
  const [words, setWords] = useState(initialState);
  const id = getCurrentUserId();
  const token = getCurrentToken();

  useEffect(() => {
    let isMounted = true;
    if (id && token) {
      getHardWords(id, token).then(
        (response) => {
          if (response) {
            console.log('response');
            console.log(response[0]);
            if (isMounted) setWords({ words: response[0].paginatedResults });
          }

        },
        (error: any) => {
          const content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          console.log(content);
        },
      );
    }
    return () => { isMounted = false; };
  }, [id, token]);



  return words.words.length > 0 ? (
    <div key={words.words.length}>
      {WordsList(words.words, 'orange', true) }
    </div>
  ) : (<h3 key={words.words.length}>No hard words in dictionary yet.</h3>);
};
