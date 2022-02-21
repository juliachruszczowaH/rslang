import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Icon, MenuItem, Message, Tab } from 'semantic-ui-react';
import { CATEGOTY_LINKS } from '../../constants/linksDataConstants';
import { isAuthenticated } from '../../services/AuthService';
import style from './book.module.css';

const defaultPanes = CATEGOTY_LINKS.map((item) => {
  return {
    menuItem: (
      <MenuItem as={Link} to={`/book/${item.id}/0`} key={item.title} style={{ backgroundColor: item.color }}>
        {`${item.title}`}
      </MenuItem>
    ),
    render: () => (
      <Tab.Pane style={{ hegiht: '63vh', backgroundColor: item.color, opacity: '0.92' }} key={`${item.title}pane`}>
        {<Outlet />}
      </Tab.Pane>
    ),
  };
});

const dictionaryPane = {
  menuItem: (
    <MenuItem as={Link} to={'/book/dictionary'} style={{ backgroundColor: '#f4defc' }} key={'dictionary'}>
      Dictionary
    </MenuItem>
  ),
  render: () => (
    <Tab.Pane style={{ height: '71vh', backgroundColor: '#f4defc', opacity: '0.90' }} key={'dictpane'}>
      {<Outlet />}
    </Tab.Pane>
  ),
};

const panes = isAuthenticated() ? defaultPanes.concat(dictionaryPane) : defaultPanes;

const Book: React.FC = () => {
  const { groupId, pageId } = useParams();
  const [activeGroup, setActiveGroup] = useState(' ');
  const [isSelected, setIsSelected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActiveGroup(location.pathname === '/book/dictionary' ? '6' : groupId === undefined ? ' ' : groupId);
    setIsSelected(groupId === undefined && location.pathname !== '/book/dictionary' ? false : true);
  }, [groupId, location.pathname]);
  useEffect(() => {}, [isSelected]);

  return (
    <div className={style.book__wrapper}>
      <div className={style.book__container}>
        <h1  className={style.book__title}>BOOK</h1>
        {isSelected ? null : (
          <Message info attached="top">
            <Icon name="help" />
            To start select any category
          </Message>
        )}
        <Tab menu={{ pointing: true, widths: panes.length }} activeIndex={activeGroup} panes={panes} onTabChange={() => setIsSelected(true)} />
      </div>
    </div>
  );
};

export default Book;
