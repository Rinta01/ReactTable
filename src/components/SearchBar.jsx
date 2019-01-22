import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/SearchBar.scss';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
        };
    }
    handleChangeInput = e => {
        this.setState({
            input: e.target.value,
        });
    };

    handleEnterInput = e => {
        if (e.which === 13) {
            this.props.handleSearch(this.state.input);
        }
    };

    render() {
        return (
            <div className="srch-box">
                <input
                    type="search"
                    name="table-search"
                    id="q"
                    className="srch-input"
                    placeholder="Filter data"
                    onChange={this.handleChangeInput}
                    onKeyPress={this.handleEnterInput}
                />
                <button
                    type="button"
                    className="srch-btn"
                    onClick={() => {
                        this.props.handleSearch(this.state.input);
                    }}>
                    Search
                </button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
