import React, { useEffect, useState } from "react";
import Employeeservices from "../Services/Employeeservices";
import { CSVLink } from "react-csv";

function Csvform({ setShowResults, setPassword, setEmail }) {
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredemployees, setFilteredemployees] = useState([]);
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
  const filteredreport = {
    filename: "Report.csv",
    headers: header,
    data: filteredemployees,
  };

  const filterfunction = (e) => {
    e.preventDefault();
    setFilteredemployees("");
    console.log(startdate);
    console.log(enddate);
    Employeeservices.getfiltereddata(startdate, enddate)
      .then((success) => {
        //console.log(success.data);
        setFilteredemployees(success.data);
      })
      .catch((error) => console.log(error));
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
      <div style={{ display: "flex" }} className="mt-3">
        <div className="col-md-6">
          <h5>
            Choose Your Date and click on export to download in csv format
          </h5>
          <label style={{ width: "50%" }}>
            Date from:
            <input
              type="date"
              name="startdate"
              value={startdate}
              style={{ marginLeft: "5px" }}
              onChange={(e) => setStartdate(e.target.value)}
            />
          </label>
          <label style={{ width: "50%" }}>
            Date To:
            <input
              type="date"
              name="enddate"
              value={enddate}
              style={{ marginLeft: "5px" }}
              onChange={(e) => {
                setEnddate(e.target.value);
                //filterfunction(e.target.value);
              }}
            />
          </label>
          <button onClick={(e) => filterfunction(e)}>check</button>
          <br></br>

          <CSVLink {...filteredreport} className="btn btn-success">
            Export
          </CSVLink>
        </div>
        <div className="col-md-6">
          <h5>Click on Export All to download All records in csv format</h5>
          <CSVLink {...csvReport} className="btn btn-success">
            Export All
          </CSVLink>
        </div>
      </div>
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
