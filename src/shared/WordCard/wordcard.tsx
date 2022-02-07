import { API_URL } from '../../constants/constants';
import React from 'react';
import { IWordData } from 'types/interfaces';
import './wordcard.css';


export const WordCard = (word: IWordData) => {

    return (
        <div className="card">
            <div>
               <img src={API_URL + word.image} className="card-img" alt={word.word}></img>
            </div>
           
            <div className="card-body">
                <p>{word.word}</p>
                <p>{word.audio}</p>
                <p>{word.transcription}</p>
                <p>{word.audioMeaning}</p>
                <p>{word.audioExample}</p>
                <p>{word.textMeaning}</p>
                <p>{word.textExample}</p>
                <p>{word.textExample}</p>
                <p>{word.textExampleTranslate}</p>
                <p>{word.textMeaningTranslate}</p>
                <p>{word.wordTranslate}</p>
                <p>{word.wordTranslate}</p>
                <p>{word.wordTranslate}</p>
                <p>{word.wordTranslate}</p>

            </div>
        </div>
    )


}