import React, { Component } from 'react';
import './Table.css';

class TableRow extends Component {
    render() {
        let {name, position, office, age, start_date, salary} = this.props.data;
        return (
            <tr >
            <td>{name}</td>
            <td>{position}</td>
            <td>{office}</td>
            <td>{age}</td>
            <td>{start_date}</td>
            <td>{salary}</td>
            </tr>
        );
    }
}

export default TableRow;
