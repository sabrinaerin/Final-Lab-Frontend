// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/search/:query" element={<ArticleList />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
