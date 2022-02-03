import React from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { createPath } from '../routing';
import { ROUTE } from '../types/interfaces';
import Words from './wordsPage';

const Book: React.FC = () => {
    const { groupId } = useParams();
    return (
        <div>
            <ul >
                <li>
                    <Link to={createPath({ path: ROUTE.BOOK_GROUP, params: { groupId: '0' } })}>
                        Book1
                    </Link>
                </li>
                <li>
                    <NavLink to={createPath({ path: ROUTE.BOOK_GROUP, params: { groupId: '1' } })}>
                        Book2
                    </NavLink>
                </li>
                <li>
                    <Link to={createPath({ path: ROUTE.BOOK_GROUP, params: { groupId: '2' } })}>
                        Book3
                    </Link>
                </li>
                <li>
                    <Link to={createPath({ path: ROUTE.BOOK_GROUP, params: { groupId: '3' } })}>
                        Book4
                    </Link>
                </li>
                <li>
                    <Link to={createPath({ path: ROUTE.BOOK_GROUP, params: { groupId: '4' } })}>
                        Book5
                    </Link>
                </li>
                <li>
                    <Link to={createPath({ path: ROUTE.BOOK_GROUP, params: { groupId: '5' } })}>
                        Book6
                    </Link>
                </li>
                {/* <li>
                <Link to={createPath({ path: ROUTE.BOOK_GROUP, params: { groupId: '5' } })}>
                    Dictionary
                </Link>
            </li> */}

            </ul>
            <Outlet />
        </div>
    );
};

export default Book;