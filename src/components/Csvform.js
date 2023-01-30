import React, { useEffect, useState } from "react";
import Employeeservices from "../Services/Employeeservices";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";

function Csvform() {
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();
  const [filteredemployees, setFilteredemployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [constemployeeall, setConstemployeeall] = useState([]);
  const [startdateEmpall, setStartdateEmpall] = useState("");
  const [enddateEmpall, setEnddateEmpall] = useState("");
  const [dateValidationspan, setdateValidationspan] = useState("");
  const [datespanforAllemployees, setdatespanforAllemployees] = useState("");
  const navigate = useNavigate();
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
    filename: "Filtered_Employess.csv",
    headers: header,
    data: employees,
  };
  const Employeeall = {
    filename: "Employees.csv",
    headers: header,
    data: constemployeeall,
  };
  const filteredreport = {
    filename: "DatasforApproval.csv",
    headers: header,
    data: filteredemployees,
  };

  const filterfunction = () => {
    setFilteredemployees("");
    Employeeservices.getfiltereddata(startdate, enddate)
      .then((success) => {
        console.log(success.data);
        setFilteredemployees(success.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    Employeeservices.getEmployees()
      .then((success) => {
        console.log(success.data);
        setEmployees(success.data);
        setConstemployeeall(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const redirect = () => {
    navigate("/pmosection");
  };
  const dateValidation = () => {
    if (enddate < startdate) {
      setdateValidationspan("Please Provide a valid Date range");
    } else {
      setdateValidationspan("");
      filterfunction();
    }
  };
  useEffect(() => {
    dateValidation();
  }, [enddate]);

  const employeeAllfilter = () => {
    const filteredEmployeeall = constemployeeall.filter((emp) => {
      if (
        emp["Date from"] > startdateEmpall &&
        emp["Date from"] < enddateEmpall
      ) {
        console.log("success");
        return true;
      } else {
        console.log("condition not working");
        return false;
      }
    });
    setEmployees(filteredEmployeeall);
  };
  const dateValidationforAllemployees = () => {
    if (enddateEmpall < startdateEmpall) {
      setdatespanforAllemployees("Please Provide a valid Date range");
    } else {
      setdatespanforAllemployees("");
      employeeAllfilter();
    }
  };
  useEffect(() => {
    dateValidationforAllemployees();
  }, [enddateEmpall]);
  return (
    <div className="p-3" style={{ background: "rgb(240, 242, 245)" }}>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <button
          type="button"
          class="btn btn-primary mt-3"
          onClick={() => redirect()}
        >
          Log Out
        </button>
      </div>
      <div class="row mt-3 mb-5">
        <div class="col-md-6 col-sm-12 mt-3">
          <div class="card bg-light">
            <div class="card-header">
              <h5>Records for Approval</h5>
            </div>
            <div class="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>From:</label>
                  <input
                    type="date"
                    name="startdate"
                    value={startdate}
                    onChange={(e) => setStartdate(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "2em",
                  }}
                >
                  <label>To:</label>
                  <input
                    type="date"
                    name="enddate"
                    value={enddate}
                    onChange={(e) => {
                      setEnddate(e.target.value);
                    }}
                  />
                </div>
              </div>
              <span style={{ color: "red" }}>{dateValidationspan}</span>
              <div>
                <CSVLink {...filteredreport} className="btn btn-success mt-3">
                  Download
                </CSVLink>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 mt-3">
          <div class="card bg-light">
            <div class="card-header">
              <h5>All Records</h5>
            </div>
            <div class="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>From:</label>
                  <input
                    type="date"
                    name="startdateempall"
                    value={startdateEmpall}
                    onChange={(e) => setStartdateEmpall(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "2em",
                  }}
                >
                  <label>To:</label>
                  <input
                    type="date"
                    name="enddateempall"
                    value={enddateEmpall}
                    onChange={(e) => {
                      setEnddateEmpall(e.target.value);
                    }}
                  />
                </div>
              </div>
              <span style={{ color: "red" }}>
                <p>{datespanforAllemployees}</p>
              </span>
              <div
                className=" mt-3"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <CSVLink {...csvReport} className="btn btn-success">
                  Download
                </CSVLink>
                <CSVLink {...Employeeall} className="btn btn-success">
                  Download All
                </CSVLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Csvform;
