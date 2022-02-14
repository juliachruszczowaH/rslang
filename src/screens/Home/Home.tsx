import React from 'react';
import './home.css';
import HomeCardItem from './HomeItem';
import { Statistic } from 'semantic-ui-react';
import book from '../../assets/book.png';
import dictionary from '../../assets/dictionary.png';
import game from '../../assets/game.png';
import stat from '../../assets/statistics.png';

const Home: React.FC = () => {
  return (
     
    <div className="home-content">
      <div className="home-content-box">
        <h1>RS Lang</h1>
        <p className="basic-text">
          Learning English has never been so easy
          Memorizing English words can be fun and challenging.
          Play games, listen to pronunciation, improve your knowledge.
          With our app, learning is a joy.
        </p>
      </div>
      
      <div className="advantages">
          <h3>Advantages</h3>
          <div className="advantages-box">
          <div className="advantages-box-description">
            <img className="icons" src={ book } alt="" />
            <h2>Book</h2>
              <p>
                The electronic textbook consists of six sections.
                Each section has 30 pages of 20 words. The translation of the word, the thematic image,
                as well as the pronunciation of both the word separately and as part of the phrase are presented.
              </p>
            </div>
            <div className="advantages-box-description">
              <img className="icons" src= { dictionary } alt="" />
              <h2>Dictionary</h2>
              <p>
                The dictionary contains lists of studied words,
                words that do not need to be learned, as well as those that cause difficulties.
                The dictionary reflects statistics for each section and student progress.
              </p>
            </div>
        </div>
        <div className="advantages-box">
          <div className="advantages-box-description">
            <img className="icons" src= { game } alt="" />
                <h2>Games</h2>
            <p>
              For learning words and reinforcing memorization,
              the application has 2 games: Sprint, Audio Challenge
              which will help you to "pump" your vocabulary in a playful way.
            </p>

          </div>
          <div className="advantages-box-description">
            <img className="icons" src={ stat } alt="" />
            <h2>Statistic</h2>
            <p>
              All the progress of training can be viewed in statistics,
              where data for the current day, as well as for the entire training period, are presented.
              The information is presented both in the form of a table and graphs, which is very convenient..
            </p>
          </div>
        </div>
      </div>
      <div className="presentation">
        <h2>HERE VIDEO PRESENTATION</h2>
      </div>
    </div>
  );
};

export default Home;






