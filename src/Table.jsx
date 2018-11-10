import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import TableRow from './TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Table extends Component {

    render() {
        const headers = ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Salary'];
        const sortIcon = <FontAwesomeIcon icon="sort" className="headerIcon"/>;
        const sortIconUp = <FontAwesomeIcon icon="sort-up" className="headerIcon"/>;
        const sortIconDown = <FontAwesomeIcon icon="sort-down" className="headerIcon"/>;
        const handleSortChange =(col, sort = this.props.sort)=> {
            if(sort['column']===col.toLowerCase())
            {
                if(sort['direction'] === 'asc')
                return sortIconDown
                else if(sort['direction'] === 'desc')
                return sortIconUp
            }
            else
            return sortIcon
        }
        return (
            <div className="container">
                <table>
                    <thead>
                        <tr>
                        {headers.map((h,i)=>
                        {
                            return(
                        <th key={i} onClick={()=>{this.props.handleSort(h)}}>{h}<span>
                        {handleSortChange(h)}</span></th>)})}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((d,i)=>{
                             return (<TableRow key={d.id} data={d}/>)
                    })}
                    </tbody>
                </table>
            </div>
        );
    }

    static propTypes = {
        data: PropTypes.array.isRequired
    };

}
