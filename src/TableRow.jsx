import React, { Component } from 'react';
import './Table.css';

class TableRow extends Component {
    render() {
        // let {name, position, office, age, start_date, salary} = this.props.data;
        let {id, firstname, lastname, email, phone} = this.props.data;
        return (
            <tr >
            <td>{id}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{email}</td>
            <td>{phone}</td>
            {/* <td>{salary}</td> */}
            </tr>
        );
    }
}

export default TableRow;
