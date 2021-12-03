import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    currentShelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    bookShelfChangeHandler: PropTypes.func.isRequired,
  };
  trimmedCurrentShelf = () => {
    //remove all white spaces
    const trimmed = this.props.currentShelf.replace(/\s/g, '');
    // decapitalize the first letter
    return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
  };

  booksByShelf = () => {
    return this.props.books.filter(
      (book) => book.shelf === this.trimmedCurrentShelf()
    );
  };

  renderBooksShelf = () => {
    const books = this.booksByShelf();
    return books.map((book) => (
      <Book
        key={book.id}
        book={book}
        bookShelfChangeHandler={this.props.bookShelfChangeHandler}
      />
    ));
  };

  render() {
    return (
      <div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>{this.props.currentShelf}</h2>
          <div className='bookshelf-books'>
            <ol className='books-grid'>{this.renderBooksShelf()}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
