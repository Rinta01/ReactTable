import React, { Component } from 'react';
import '../css/BottomBtns.scss';

class Pagination extends Component {
    handlePageButtons() {
        let btnArr = [];
        if (this.props.numPages > 1) {
            for (let i = 1; i <= this.props.numPages; i++) {
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
        }

        return btnArr;
    }
    render() {
        return (
            <div className="bottom-btn-box">
                {this.props.page > 1 ? (
                    <button
                        className="bottom-btn"
                        onClick={() =>
                            this.props.handlePageChange(this.props.page - 1)
                        }>
                        Prev
                    </button>
                ) : null}
                {this.handlePageButtons()}
                {this.props.numPages > 1 &&
                this.props.page < this.props.numPages ? (
                    <button
                        className="bottom-btn"
                        onClick={() =>
                            this.props.handlePageChange(this.props.page + 1)
                        }>
                        Next
                    </button>
                ) : null}
            </div>
        );
    }
}

export default Pagination;
