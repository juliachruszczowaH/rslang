import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import './wordcard.css';


export const WordCard = (word: IWordData) => {

  function playAudio(){

    const audio = new Audio( API_URL );
    audio.play();

  }

  return (
    <div className="card">
      <img
        src={API_URL + word.image}
        className="card-img-top"
        style={{ width: 150 }}
        alt={word.word}
      ></img>
      <div className="card-body">
        <p className="card-text">{word.word}</p>
        <button onClick={ playAudio }>Add Me

        </button>
      </div>
    </div>
  );
};
