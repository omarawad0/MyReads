import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';
import SearchBooks from './SearchBooks';
import BookShelfs from './BookShelfs';
class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  onBookShelfChange = (book) => {
    return (e) => {
      const shelf = e.target.value;

      BooksAPI.update(book, shelf);

      this.setState((prev) => {
        const isBookOnShelf = prev.books.some(
          (prevBook) => prevBook.id === book.id
        );
        // checking if the book is already on my shelf or not
        let updatedBooks = [];
        if (!isBookOnShelf) {
          //if not, i am gonna add a new one
          updatedBooks = [...prev.books, { ...book, shelf: shelf }];
        } else {
          // if it is, i am just gonna change the shelf
          updatedBooks = prev.books.map((prevBook) => {
            return prevBook.id === book.id
              ? { ...prevBook, shelf: shelf }
              : prevBook;
          });
        }

        return {
          books: updatedBooks,
        };
      });
    };
  };

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <BookShelfs
              books={this.state.books}
              bookShelfChangeHandler={this.onBookShelfChange}
            />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchBooks
              myBooks={this.state.books}
              bookShelfChangeHandler={this.onBookShelfChange}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
