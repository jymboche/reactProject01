import React from 'react';
import {Grid, Card, Image, Rating, Divider, Menu, Dropdown, Label} from 'semantic-ui-react';
import categories from './categories';
import Ratings from './Ratings';
import lodash from 'lodash';
import PropTypes from 'prop-types';

class Book extends React.Component {

    render() {

        const {book, colorize} = this.props;

        const {id, title, authors, imageLinks, shelf} = book;

        const rating = Ratings.get(id);

        const menuText = shelf? 'Move to' : 'Add to';

        const color = (colorize && book.shelf)? 'teal' : null;

        return (
            <Grid.Column>

                <Card className='book-card' raised color={color}>

                    <Image src={imageLinks.smallThumbnail} style={ {width: 128, height: 193} } />

                    <Card.Content>

                        <Card.Header>{title}</Card.Header>

                        <Divider fitted />

                        <Card.Meta>
                            {authors? authors.join(', ') : ''}
                        </Card.Meta>

                        <Rating disabled={!shelf} icon='star' size='mini' defaultRating={rating} maxRating={5} onRate={this.onRate}/>

                        { shelf &&
                            <div>
                                <Label as='span' color='teal' size='tiny' content={lodash.startCase(shelf)}/>
                            </div>
                        }

                        <Menu size='mini' fluid widths={1}>
                            <Dropdown text={menuText} simple item>
                                <Dropdown.Menu>
                                    {categories.map( (category) => (
                                        <Dropdown.Item
                                            disabled={category.key === shelf}
                                            key={category.key}
                                            content={category.title}
                                            onClick={ () => this.onMove(category.key) }
                                        />
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu>

                    </Card.Content>


                </Card>

            </Grid.Column>
        )
    }

    onMove = (categoryKey) => {
        this.props.onBookMove(this.props.book, categoryKey);
        return true;
    };

    onRate = (event, data) => {
        Ratings.set(this.props.book.id, data.rating);
    }
}

Book.PropTypes = {
    book: PropTypes.object.isRequired,
    colorize: PropTypes.bool
};

export default Book;