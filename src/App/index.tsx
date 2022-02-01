
import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Routes } from 'react-router-dom';
import WordsList from '../components/wordslist';


class App extends Component {
    render(): React.ReactNode {

        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/home"} className="navbar-brand">
                        RS Lang
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/book"} className="nav-link">
                                BOOK
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/games"} className="nav-link">
                                GAMES
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/book" element={<WordsList/>} />
                    </Routes>
                </div>
            </div>
        );
    }



};
export default App;