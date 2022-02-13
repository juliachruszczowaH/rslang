import React from 'react';
import { IWordData } from '../../models/WordModel';
import { WordCard } from '../WordCard';
import './wordslist.css';

export const WordsList = (words: IWordData[], color: string) => {
  console.log('words');
  console.log(words);
  console.log(color);

  return (
    <div className="words-list">
      <p>Words list</p>

      <ul className="list-group" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
        {words &&
          words.map((word: IWordData) => (
            <li
              className={
                'list-group-item'
              }
              key={word.id}
            >
              {WordCard(word, color)}
            </li>
          ))}
      </ul>
    </div >
  );
};
