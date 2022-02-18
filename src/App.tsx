import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import Team from './screens/Team';
import Statistics from './screens/Statistics';
import AudioCallGame from './screens/AudiocallGame';
import SprintGame from './screens/SprintGame';
import Book from './screens/Book';
import { Category } from './components/Category';
import 'semantic-ui-css/semantic.css';
import SprintGameField from './components/Games/Sprint/SprintGameField';

const App: React.FC = () => {
  const location = useLocation();
  return (
    <div className="main-container">
      <Header />

      <div className="main-content-container" style={{ textAlign: 'center' }}>
        <Routes>
          <Route path={'/book'} element={<Book />}>
            <Route path={'/book/:groupId/:pageId'} element={<Category />}></Route>
            <Route path={'/book/dictionary'} element={<Category />}></Route>
          </Route>
          <Route path={'/sprintgame'} element={<SprintGame />}></Route>
          <Route path={'/audiocall'} element={<AudioCallGame />}></Route>
          <Route path={'/statistics'} element={<Statistics />}></Route>
          <Route path={'/team'} element={<Team />}></Route>
          <Route path={'/home'} element={<Home />} />
          <Route path={'/'} element={<Home />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
      {location.pathname !== '/sprintgame' && location.pathname !== '/audiocall' ? <Footer /> : ''}
    </div>
  );
};

export default App;
