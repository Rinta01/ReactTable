import React, { Component } from 'react';
import './Pagination.css';

class Pagination extends Component {

    handlePageButtons(data = this.props.data){
        let numPages = Math.ceil(data.length/10);
        let btnArr = [];
        for (let i = 1; i <= numPages; i++){
            btnArr.push(
            <button
            key={i}
            type="button" 
            onClick={()=>{this.props.handlePageChange(i)}}
            className={`pageBtn ${ i === this.props.page ? 'activePage' : ''}`}>{i}</button>)
        }
        return btnArr;
    }

    render() {
        return (
            <div className='pageBox'>
            {this.handlePageButtons()}
            </div>
        );
    }
}

export default Pagination;
