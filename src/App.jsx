import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import SearchBar from './SearchBar'
import {data} from './data';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons';
import orderBy from 'lodash/orderBy';
import Pagination from './Pagination';

library.add(faSort, faSortUp, faSortDown);
const invertSortDirection = {
  asc: "desc",
  desc: 'asc'
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data,
      sort: {
        column: '',
        direction: 'asc'
      },
      page: 1,
      filter: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getDataByPage = this.getDataByPage.bind(this);
  }
  
  render() {
    return (
      <div className="containerApp">
        <SearchBar handleSearch={this.handleSearch}/>
        <Table data={orderBy(
            this.getDataByPage(),
            this.state.sort['column'],
            this.state.sort['direction'])}
            handleSort = {this.handleSort}
            sort = {this.state.sort}/>
            <Pagination
            handlePageChange={this.handlePageChange}
            data={this.state.data}
            page={this.state.page}/>
      </div>
    );  
  }

  handleSearch(str){
    console.log('here')
    console.log(str)
    if(str!==''){
    let dataFiltered = this.state.data.slice().filter(d => d.name.toLowerCase().includes(str.toLowerCase()));
    console.log(dataFiltered)
    this.setState({
      data: dataFiltered
    })
    }
    else{
      this.setState({
        data
      })
    }
  };

  handleSort(column){
    let col = column.toLowerCase();
    this.setState(state => {
      return({
        sort : {
          column : col,
          direction: state.sort.column === col ? invertSortDirection[state.sort.direction] : 'asc'
      }
    })
    })
  }

  handlePageChange(pageNum){
    console.log('here')
    this.setState({
      page: pageNum
    }) 
    console.log(this.state.page)
  }

  getDataByPage(){
    let dataOnPage = this.state.page*10;
    let data = this.state.data.slice(dataOnPage-10,dataOnPage);
    console.log(data);
    return data;
  }
}


export default App;
