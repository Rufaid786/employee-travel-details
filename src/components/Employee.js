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
  const [validationspan, setValidationspan] = useState("");
  const [filteredeemployeevalues, setFilteredemployeevalues] =
    useState(employees);
  const [empidspan, setempidspan] = useState("");
  const [showtable, setShowtable] = useState(false);
  const settingtheupdatevalue = (id) => {
    setUpdatevalue(id);
    redirect();
  };
  const redirect = () => {
    navigate("/employeeform");
  };
  const keyupcheck = () => {
    if (updatevalue != null) {
      setValidationspan("");
    }
  };
  useEffect(() => {
    Employeeservices.getEmployees()
      .then((success) => {
        setEmployees(success.data);
        setConstantemployees(success.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const filterfunction = (empid) => {
    console.log(empid);
    const filterfind = constantemployees.filter((employee) => {
      if (employee["Emp ID"] == empid) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredemployeevalues(filterfind);
  };
  // const employeeidcheck = () => {
  //   if (updatevalue === "") {
  //     setValidationspan("Please provide a Booking id");
  //   } else {
  //     Employeeservices.getEmployeebyid(updatevalue)
  //       .then((success) => {
  //         redirect();
  //       })
  //       .catch((error) =>
  //         setValidationspan(
  //           "Booking Id doesnot exists..!!. Please Provide a valid Booking Id!!!!"
  //         )
  //       );
  //   }
  // };
  const employeeidvalidation = (id) => {
    if (id.length > 0) {
      Employeeservices.geteid(id)
        .then((success) => {
          if (typeof success.data == "string") {
            setShowtable(false);
            setempidspan(success.data);
          } else {
            setShowtable(true);

            setempidspan("");
            filterfunction(id);
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
  return (
    <div className="p-4" style={{ background: "#f0f2f5" }}>
      <div class="row mb-3">
        <div class="section-1">
          <div>
            <input
              type="text"
              className="text-box"
              onChange={(e) => setUpdatevalue(e.target.value)}
              onKeyUp={(e) => {
                employeeidvalidation(e.target.value);
                // filterfunction(updatevalue)
              }}
              placeholder="Employee Id to update"
            />
            <span>{empidspan}</span>
          </div>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => redirect()}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "7px" }} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>
      {showtable ? (
        <Tablecomponent
          settingtheupdatevalue={settingtheupdatevalue}
          filteredeemployeevalues={filteredeemployeevalues}
        />
      ) : null}
      {/* <div class="row">
        <div class="col-md-6 col-sm-12 p-3 section-1">
          <input
            type="text"
            className="col-md-6 text-box"
            onChange={(e) => setUpdatevalue(e.target.value)}
            onKeyUp={() => filterfunction(updatevalue)}
            placeholder="Employee Id to update"
          />
        </div>
        <div className="col-md-6 col-sm-12 p-3 section-2">
          <button
            type="button"
            class="col-md-3 btn btn-outline-primary"
            onClick={() => redirect()}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "7px" }} />
            <span>Add Employee</span>
          </button>

          <span style={{ color: "red" }}>{validationspan}</span>
        </div>
      </div> */}
    </div>
  );
}

export default Employee;
