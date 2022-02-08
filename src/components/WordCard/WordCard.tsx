import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import './Wordcard.css';
import headphones from '../../images/audio.png';
import light from '../../images/lightbulb.png';

export const WordCard = (word: IWordData) => {
  return (
    <div className="card">
      <img
        src={API_URL + word.image}
        className="card-img-top"
        alt={word.word}
      ></img>
      <ul className="card-body">
        <li className="card-text">{word.word}</li>
        <div className="audio-box">
          <button className="audio-play">Play audio</button><img className="audio" src={headphones} />
        </div>
        <audio className="card-text" src={API_URL + word.audio}></audio>
        <li>{word.textMeaning}</li>
        <li>{word.textExample}</li>
        <li>{word.transcription}</li>
        <li>{word.textExampleTranslate}</li>
        <li>{word.textMeaningTranslate}</li>
        <li>{word.wordTranslate}</li>
        <div className="hard-words audio-box">
          <button className="audio-play">Add Hard word</button>
          <img className="audio" src={ light } alt="light-bulb" />
        </div>
      </ul>

    </div>
  );
};
