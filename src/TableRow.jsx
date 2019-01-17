import React, { Component } from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Table.css";

class TableRow extends Component {
  render() {
    // let {name, position, office, age, start_date, salary} = this.props.data;
    const {
      id,
      firstname,
      lastname,
      email,
      phone,
      address,
      description
    } = this.props.data;
    return (
      <Popup
        trigger={
          <tr>
            <td>{id}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{email}</td>
            <td>{phone}</td>
          </tr>
        }
        modal
        closeOnDocumentClick
        closeOnEscape
      >
        {close => (
          <div className="modal">
            <span className="close" onClick={close}>
              <FontAwesomeIcon icon="times"/>
            </span>
            <div className="header">
              {firstname} {lastname}{" "}
            </div>
            <div className="content">
              <b>Description</b>
              <textarea defaultValue={description}></textarea>
              <b>Address</b>
              <span>{address.streetAddress}</span>
              <b>City</b>
              <span>{address.city} </span>
              <b>State</b>
              <span>{address.state}</span>
              <b>Zip </b>
              <span>{address.zip}</span>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default TableRow;
