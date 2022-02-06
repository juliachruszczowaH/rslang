
import React from 'react';
import { WordCard } from '../WordCard/wordcard';
import { IWordData } from 'types/interfaces';

export const WordsList = (words: IWordData[]) => {

    return (
        <div className="col-md-6" style={{height:'100%',overflowY:'auto'}}>
            <h4>Words List</h4>

            <ul className="list-group">
                {words &&
                    words.map((word: IWordData) => (
                        <li className={ "list-group-item "}
                            key={ word.id }
                        >
                            {WordCard(word)}
                        </li>
                    ))}
            </ul>
        </div >
    );
}
