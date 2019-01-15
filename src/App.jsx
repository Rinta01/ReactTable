import React, { Component } from "react";
import "./App.css";
import Table from "./Table";
import SearchBar from "./SearchBar";
// import { data } from "./data";
import { fetchSmallData, fetchBigData } from "./fetchData";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSort,
  faSortUp,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";
import Loader from "react-loader-spinner";
import DataBtns from "./DataBtns";

library.add(faSort, faSortUp, faSortDown);
const invertSortDirection = {
  asc: "desc",
  desc: "asc"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sort: {
        column: "",
        direction: "asc"
      },
      page: 1,
      dataSize: "small",
      filter: "",
      loading: true
    };
    this.itemsOnPage = 13;
    this.initData = [];
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getDataByPage = this.getDataByPage.bind(this);
    this.handleDataSize = this.handleDataSize.bind(this);
  }

  async componentDidMount() {
    this.handleDataSize(this.state.dataSize);
  }

  render() {
    return (
      <div className="containerApp">
        <SearchBar handleSearch={this.handleSearch} />
        <Table
          data={this.getDataByPage(
            this.orderBy(
              this.state.sort["column"],
              this.state.sort["direction"]
            )
          )}
          handleSort={this.handleSort}
          sort={this.state.sort}
        />
        {this.state.loading ? (
          <div className="loader">
            <Loader
              type="Oval"
              color="#4CD2FF"
              height="100"
              width="100"
              top="50%"
              left="50%"
            />
          </div>
        ) : null}
        <div className="btnBox">
          <DataBtns
            handleDataSize={this.handleDataSize}
            dataSize={this.state.dataSize}
          />
          <Pagination
            handlePageChange={this.handlePageChange}
            itemsOnPage={this.itemsOnPage}
            data={this.state.data}
            page={this.state.page}
          />
        </div>
      </div>
    );
  }

  orderBy(column, direction, data = this.state.data) {
    if (column.includes(" ")) {
      column = column.replace(" ", "");
    }

    const stringSortAsc = () =>
      data.sort((a, b) =>
        a[column].toLowerCase() > b[column].toLowerCase() ? 1 : -1
      );

    const stringSortDesc = () =>
      data.sort((a, b) =>
        a[column].toLowerCase() < b[column].toLowerCase() ? 1 : -1
      );

    const intSortAsc = () => {
      return data.sort((a, b) => a[column] - b[column]);
    };

    const intSortDesc = () => {
      return data.sort((a, b) => (a[column] - b[column]) * -1);
    };

    const dateSortAsc = () => {
      const columnDate = "start_date";
      return data.sort((a, b) => {
        var dateA = new Date(a[columnDate]),
          dateB = new Date(b[columnDate]);
        return dateA - dateB;
      });
    };

    const dateSortDesc = () => {
      const columnDate = "start_date";
      return data.sort((a, b) => {
        var dateA = new Date(a[columnDate]),
          dateB = new Date(b[columnDate]);
        return (dateA - dateB) * -1;
      });
    };

    const salarySortAsc = () => {
      return data.sort((a, b) => {
        a = Number(a[column].substr(1));
        b = Number(b[column].substr(1));
        return a - b;
      });
    };

    const salarySortDesc = () => {
      return data.sort((a, b) => {
        a = Number(a[column].substr(1));
        b = Number(b[column].substr(1));
        return (a - b) * -1;
      });
    };

    if (direction === "asc") {
      // console.log(column,direction,data)
      switch (column) {
        case "name":
          return stringSortAsc();
        case "position":
          return stringSortAsc();
        case "office":
          return stringSortAsc();
        case "age":
          return intSortAsc();
        case "start date":
          return dateSortAsc();
        case "salary":
          return salarySortAsc();

        case "id":
          return intSortAsc();
        case "firstname":
          return stringSortAsc();
        case "lastname":
          return stringSortAsc();
        case "email":
          return stringSortAsc();
        case "phone":
          return intSortAsc();

        default:
          return data;
      }
    } else {
      // console.log(column,direction, data)
      switch (column) {
        case "name":
          return stringSortDesc();
        case "position":
          return stringSortDesc();
        case "office":
          return stringSortDesc();
        case "age":
          return intSortDesc();
        case "start date":
          return dateSortDesc();
        case "salary":
          return salarySortDesc();

        case "id":
          return intSortDesc();
        case "firstname":
          return stringSortDesc();
        case "lastname":
          return stringSortDesc();
        case "email":
          return stringSortDesc();
        case "phone":
          return intSortDesc();

        default:
          return data;
      }
    }
  }

  handleSearch(str) {
    // console.log(str);
    if (str !== "") {
      console.log(this.initData);
      let dataFiltered = this.initData
        .slice()
        .filter(
          d =>
            d.firstname.toLowerCase().includes(str.toLowerCase()) ||
            d.lastname.toLowerCase().includes(str.toLowerCase())
        );
      console.log(dataFiltered);
      this.setState({
        data: dataFiltered
      });
    } else {
      this.setState({
        data: this.initData
      });
    }
  }

  handleSort(column) {
    let col = column.toLowerCase();
    this.setState(state => {
      return {
        sort: {
          column: col,
          direction:
            state.sort.column === col
              ? invertSortDirection[state.sort.direction]
              : "asc"
        }
      };
    });
  }

  handlePageChange(pageNum) {
    this.setState({
      page: pageNum
    });
    console.log(this.state.page);
  }

  getDataByPage(data = this.state.data) {
    let dataOnPage = this.state.page * this.itemsOnPage;
    console.log(data);
    let newData = data.slice(dataOnPage - this.itemsOnPage, dataOnPage);
    console.log(newData);
    return newData;
  }

  async handleDataSize(size) {
    this.setState({ loading: true });
    if (size === "small") {
      let fetchedData = await fetchSmallData();
      this.initData = fetchedData.slice();
      this.setState({
        data: fetchedData,
        dataSize: "small",
        page: 1,
        loading: false
      });
    } else if (size === "big") {
      let fetchedData = await fetchBigData();
      this.initData = fetchedData.slice();
      this.setState({
        data: fetchedData,
        dataSize: "big",
        page: 1,
        loading: false
      });
    }
  }
}

export default App;
