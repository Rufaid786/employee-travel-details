import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Tablecomponent.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Tablecomponent({
  filteredeemployeevalues,
  settingtheupdatevalue,
  deleteEmployee,
  getallEmployees,
  filterfunction,
}) {
  const [bookingidtodelete, setBookingidtodelete] = useState("");
  const [show, setShow] = useState(false);
  const [empidfilterafterdelete, setEmpidfilterafterdelete] = useState("");
  const handleClose = () => {
    setShow(false);
    getallEmployees();
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Alert!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center" style={{ fontSize: "18px" }}>
          Are you sure you want to delete this record?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              deleteEmployee(bookingidtodelete, empidfilterafterdelete);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="row p-3">
        <h4>Employee Travel Details</h4>
        <table
          class="table table-bordered table-striped hover responsive"
          style={{ background: "white" }}
        >
          <thead>
            <tr>
              <th scope="col">Account</th>
              <th scope="col">Project/Contract</th>
              <th scope="col">Emp ID</th>
              <th scope="col">Emp Name</th>
              <th scope="col">Purpose of Travel</th>
              <th scope="col">Travel From</th>
              <th scope="col">Travel To</th>
              <th scope="col">Date From</th>
              <th scope="col">Date To</th>
              <th scope="col">Flight</th>
              <th scope="col">Hotac</th>
              <th scope="col">Perdium</th>
              <th scope="col">Other Cost</th>
              <th scope="col">Total Cost</th>
              <th scope="col">Comments if Any</th>
            </tr>
          </thead>

          <tbody>
            {filteredeemployeevalues.map((employee) => (
              <tr>
                <td>{employee.Account}</td>
                <td>{employee["Project/Contract"]}</td>
                <td>{employee["Emp ID"]}</td>
                <td>{employee["Emp Name"]}</td>
                <td>{employee["Purpose of Travel"]}</td>
                <td>{employee["Travel from"]}</td>
                <td>{employee["Travel to"]}</td>
                <td>{employee["Date from"]}</td>
                <td>{employee["Date To"]}</td>
                <td>{employee["Flight"]}</td>
                <td>{employee["Hotac"]}</td>
                <td>{employee["Perdiem"]}</td>
                <td>{employee["Other cost"]}</td>
                <td>{employee["Total Cost"]}</td>
                <td>{employee["Comments if Any"]}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faExternalLink}
                    onClick={() => {
                      settingtheupdatevalue(employee.id);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => {
                      handleShow();
                      setBookingidtodelete(employee.id);
                      setEmpidfilterafterdelete(employee["Emp ID"]);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tablecomponent;
