import React from 'react';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import './wordcard.css';


export const WordCard = (word: IWordData) => {

    return (
        <div className="card">
            <img src={API_URL + word.image} className="card-img-top" alt={word.word}></img>
            <div className="card-body">
                <p className="card-text">{word.word}</p>
                <p>{word.wordTranslate}</p>
                <p>{word.audio}</p>
                <p>{word.audioMeaning}</p>
                <p>{word.audioExample}</p>
                <p>{word.transcription}</p>
           
                <p>{word.textMeaning}</p>
                <p>{word.textMeaningTranslate}</p>
                <p>{word.textExample}</p>
                <p>{word.textExampleTranslate}</p>
                <p>{word.text}</p>  
            </div> 
        </div>
    )
}