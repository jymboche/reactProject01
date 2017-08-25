import React, { Component } from 'react';
import { Menu, Input, Transition} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import debounce from 'debounce';
import PropTypes from 'prop-types';

class Topbar extends Component {

    state = {
        query: '',
        inSearch: false,
        menuClassName: 'topbar'
    };

    onSearch = debounce(()=>{
        return this.props.onSearch(this.state.query);
    }, 300);

    componentDidMount() {
        if (this.props.searchFocused) {
            this.textInput.focus();
            let menuClassName = this.state.menuClassName + ' focused';
            this.setState({menuClassName: menuClassName})
        }
    }

    onQueryChange = (e) => {
        const query = e.target.value;
        this.setState({query});
        this.onSearch();
    };

    handleInputRef = input => {
        this.textInput = input;
    };

    render() {

        return (
            <Menu borderless className={this.state.menuClassName} attached>
                <div className='column-one'>
                    <Menu.Item className='titleSection'>

                        <Transition visible={this.state.menuClassName === 'topbar'} animation='vertical flip' duration={700} >
                            <h1 className='title'>Libros Mios</h1>
                        </Transition>

                        <Transition visible={this.state.menuClassName === 'topbar focused'} animation='vertical flip' duration={200} >
                            <Link to='/' className='close-search'>Close</Link>
                        </Transition>

                    </Menu.Item>
                </div>
                <div className='column-two'>
                    <Menu.Item position='right'>
                        <Input
                            className='icon'
                            icon='search'
                            placeholder='Search...'
                            onFocus={this.props.onSearchFocus}
                            onChange={this.onQueryChange}
                            ref={ this.handleInputRef }
                        />
                    </Menu.Item>
                </div>
            </Menu>
        )
    }
}

Topbar.PropTypes = {
    onSearchFocus: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default Topbar;