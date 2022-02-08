import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { createPath } from '../../routing';
import { ROUTE } from '../../types/interfaces';
function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={createPath({ path: ROUTE.HOME })} className="navbar-brand">
                    RS Lang
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={createPath({ path: ROUTE.BOOKS })} className="nav-link">
                            BOOK
                        </Link>

                    </li>
                    <li className="nav-item dropdown">
                        <Link to={"/"} className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            GAMES
                        </Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li>
                                <Link to={"/sprintgame"} className="dropdown-item">
                                    Sprint
                                </Link>
                            </li>
                            <li>
                                <Link to={"/audiocall"} className="dropdown-item">
                                    Audiocall
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link to={createPath({ path: ROUTE.STAT })} className="nav-link">
                            STATISTICS
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={createPath({ path: ROUTE.TEAM })} className="nav-link">
                            TEAM
                        </Link>
                    </li>
                </div>
            </nav>


        </header>
    )
}

export default Header;