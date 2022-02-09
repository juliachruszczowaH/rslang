import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Countries from './components/Countries';
import Pagination from './components/Pagination';

function App() {

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setcountriesPerPage] = useState(5);

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true)
      const res = await axios.get('https://rs-lang-be.herokuapp.com/words');
      setCountries(res.data)
      setLoading(false)
    }
    getCountries();
  }, []);

  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;
  const currentCountry = countries.slice(firstCountryIndex, lastCountryIndex);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage( prev => prev + 1);
  const prevPage = () => setCurrentPage( prev => prev - 1);

  return (
    <div className="container mt-5">
      <h1 className="text-primary">Countries</h1>
      <Countries countries={ currentCountry } loading={ loading } />
      <Pagination
        countriesPerPage={ countriesPerPage }
        totalCountries={ countries.length }
        paginate={paginate}
      />
      <button className='btn btn-primary' onClick={ prevPage }>PREV PAGE</button>

      <button ClassName='btn btn-primary' onClick={ nextPage }>NEXT PAGE</button>
    </div>
  );
}

export default App;
