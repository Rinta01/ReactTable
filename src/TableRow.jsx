import React, { Component } from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Table.css";
import PropTypes from "prop-types";

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
              <FontAwesomeIcon icon="times" />
            </span>
            <div className="header">
              {firstname} {lastname}{" "}
            </div>
            <div className="content">
              <b>Description</b>
              <textarea defaultValue={description} />
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

TableRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.shape({
      streetAddress: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.string 
    }),
    description: PropTypes.string
  }).isRequired
};

export default TableRow;
