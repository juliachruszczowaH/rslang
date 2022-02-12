import React from 'react';
import { IWordData } from '../../models/WordModel';
import { WordCard } from '../WordCard';
import './wordslist.css';

export const WordsList = (words: IWordData[]) => {
  console.log('words');
  console.log(words);

  return (
    <div className="words-list">
      <p>Words list</p>

      <ul className="list-group" style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'center', gap: '15px' }}>
        {words &&
          words.map((word: IWordData) => (
            <li
              className={
                'list-group-item'
              }
              key={word.id}
            >
              {WordCard(word)}
            </li>
          ))}
      </ul>
    </div >
  );
};
