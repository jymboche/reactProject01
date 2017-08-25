import React from 'react';
import Book from './Book';
import {Grid,Header} from "semantic-ui-react";
import PropTypes from 'prop-types';

class BookShelf extends React.Component {

    render() {
        return (
            <div className="bookshelf">
                <Header content={this.props.title} dividing size="large" />
                <Grid columns={3} doubling stackable>
                    {this.props.books.map((book) =>
                        <Book
                            book={book}
                            key={book.id}
                            onBookMove={this.props.onBookMove}
                            colorize={this.props.colorize} />
                    )}
                </Grid>
            </div>
        )
    }

}

BookShelf.PropTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onBookMove: PropTypes.func.isRequired,
    colorize: PropTypes.bool
};

export default BookShelf;