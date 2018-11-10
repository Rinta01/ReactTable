import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import SearchBar from './SearchBar'
import {data} from './data';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons';
// import orderBy from 'lodash/orderBy';
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
        <Table data={
            this.getDataByPage(this.orderBy(
            this.state.sort['column'],
            this.state.sort['direction']))
            }
            handleSort = {this.handleSort}
            sort = {this.state.sort}/>
            <Pagination
            handlePageChange={this.handlePageChange}
            data={this.state.data}
            page={this.state.page}/>
      </div>
    );  
  }

  orderBy(column, direction, data = this.state.data){

    const stringSortAsc = () =>(data.sort((a,b)=>(a[column].toLowerCase()>b[column].toLowerCase() ? 1 : -1)));

    const stringSortDesc = () => (data.sort((a,b)=>(a[column].toLowerCase()<b[column].toLowerCase() ? 1 : -1)));

    const intSortAsc = () => {
      return data.sort((a,b)=>(a[column] - b[column]))
    }

    const intSortDesc = () => {
      return data.sort((a,b)=>(a[column] - b[column])*-1)
    }

    const dateSortAsc = () => {
      const columnDate = 'start_date';
      return data.sort((a, b) => {
        var dateA = new Date(a[columnDate]), dateB = new Date(b[columnDate]);
        return dateA-dateB;
      });
    }

    const dateSortDesc = () => {
      const columnDate = 'start_date';
      return data.sort((a, b) => {
        var dateA = new Date(a[columnDate]), dateB = new Date(b[columnDate]);
        return ((dateA-dateB)*-1)
      });
    }

    const salarySortAsc = () => {
      return data.sort((a,b)=>{
        a = Number(a[column].substr(1))
        b = Number(b[column].substr(1))
        return (a - b)})
    }
    
    const salarySortDesc = () => {
      return data.sort((a,b)=>{
        a = Number(a[column].substr(1))
        b = Number(b[column].substr(1))
        return (a - b)*-1})
    }

    if(direction==='asc')
    {
      // console.log(column,direction,data)
        switch (column) {
      case 'name': 
      return stringSortAsc();
      case 'position':
      return stringSortAsc();
      case 'office':
      return stringSortAsc();
      case 'age':
      return intSortAsc();
      case 'start date':
      return dateSortAsc();
      case 'salary':
      return salarySortAsc();
      default:
      return data;
    }
  }
  else
  {
    // console.log(column,direction, data)
  switch (column) {
    case 'name': 
    return stringSortDesc();
    case 'position':
    return stringSortDesc();
    case 'office':
    return stringSortDesc();
    case 'age':
    return intSortDesc();
    case 'start date':
    return dateSortDesc();
    case 'salary':
    return salarySortDesc();
    default: return data;
  }
  }
  }

  handleSearch(str){
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
    this.setState({
      page: pageNum
    }) 
    console.log(this.state.page)
  }

  getDataByPage(data = this.state.data){
    let dataOnPage = this.state.page*10;
    let newData = data.slice(dataOnPage-10,dataOnPage);
    console.log(newData);
    return newData;
  }
}


export default App;
