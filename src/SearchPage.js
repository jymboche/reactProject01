import React from 'react';
import BookShelf from './BookShelf';
import {Dimmer, Loader, Grid, Card, Transition} from 'semantic-ui-react';
import Topbar from './Topbar';
import PropTypes from 'prop-types';

class SearchPage extends React.Component {

    state = {
        loading: false,
        books: false
    };

    onSearch = (query) => {
        if (query.length < 3) {
            return;
        }

        this.setState({loading: true, books: false});
        this.props.onSearch(query, (books) => {
            this.setState({loading: false, books});
        });
    };

    render() {

        let bookShelf;
        if (this.state.books && this.state.books.length > 0) {
            bookShelf = <BookShelf
                    books={this.state.books}
                    onBookMove={this.props.onBookMove}
                    colorize={true} />;
        }

        const searchMessage = !this.state.books? 'Type 3 or more letters to see live search results' : 'No results...';

        return (

            <div className='search-page'>

                <Topbar
                    onSearchFocus={this.onSearchFocus}
                    onSearchBlur={this.onSearchBlur}
                    onSearch={this.onSearch}
                    searchFocused={true}
                />

                <Transition animation='slide down' duration={100} visible={!this.state.books || this.state.books.length === 0 || this.state.loading} mountOnShow>

                    <Grid centered columns={2} style={{marginTop: 50}}>

                        <Grid.Column>
                                <Card fluid>

                                    <Card.Content>
                                        <Card.Header style={{textAlign: 'center'}}>
                                            {searchMessage}
                                        </Card.Header>
                                    </Card.Content>

                                    <Dimmer inverted active={this.state.loading}>
                                        <Loader />
                                    </Dimmer>

                                </Card>

                        </Grid.Column>

                    </Grid>

                </Transition>



                {bookShelf}

            </div>
        )
    }
}

SearchPage.PropTypes = {
    onSearch: PropTypes.func.isRequired,
    onBookMove: PropTypes.func.isRequired
};

export default SearchPage;