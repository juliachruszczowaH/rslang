import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import Team from './screens/Team';
import Statistics from './screens/Statistics';
import AudioCallGame from './screens/AudiocallGame';
import SprintGame from './screens/SprintGame';
import Book from './screens/Book';
import Category from './components/Category';

const App: React.FC = () => {
  return (
    <div className="main-container">
      <Header />

      <div className="container mt-3">
        <Routes>
          <Route path={'/book'} element={<Book />}  >
          <Route path={'/book/:groupId/:pageId'} element={<Category />}>
                            
                        </Route>
          </Route>

          <Route path={'/sprintgame'} element={<SprintGame />}  ></Route>
          <Route path={'/audiocall'} element={<AudioCallGame />}  ></Route>
          <Route path={'/statistics'} element={<Statistics />}  ></Route>
          <Route path={'/team'} element={<Team />}  ></Route>
          <Route path={'/home'} element={<Home />} />
          <Route path={'/'} element={<Home />} />
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
