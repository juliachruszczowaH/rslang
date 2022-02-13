import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Icon, MenuItem, Message, Tab } from 'semantic-ui-react';
import { Dictionary } from '../../components/Dictionary';
import { CATEGOTY_LINKS } from '../../constants/linksDataConstants';
import { isAuthenticated } from '../../services/AuthService';
import './book.css';

const defaultPanes = CATEGOTY_LINKS.map((item) => {
  return {
    menuItem: (<MenuItem as={Link} to={`/book/${item.id}/0`} key={item.title} style={{ backgroundColor: item.color }}>
      {`${item.title}`}
    </MenuItem>),
    render: () => (<Tab.Pane style={{ backgroundColor: item.color }} >{<Outlet />}</Tab.Pane>),
    key: `${item.title}`,
  };
});

const dictionaryPane = {
  menuItem: (<MenuItem as={Link} to={'/book/dictionary'} key={'dictionary'} >
    Dictionary
  </MenuItem>),
  render: () => (<Tab.Pane  >{<Dictionary />}</Tab.Pane>),
  key: 'dict pane',
};

const panes = isAuthenticated() ? defaultPanes.concat(dictionaryPane) : defaultPanes;


const Book: React.FC = () => {
  const { groupId, pageId } = useParams();
  const [activeGroup, setActiveGroup] = useState(' ');
  const [isSelected, setIsSelected] = useState(false);
  const location = useLocation();



  useEffect(() => {
    console.log(`${location.pathname}`);
    setActiveGroup(location.pathname === '/book/dictionary' ? '6' : groupId === undefined ? ' ' : groupId);
    setIsSelected((groupId === undefined && location.pathname !== '/book/dictionary') ? false : true);

  }, [groupId, location.pathname]);
  useEffect(() => {

  }, [isSelected]);

  return (
    <div className='book-container'>
      <h3>BOOK</h3>{isSelected ? null :
        <Message info attached='top'>
          <Icon name='help' />
          To start select any category
        </Message>}
      <Tab menu={{ pointing: true, fluid: true, widths: panes.length }} activeIndex={activeGroup} panes={panes} key={0} onTabChange={() => setIsSelected(true)} />
    </div>
  );
};

export default Book;
