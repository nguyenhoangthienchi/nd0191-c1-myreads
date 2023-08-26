import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { shelves } from './constants/shelves';
import { useEffect, useState } from 'react';
import * as BooksAPI from './services/BooksAPI';

import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
    });
  }, []);

  const onShelfChange = (shelf, book) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === book.id ? book : b))
      );
    });
  };

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/search'
            element={<SearchPage books={books} onShelfChange={onShelfChange} />}
          />

          <Route
            path='/'
            element={
              <MainPage
                shelves={shelves}
                books={books}
                onShelfChange={onShelfChange}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
