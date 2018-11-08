import React, { Component } from 'react';
import './SearchBar.css';


class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state={
            input: ''
        }
    }
    handleChangeInput = (e) =>{
        this.setState({
            input: e.target.value
        })
    }
    render() {
        return (
            <div className="srchBox">
                <input type="search" name="table-search" id="q" className="srchInput" placeholder="Filter data"
                onChange={this.handleChangeInput}/>
                <button type="button" className="srchBtn" onClick={()=>{this.props.handleSearch(this.state.input)}} >Search</button>
            </div>
        );
    }
}

export default SearchBar;
