import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import { IWordData } from '../../models/WordModel';
import { getWords } from '../../services/WordsService';
import { PaginationElement } from '../Pagination';
import { WordsList } from '../WordsList';

type State = {
  words: IWordData[],
};
const initialState: State = {
  words: [],
};
type PageState = {
  currentGroup: number,
  currentPage: number,
};
const initialPageState: PageState = {
  currentGroup: 0,
  currentPage: 0,
};

export const Category: React.FC = () => {
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [words, setWords] = useState(initialState);
  const [state, setState] = useState(initialPageState);
  const [activePage, setActivePage] = useState(1);
  const { groupId, pageId } = useParams();
  console.log(`PAGINATION: group: ${group}; page: ${page}`);

  useEffect(() => {
    getWords(group, page).then(
      (response) => {
        if (response) {
          console.log(response);
          // setState({ words: response, currentGroup: groupId ? +groupId : 0, currentPage: pageId ? +pageId : 0 });
          setWords({ words: response });
        }

      },
      (error: any) => {
        const content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        console.log(content);
      },
    );
  }, [group, page]);

  useEffect(() => {
    if (groupId && pageId) {
      setGroup(+groupId);
      setPage( +pageId);
      setActivePage(group === +groupId ? +pageId + 1 : 0);
    }
  }, [groupId, pageId, group]);

  const onChange = () => {
    setPage(pageId ? +pageId : 0);
    setGroup(groupId ? +groupId : 0);
  };

  const onItemClick = (e: SyntheticEvent) => {
    const rrr = e.target as HTMLElement;
    console.log(rrr.getAttribute('value'));
    setActivePage(Number(rrr.getAttribute('value')));
    setPage(Number(rrr.getAttribute('value')) - 1);
    setState({ currentGroup: group, currentPage: Number(rrr.getAttribute('value')) - 1 });
    window.history.pushState('', '', `/book/${group}/${Number(rrr.getAttribute('value')) - 1}`);

  };
  return (
    <div>
      <div>
        <Pagination
          firstItem={null}
          lastItem={null}
          activePage={activePage}
          onPageChange={onChange}
          onClick={onItemClick}
          pointing
          secondary
          totalPages={30}
        />
      </div>
      <div className="list row">
        {WordsList(words.words)}
      </div>
    </div>
  );
};
