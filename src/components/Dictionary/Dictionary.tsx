import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import { CATEGOTY_LINKS } from '../../constants/linksDataConstants';
import { IWordData } from '../../models/WordModel';
import { getWords } from '../../services/WordsService';
import { WordsList } from '../WordsList';

type State = {
  words: IWordData[],
};
const initialState: State = {
  words: [],
};


export const Dictionary: React.FC = () => {

  return (
    <div>
      <div className="list row">
       DICTIONARY
      </div>
    </div>
  );
};
