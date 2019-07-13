import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route, Link} from 'react-router-dom'
import Booksearch from './Booksearch'
import Bookinfo from './Bookinfo'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  BookshelfChange = (id, value) => {
    this.setState((state) => {
      const bookList = state.books.map((book) => {
        if(book.id == id){
          book.shelf = value
        }
        return book
      })
      return {books: bookList}
    })
    BooksAPI.update({id: id}, value)
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' component={Booksearch}/>
        <Route exact path='/' render={({history}) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                      this.state.books.filter((book) => (
                      book.shelf == 'currentlyReading')).map((book)=> (
                      <li key={book.id}>
                        <Bookinfo book={book} onShelfChange={this.BookshelfChange}/>
                      </li>
                    ))
                    }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                      this.state.books.filter((book) => (
                      book.shelf == 'wantToRead')).map((book)=> (
                      <li key={book.id}>
                        <Bookinfo book={book} onShelfChange={this.BookshelfChange}/>
                      </li>
                    ))
                    }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                      this.state.books.filter((book) => (
                      book.shelf == 'read')).map((book)=> (
                      <li key={book.id}>
                        <Bookinfo book={book} onShelfChange={this.BookshelfChange}/>
                      </li>
                    ))
                    }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to = '/search'
                className='open-search'
              >Add a book
              </Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
