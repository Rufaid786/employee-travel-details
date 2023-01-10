import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink, faTrash } from "@fortawesome/free-solid-svg-icons";
function Tablecomponent({ filteredeemployeevalues, settingtheupdatevalue }) {
  return (
    <div class="row mb-3">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Booking ID</th>
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
              <td>{employee.id}</td>
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
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tablecomponent;