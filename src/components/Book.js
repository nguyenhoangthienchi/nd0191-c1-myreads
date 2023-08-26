import { shelves } from '../constants/shelves';
import PropTypes from 'prop-types';

const Book = ({
  author,
  book,
  bookShelf,
  bookTitle,
  imgURL,
  isSearching,
  onShelfChange,
}) => (
  <div className='book'>
    <div className='book-top'>
      <div
        className='book-cover'
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url('${imgURL}')`,
        }}
      ></div>

      <div className='book-shelf-changer'>
        <select
          onChange={(e) => onShelfChange(e.target.value, book)}
          value={bookShelf}
        >
          {isSearching && (
            <option value='none' disabled>
              Add to...
            </option>
          )}
          {!isSearching && (
            <option value='none' disabled>
              Move to...
            </option>
          )}
          {shelves.map((shelf) => (
            <option key={shelf.id} value={shelf.shelfName}>
              {shelf.title}
            </option>
          ))}
          {!isSearching && <option value='none'>None</option>}
        </select>
      </div>
    </div>
    <div className='book-title'>{bookTitle}</div>
    <div className='book-authors'>{author && author.join(', ')}</div>
  </div>
);

export default Book;

Book.propTypes = {
  author: PropTypes.array,
  book: PropTypes.object.isRequired,
  bookShelf: PropTypes.string,
  bookTitle: PropTypes.string.isRequired,
  imgURL: PropTypes.string,
  isSearching: PropTypes.bool,
  onShelfChange: PropTypes.func.isRequired,
};
