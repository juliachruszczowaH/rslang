import React, { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';
import { IWordData } from '../../models/WordModel';
import { WordCard } from '../WordCard';
import './wordslist.css';

export const WordsList = (words: IWordData[], color: string, isDictionary = false) => {

  return (
    <Card.Group stackable centered>
      {words &&
        words.map((word: IWordData, index: number) =>
          WordCard(word, color, isDictionary),

        )}
    </Card.Group>);
};
