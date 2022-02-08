import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
type State = {
  currentGroup: number,
  currentPage: number,
};
const initialState: State = {
  currentGroup: 0,
  currentPage: 0,
};

export const PaginationElement = () => {
  const [activePage, setActivePage] = useState(1);
  const [state, setState] = useState(initialState);
  const { groupId, pageId } = useParams();
  console.log(`PAGINATION: group: ${groupId}; page: ${pageId}`);
  useEffect(() => {
    setState({ currentGroup: groupId ? +groupId : 0, currentPage: pageId ? +pageId : 0 });
    setActivePage(pageId ? +pageId + 1 : 0);
  }, [groupId, pageId]);

  const onChange = () => {
    setState({ currentGroup: groupId ? +groupId : 0, currentPage: pageId ? +pageId : 0 });
    setActivePage(state.currentPage + 1);

  };

  const onItemClick = (e: SyntheticEvent) => {
    const rrr = e.target as HTMLElement;
    console.log(rrr.getAttribute('value'));
    setActivePage(Number(rrr.getAttribute('value')));
    setState({ currentGroup: groupId ? +groupId : 0, currentPage: Number(rrr.getAttribute('value')) });
    window.history.pushState('', '', `/book/${state.currentGroup}/${rrr.getAttribute('value')}`);

  };

  return (<Pagination
    firstItem={null}
    lastItem={null}
    activePage={activePage}
    onPageChange={onChange}
    onClick={onItemClick}
    pointing
    secondary
    totalPages={30}
  />);
};
