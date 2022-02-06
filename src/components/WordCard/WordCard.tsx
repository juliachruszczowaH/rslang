import React from 'react';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import './wordcard.css';


export const WordCard = (word: IWordData) => {

    return (
        <div className="card">
            <img src={API_URL + word.image} className="card-img-top" style={{ width: 150 }} alt={word.word}></img>
            <div className="card-body">
                <p className="card-text">{word.word}</p>
            </div>
        </div>
    )


}