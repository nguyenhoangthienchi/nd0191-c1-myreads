
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as BooksAPI from '../services/BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

const SearchPage = ({
  onShelfChange,
  books
}) => {
  const [keyword, setKeyword] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);

  const setShelves = (searchedBooks, allBooks) => {
    return searchedBooks.map((book) => {
      for (let b of allBooks) {
        if (b.id === book.id) return { ...book, shelf: b.shelf };
      }
      return { ...book, shelf: 'none' };
    });
  };

  useEffect(() => {
    if (keyword.length !== 0) {
      BooksAPI.search(keyword)
        .then((searchedBooks) => {
          if (!keyword || searchedBooks.error) {
            return setSearchedBooks([]);
          }
          setSearchedBooks(setShelves(searchedBooks, books));
        })
        .catch((err) => console.log('Encountered error: ', err));
    } else setSearchedBooks([]);
  }, [books, keyword]);

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <NavLink className='close-search' to='/'>
          Close
        </NavLink>
        <div className='search-books-input-wrapper'>
          <input
            type='text'
            placeholder='Search by title, author, or ISBN'
            value={keyword}
            onChange={(e) => {
              e.preventDefault();
              setKeyword(e.target.value);
            }}
          />
        </div>
      </div>

      {keyword && (
        <div className='search-books-results'>
          <ol className='books-grid'>
            {searchedBooks.map((book, key) => (
              <li key={key}>
                <Book
                  book={book}
                  bookTitle={book.title}
                  author={book.authors}
                  bookShelf={book.shelf}
                  imgURL={book.imageLinks && book.imageLinks.smallThumbnail}
                  onShelfChange={onShelfChange}
                  isSearching={true}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

SearchPage.propTypes = {
  onShelfChange: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
};
