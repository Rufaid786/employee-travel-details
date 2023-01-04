import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import Employeeservices from "../Services/Employeeservices";
import "./Employee.css";
export const bookingid = atom({
  key: "id",
  default: "",
});
function Employee() {
  const navigate = useNavigate();
  const [updatevalue, setUpdatevalue] = useRecoilState(bookingid);
  const [validationspan, setValidationspan] = useState("");
  const redirect = () => {
    //setUpdatevalue("");
    navigate("/employeeform");
  };
  const keyupcheck = () => {
    if (updatevalue != null) {
      setValidationspan("");
    }
  };
  const employeeidcheck = () => {
    if (updatevalue === "") {
      setValidationspan("Please provide a Booking id");
    } else {
      Employeeservices.getEmployeebyid(updatevalue)
        .then((success) => {
          redirect();
        })
        .catch((error) =>
          setValidationspan(
            "Booking Id doesnot exists..!!. Please Provide a valid Booking Id!!!!"
          )
        );
    }
  };
  return (
    <div className="container p-4" style={{ background: "#f0f2f5" }}>
      <div class="row">
        <div class="col-md-4 col-sm-12 p-3 section-1">
          <span style={{ fontSize: "20px" }}>
            Click the button below For Adding details
          </span>
          <button
            type="button"
            class="col-md-4 btn btn-primary mt-3"
            onClick={() => redirect()}
          >
            Add Details
          </button>
        </div>
        <div className="col-md-8 col-sm-12 p-3 section-2">
          <span style={{ fontSize: "20px" }} class="mb-2">
            If you want to Update details,Please Enter your booking Id and Click
            Update
          </span>
          <input
            type="text"
            className="col-md-6 text-box"
            value={updatevalue}
            onChange={(e) => setUpdatevalue(e.target.value)}
            placeholder="Enter your Booking Id"
            onKeyUp={() => keyupcheck()}
          />
          <button
            type="button"
            class="col-md-2 btn btn-primary mt-3"
            onClick={() => employeeidcheck()}
          >
            Update
          </button>
          <span style={{ color: "red" }}>{validationspan}</span>
        </div>
      </div>
    </div>
  );
}

export default Employee;
