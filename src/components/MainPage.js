import { Link } from "react-router-dom";
import Bookshelf from "./BookShelf";
import PropTypes from "prop-types";

const MainPage = ({
  shelves,
  books,
  onShelfChange,
}) => (
  <div className="list-books">
    <div className="book-shelf">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf, key) => (
            <Bookshelf
              key={key}
              shelfTitle={shelf.title}
              books={
                books &&
                books.filter((book) => book && book.shelf === shelf.shelfName)
              }
              onShelfChange={onShelfChange}
            />
          ))}
        </div>
      </div>
    </div>

    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

export default MainPage;

MainPage.propTypes = {
  books: PropTypes.array,
  onShelfChange: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired,
};
