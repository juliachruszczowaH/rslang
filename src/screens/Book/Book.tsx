import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import './book.css';

const Book: React.FC = () => {
    const { groupId,pageId } = useParams();
    console.log(`group: ${groupId}; page: ${pageId}`);
    return (
        <div>
            <div className='book-links'>
            <ul >
                <li>
                    <Link to={'/book/0/0'}>
                        Book1
                    </Link>
                </li>
                <li>
                    <Link to={'/book/1/0'}>
                        Book2
                    </Link>
                </li>
                <li>
                    <Link to={'/book/2/0'}>
                        Book3
                    </Link>
                </li>
                <li>
                    <Link to={'/book/3/0'}>
                        Book4
                    </Link>
                </li>
                <li>
                    <Link to={'/book/4/0'}>
                        Book5
                    </Link>
                </li>
                <li>
                    <Link to={'/book/5/0'}>
                        Book6
                    </Link>
                </li>
            </ul>
        </div>
        <Outlet/>
        </div>
    );
};

export default Book;