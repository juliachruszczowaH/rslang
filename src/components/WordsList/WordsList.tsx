import React from 'react';
import { IWordData } from '../../models/WordModel';
import { WordCard } from '../WordCard';
import './wordslist.css';

export const WordsList = (words: IWordData[], color: string, isDictionary = false) => {
  console.log('words');
  console.log(words);
  console.log(color);

  return (
    <div className="words-list" key={'word-list-container'}>
      <ul className="list-group" key={'word-list'} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
        {words &&
          words.map((word: IWordData, index: number) => (
            <li
              className={
                'list-group-item'
              }
              key={index}
            >
              {WordCard(word, color, isDictionary)}
            </li>
          ))}
      </ul>
    </div >
  );
};
