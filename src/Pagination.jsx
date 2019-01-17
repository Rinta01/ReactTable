import React, { Component } from "react";
import "./BottomBtns.css";

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
          className={`bottomBtn ${i === this.props.page ? "activeBtn" : ""}`}
        >
          {i}
        </button>
      );
    }
    return btnArr;
  }

  render() {
    return (
      <div className="bottomBtnBox">
        <button
          className="bottomBtn"
          onClick={() => this.props.handlePageChange(this.props.page-1)}
        >
          Prev
        </button>
        {this.handlePageButtons()}
        <button
          className="bottomBtn"
          onClick={() => this.props.handlePageChange(this.props.page+1)}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
