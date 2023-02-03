import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import Employeeservices from "../Services/Employeeservices";
import "./Employee.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Tablecomponent from "./Tablecomponent";
export const bookingid = atom({
  key: "id",
  default: "",
});
function Employee() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [constantemployees, setConstantemployees] = useState([]);
  const [updatevalue, setUpdatevalue] = useRecoilState(bookingid);
  const [filteredeemployeevalues, setFilteredemployeevalues] =
    useState(employees);
  const [empidspan, setempidspan] = useState("");
  const [showtable, setShowtable] = useState(false);
  const [searchvalue, setSearchvalue] = useState("");
  const settingtheupdatevalue = (id) => {
    setUpdatevalue(id);
    redirect();
  };
  const redirect = () => {
    navigate("/employeeform");
  };
  const getallEmployees = () => {
    Employeeservices.getEmployees()
      .then((success) => {
        setEmployees(success.data);
        setConstantemployees(success.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setUpdatevalue("");
  }, []);
  const filterfunction = (empid) => {
    getallEmployees();
    console.log(empid);
    const filterfind = constantemployees.filter((employee) => {
      if (employee["Emp ID"] === empid) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredemployeevalues(filterfind);
  };
  const filterafterdelete = (bookingId) => {
    console.log(bookingId);
    const filterfind = filteredeemployeevalues.filter((employee) => {
      if (employee["id"] === bookingId) {
        return false;
      } else {
        return true;
      }
    });
    setFilteredemployeevalues(filterfind);
    console.log(filterfind);
  };
  useEffect(() => {
    getallEmployees();
    employeeidvalidation(searchvalue);
  }, [searchvalue]);

  const employeeidvalidation = (id) => {
    if (id.length > 0) {
      Employeeservices.getEmployeebyempid(id)
        .then((success) => {
          if (typeof success.data === "object") {
            setShowtable(true);
            setempidspan("");
            filterfunction(id);
          } else {
            setShowtable(false);
            setempidspan(success.data);
          }
        })
        .catch((error) => {
          console.log(error);
          setempidspan(error.data);
        });
    } else {
      setShowtable(false);
      setempidspan("");
    }
  };
  const deleteEmployee = (bookid) => {
    Employeeservices.deleteEmployeebyid(bookid)
      .then((success) => {
        console.log(success.data);
        filterafterdelete(bookid);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="p-4" style={{ background: "#f0f2f5" }}>
      <div class="row mb-3">
        <div class="section-1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              className="text-box"
              value={searchvalue}
              onChange={(e) => {
                setSearchvalue(e.target.value);
              }}
              placeholder="Enter EmpID to update"
            />
            <span style={{ color: "red" }}>{empidspan}</span>
          </div>
          <button
            style={{ marginLeft: "7px" }}
            type="button"
            class="btn btn-outline-primary"
            onClick={() => redirect()}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "7px" }} />
            <span>Add Travel Request</span>
          </button>
        </div>
      </div>
      {showtable ? (
        <Tablecomponent
          settingtheupdatevalue={settingtheupdatevalue}
          filteredeemployeevalues={filteredeemployeevalues}
          deleteEmployee={deleteEmployee}
          filterfunction={filterfunction}
          getallEmployees={getallEmployees}
        />
      ) : null}
    </div>
  );
}

export default Employee;
