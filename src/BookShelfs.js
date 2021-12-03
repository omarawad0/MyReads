import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

function BookShelfs({ books, bookShelfChangeHandler }) {
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <BookShelf
            currentShelf='Currently Reading'
            books={books}
            bookShelfChangeHandler={bookShelfChangeHandler}
          />
          <BookShelf
            currentShelf='Want To Read'
            books={books}
            bookShelfChangeHandler={bookShelfChangeHandler}
          />
          <BookShelf
            currentShelf='Read'
            books={books}
            bookShelfChangeHandler={bookShelfChangeHandler}
          />
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>
          <button>Add to book</button>
        </Link>
      </div>
    </div>
  );
}
BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  bookShelfChangeHandler: PropTypes.func.isRequired,
};
export default BookShelfs;
