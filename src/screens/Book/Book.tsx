import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { MenuItem, Tab } from 'semantic-ui-react';
import { CATEGOTY_LINKS } from '../../constants/linksDataConstants';
import './book.css';

const panes = CATEGOTY_LINKS.map((item) => {
  return {
    menuItem: (<MenuItem as={Link} to={`/book/${item.id}/0`} key={item.title} style={{ backgroundColor: item.color }}>
      {`${item.title}`}
    </MenuItem>),
    render: () => (<Tab.Pane style={{ backgroundColor: item.color }}>{<Outlet />}</Tab.Pane>),
    key: `${item.title}`,
  };
});


const Book: React.FC = () => {
  const { groupId, pageId } = useParams();

  return (
    <div className='book-container'>
      <h3>BOOK</h3>
      <Tab menu={{ pointing: true, fluid: true, vertical: true }} defaultActiveIndex={groupId} panes={panes} key={0} />
    </div>
  );
};

export default Book;
