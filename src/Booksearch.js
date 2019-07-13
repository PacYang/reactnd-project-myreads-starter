import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookinfo from './Bookinfo'
import { Link } from 'react-router-dom'


class Booksearch extends React.Component {
    state = {
        books: [],
        booksOnShelf: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState((state) => ({
                ...state,
                booksOnShelf: books
            }))
        })
    }

    SearchQueryChange = (query) => {
        BooksAPI.search(query).then((books) => {
            if(query === '' || Array.isArray(books) === false){
                books = []
            }
            let newBooks = books.map((book) => {
                const index = this.state.booksOnShelf.findIndex(s => s.id == book.id)
                if(this.state.booksOnShelf[index]){
                    book.shelf = this.state.booksOnShelf[index].shelf
                }else{
                    book.shelf = 'none'
                }
                return book
            })
            this.setState((state) => ({
                ...state,
                books: newBooks
            }))
        })
    }
    
    BookShelfChange = (id, value) => {
        this.setState((state) => {
            const newBooks = state.books.map((book) => {
                if(book.id == id){
                    book.shelf = value
                }
                return book
                })
            return {
                ...state,
                books: newBooks
            }
        })
        BooksAPI.update({id: id},value)
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        className="close-search"
                        to = '/'>
                    </Link>
                    <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        onChange={(event) => this.SearchQueryChange(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <div className='list-books'>
                        <div className='list-books-content'>
                            {this.state.books.map((book)=> (
                              <div key={book.id}>
                                <Bookinfo book={book} onShelfChange={this.BookShelfChange}/>
                              </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Booksearch