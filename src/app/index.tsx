
import React from 'react';
import "bootstrap/dist/js/bootstrap.bundle"
import { Route, Routes } from 'react-router-dom';
import WordsPage from '../pages/wordsPage';
import Header from '../shared/Header/header';
import Footer from '../shared/Footer/footer';
import Home from '../pages/home';
import Statistics from '../pages/statistics';
import Team from '../pages/team';
import Words from '../pages/wordsPage';
import Book from '../pages/book';
import {ROUTE} from '../types/interfaces'
import { WordsList } from 'shared/WordsList/wordslist';

const App: React.FC = () => {
    return (
        <div>
            <Header />

            <div className="container mt-3">
                <Routes>
                    <Route path={ROUTE.BOOKS} element={<Book />}  >
                        <Route path={ROUTE.BOOK_GROUP} element={<Words />}>
                        <Route path={ROUTE.GROUP_PAGE} element={<Words />}/>
                         </Route>
                    </Route>

                    <Route path={ROUTE.GAMES}>
                        <Route path={":id"} element={<Words />} />
                    </Route>
                    <Route path={ROUTE.STAT} element={<Statistics />}  ></Route>
                    <Route path={ROUTE.TEAM} element={<Team />}  ></Route>
                    <Route path={ROUTE.HOME} element={<Home />} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        } />
                </Routes>

            </div>
            <Footer />
        </div>
    );
}



export default App;