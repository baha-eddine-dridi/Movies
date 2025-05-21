import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Movies from './components/Movies';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import MovieDetails from './components/MovieDetails';

import './App.css';

function App() {
  return (
    <div>
      <NavigationBar />
    <Routes>
      <Route path="/" element={<Movies/>} />
      <Route path="/movies" element={<Movies/>} />
      <Route path="/details/:id" element={<MovieDetails/>} />
      <Route path="*" element={<NotFound />} />

    </Routes>
    </div>
  );
}
 
export default App;