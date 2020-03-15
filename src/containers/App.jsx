import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSort,
    faSortDown,
    faSortUp,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import DataBtns from '../components/DataBtns';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import data from '../data/data';
import { fetchBigData, fetchSmallData } from '../data/fetchData';
import '../css/App.scss';

library.add(faSort, faSortUp, faSortDown, faTimes);
const invertSortDirection = {
    asc: 'desc',
    desc: 'asc',
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sort: {
                column: '',
                direction: 'asc',
            },
            page: 1,
            dataSize: 'small',
            filter: '',
            loading: true,
        };
        this.itemsOnPage = 15;
        this.initData = [];
        this.numPages = 0;
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
            <div className="container">
                <SearchBar handleSearch={this.handleSearch} />
                <Table
                    data={this.getDataByPage(
                        this.orderBy(
                            this.state.sort['column'],
                            this.state.sort['direction']
                        )
                    )}
                    handleSort={this.handleSort}
                    sort={this.state.sort}
                />
                {this.state.loading ? (
                    <div className="loader">
                        <Loader
                            type="ThreeDots"
                            color="rgb(186, 91, 141)"
                            height="100"
                            width="100"
                        />
                    </div>
                ) : null}
                <div className="btn-box">
                    <DataBtns
                        handleDataSize={this.handleDataSize}
                        dataSize={this.state.dataSize}
                    />
                    <Pagination
                        handlePageChange={this.handlePageChange}
                        itemsOnPage={this.itemsOnPage}
                        data={this.state.data}
                        page={this.state.page}
                        numPages={this.numPages}
                    />
                </div>
            </div>
        );
    }

    orderBy(column, direction, data = this.state.data) {
        if (column.includes(' ')) {
            column = column.replace(' ', '');
        }

        const stringSort = () => {
            switch (direction) {
                case 'asc':
                    return data.sort((a, b) =>
                        a[column].toLowerCase() > b[column].toLowerCase()
                            ? 1
                            : -1
                    );
                case 'desc':
                    return data.sort((a, b) =>
                        a[column].toLowerCase() < b[column].toLowerCase()
                            ? 1
                            : -1
                    );
                default:
                    return data;
            }
        };

        const intSort = () => {
            switch (direction) {
                case 'asc':
                    return data.sort((a, b) => a[column] - b[column]);
                case 'desc':
                    return data.sort((a, b) => (a[column] - b[column]) * -1);
                default:
                    return data;
            }
        };

        const dateSort = () => {
            const columnDate = 'start_date';
            switch (direction) {
                case 'asc':
                    return data.sort((a, b) => {
                        var dateA = new Date(a[columnDate]),
                            dateB = new Date(b[columnDate]);
                        return dateA - dateB;
                    });
                case 'desc':
                    return data.sort((a, b) => {
                        var dateA = new Date(a[columnDate]),
                            dateB = new Date(b[columnDate]);
                        return (dateA - dateB) * -1;
                    });
                default:
                    return data;
            }
        };

        const salarySort = () => {
            switch (direction) {
                case 'asc':
                    return data.sort((a, b) => {
                        a = Number(a[column].substr(1));
                        b = Number(b[column].substr(1));
                        return a - b;
                    });
                case 'desc':
                    return data.sort((a, b) => {
                        a = Number(a[column].substr(1));
                        b = Number(b[column].substr(1));
                        return (a - b) * -1;
                    });
                default:
                    return data;
            }
        };

        switch (column) {
            case 'name':
                return stringSort();
            case 'position':
                return stringSort();
            case 'office':
                return stringSort();
            case 'age':
                return intSort();
            case 'start date':
                return dateSort();
            case 'salary':
                return salarySort();
            case 'id':
                return intSort();
            case 'firstname':
                return stringSort();
            case 'lastname':
                return stringSort();
            case 'email':
                return stringSort();
            case 'phone':
                return intSort();
            default:
                return data;
        }
    }

    handleSearch(str) {
        if (str !== '') {
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
                data: dataFiltered,
                page: 1,
            });
        } else {
            this.setState({
                data: this.initData,
                page: 1,
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
                            : 'asc',
                },
            };
        });
    }

    handlePageChange(pageNum) {
        if (pageNum >= 1 && pageNum <= this.numPages) {
            this.setState({
                page: pageNum,
            });
        }
    }

    getDataByPage(data = this.state.data) {
        let dataOnPage = this.state.page * this.itemsOnPage;
        let newData = data.slice(dataOnPage - this.itemsOnPage, dataOnPage);
        return newData;
    }

    async handleDataSize(size) {
        this.setState({ loading: true });
        let fetchedData;
        let dataSize;
        if (size === 'small') {
            fetchedData = (await fetchSmallData()) || data;
            this.initData = fetchedData.slice(0, 4);
            dataSize = 'small';
        } else if (size === 'big') {
            fetchedData = (await fetchBigData()) || data;
            this.initData = fetchedData.slice();
            dataSize = 'big';
        }
        this.numPages = Math.ceil(this.initData.length / this.itemsOnPage);
        this.setState({
            data: this.initData,
            dataSize,
            page: 1,
            loading: false,
        });
    }
}

export default App;
