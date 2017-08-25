import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf.js';
import SearchPage from './SearchPage.js';
import {Route,withRouter} from 'react-router-dom';
import Topbar from './Topbar';
import lodash from 'lodash';
import Ratings from './Ratings';

import './css/App.css'

class App extends React.Component {

  state = {
      searchFocused: false,
      shelves: {}
  };

  componentWillMount(){

      const currentPath = this.props.location.pathname;
      if (currentPath === '/search') {
          this.setState({searchFocused: true});
      } else {
          this.setState({searchFocused: false})
      }


      BooksAPI.getAll().then((data) => {
          this.updateShelves(data);
      });
  }

  updateShelves(data) {
      let shelves = {};
      data.forEach((book) => {
          if (!shelves[book.shelf]) {
              shelves[book.shelf] = {
                  name: book.shelf,
                  shelfFriendlyName: lodash.startCase(book.shelf),
                  books: []
              }
          }

          shelves[book.shelf].books.push(book);
      });

      this.setState({shelves});
  }

  render() {
    return (
      <div className='app'>

          <Route exact path='/' render={(props) => (
              <div>
                  <Topbar
                      onSearchFocus={this.onSearchFocus}
                      onSearchBlur={this.onSearchBlur}
                      onSearch={this.onSearch}
                      searchFocused={this.props.searchFocused || this.props.location.pathname === '/search'}
                  />

                  <div className='list-books' style={{marginTop: 30}}>

                      <div className='list-books-content'>
                          <div>
                              {Object.keys(this.state.shelves).map((shelfKey) => {
                                  const shelf = this.state.shelves[shelfKey];
                                  return (
                                      <BookShelf
                                          title={shelf.shelfFriendlyName}
                                          key={shelfKey}
                                          books={shelf.books}
                                          onBookMove={this.onBookMove} />
                                  )
                              })}
                          </div>
                      </div>
                  </div>

              </div>

          )}/>

          <Route path='/search' render={() => {
              return <SearchPage onBookMove={this.onBookMove} onSearch={this.onSearch} />
          }} />

      </div>
    )
  };

  onSearch = (searchString, onCompletion) => {
      BooksAPI.search(searchString, 20)
          .then((data) => {

              if (data.error) {
                  return onCompletion([]);
              }

              let existingBooks = this.booksById();
              let books = data.map(book => {
                  book.shelf = existingBooks[book.id]? existingBooks[book.id].shelf : null;
                  book.rating = Ratings.get(book.id);
                  return book;
              });

              onCompletion(books);
          });
  };

  booksById() {
      let books = {};
      Object.keys(this.state.shelves).map( shelfKey => {
          this.state.shelves[shelfKey].books.forEach(book => {
              books[book.id] = book;
          });
          return null;
      });

      return books;
  }

  onSearchFocus = () => {
      this.setState({inSearch: true});
      if (this.props.location.pathname !== '/search') {
          this.props.history.push('/search');
      }
  };

  onBookMove = (book, categoryKey) => {
      BooksAPI.update(book, categoryKey)
          .then(() => {
              let shelves = this.state.shelves;
              Object.keys(shelves).map(key => {
                  shelves[key].books = shelves[key].books.filter(bookInstance => {
                      return bookInstance.id !== book.id;
                  });
                  return null;
              });
              book.shelf = categoryKey;
              shelves[categoryKey].books.push(book);
              this.setState({shelves});
          });
  };

}

export default withRouter(App);
