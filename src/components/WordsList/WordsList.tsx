import React from 'react';
import { IWordData } from '../../models/WordModel';
import { WordCard } from '../WordCard';
import './wordslist.css';

export const WordsList = (words: IWordData[]) => {
    console.log('words');
    console.log(words);

    return (
        <div className="col-md-6">
        <p>There's nothing here!</p>

            <ul className="list-group">
                {words &&
                    words.map((word: IWordData) => (
                        <li
                            className={
                                "list-group-item "
                            }
                            key={word.id}
                        >
                            {WordCard(word)}
                        </li>
                    ))}
            </ul>
        </div >
    );
}