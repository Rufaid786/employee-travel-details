import React, { useEffect, useState } from "react";
import Employeeservices from "../Services/Employeeservices";
import { CSVLink } from "react-csv";
function Csvform({ setShowResults, setPassword, setEmail }) {
  const [employees, setEmployees] = useState([]);
  const header = [
    { label: "Account", key: "Account" },
    { label: "Project/Contract", key: "Project/Contract" },
    { label: "Emp ID", key: "Emp ID" },
    { label: "Emp Name", key: "Emp Name" },
    { label: "Purpose of Travel", key: "Purpose of Travel" },
    { label: "Travel From", key: "Travel from" },
    { label: "Travel To", key: "Travel to" },
    { label: "Date From", key: "Date from" },
    { label: "Date To", key: "Date To" },
    { label: "Flight", key: "Flight" },
    { label: "Hotac", key: "Hotac" },
    { label: "Perdium", key: "Perdiem" },
    { label: "Other Cost", key: "Other cost" },
    { label: "Total Cost", key: "Total Cost" },
    { label: "Comments if Any", key: "Comments if Any" },
  ];
  const csvReport = {
    filename: "Report.csv",
    headers: header,
    data: employees,
  };
  useEffect(() => {
    Employeeservices.getEmployees()
      .then((success) => setEmployees(success.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="mt-3">
      <h2>Click on below link to dwonload in csv format</h2>
      <CSVLink {...csvReport} className="btn btn-success">
        Export to CSV
      </CSVLink>
      <br></br>
      <button
        type="button"
        class="btn btn-primary mt-3"
        onClick={() => {
          setShowResults(false);
          setPassword("");
          setEmail("");
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Csvform;
