import React, { Component } from 'react';
import '../css/BottomBtns.scss';

class Pagination extends Component {
    handlePageButtons(
        data = this.props.data,
        itemsOnPage = this.props.itemsOnPage
    ) {
        let numPages = Math.ceil(data.length / itemsOnPage);
        // console.log(numPages);
        let btnArr = [];
        for (let i = 1; i <= numPages; i++) {
            btnArr.push(
                <button
                    key={i}
                    type="button"
                    onClick={() => {
                        this.props.handlePageChange(i);
                    }}
                    className={`bottom-btn ${
                        i === this.props.page ? 'active-btn' : ''
                    }`}>
                    {i}
                </button>
            );
        }
        return btnArr;
    }

    render() {
        return (
            <div className="bottom-btn-box">
                <button
                    className="bottom-btn"
                    onClick={() =>
                        this.props.handlePageChange(this.props.page - 1)
                    }>
                    Prev
                </button>
                {this.handlePageButtons()}
                <button
                    className="bottom-btn"
                    onClick={() =>
                        this.props.handlePageChange(this.props.page + 1)
                    }>
                    Next
                </button>
            </div>
        );
    }
}

export default Pagination;
