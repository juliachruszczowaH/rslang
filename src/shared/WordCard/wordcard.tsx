import { API_URL } from '../../constants/constants';
import React from 'react';
import { IWordData } from '../../types/interfaces';
import './wordcard.css';


export const WordCard = (word: IWordData) => {

    return (
        <div className="card">
            <div>
               <img src={API_URL + word.image} className="card-img" alt={word.word}></img>
            </div>
        </div>
    )


}
