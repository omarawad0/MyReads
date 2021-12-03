import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
class SearchBooks extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    bookShelfChangeHandler: PropTypes.func.isRequired,
  };

  state = {
    books: [],
  };

  addBooksOnShelfs = (books) => {
    return books.map((book) => {
      // if i have this book on my shelfs, i will add shelf propery to the searched books
      const bookOnShelf = this.props.myBooks.filter(
        (myBook) => myBook.id === book.id
      );
      return bookOnShelf[0] ? bookOnShelf[0] : { ...book, shelf: 'none' };
    });
  };

  onSearchInputChange = (e) => {
    const query = e.target.value;
    if (query) {
      BooksAPI.search(query).then((books) => {
        const newBooks = Array.isArray(books) ? books : [];
        const booksWithShelfs = this.addBooksOnShelfs(newBooks);
        this.setState({ books: booksWithShelfs });
      });
    } else {
      this.setState({ books: [] });
    }
  };

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={this.onSearchInputChange}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.books.map((book) => (
              <Book
                key={book.id}
                book={book}
                bookShelfChangeHandler={this.props.bookShelfChangeHandler}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
