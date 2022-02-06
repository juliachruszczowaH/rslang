import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { CATEGOTY_LINKS } from '../../constants/wordsConstants';
import './book.css';



const Book: React.FC = () => {
  return (
    <div className='book-container'>
      <div className='book-links'>
        <ul >
          {CATEGOTY_LINKS.map((item) => (
            <li>
              <Link to={`/book/${item.id}/0`}>
                {`${item.title}`}
              </Link>
            </li>

          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Book;
