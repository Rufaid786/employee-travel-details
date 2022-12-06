import React, { useState } from "react";
import Employeeservices from "../Services/Employeeservices";

function Form() {
  const [account, setAccount] = useState("");
  const [project, setProject] = useState("");
  const [empid, setEmpid] = useState("");
  const [empname, setEmpname] = useState("");
  const [purposeoftravel, setPurposeoftravel] = useState("");
  const [travelfrom, setTravelfrom] = useState("");
  const [travelto, setTravelto] = useState("");
  const [datefrom, setDatefrom] = useState("");
  const [dateto, setDateto] = useState("");
  const [flight, setFlight] = useState("");
  const [hotac, setHotac] = useState("");
  const [perdiem, setPerdium] = useState("");
  const [othercost, setOthercost] = useState("");
  const [totalcost, setTotalcost] = useState("");
  const [commentsifany, setcommentsifany] = useState("");

  const findsum = () => {
    let req =
      Number(flight) + Number(hotac) + Number(perdiem) + Number(othercost);
    setTotalcost(req);
  };
  const saveEmployee = (e) => {
    e.preventDefault();
    const employee = {
      account,
      project,
      empid,
      empname,
      purposeoftravel,
      travelfrom,
      travelto,
      datefrom,
      dateto,
      flight,
      hotac,
      perdiem,
      othercost,
      totalcost,
      commentsifany,
    };
    Employeeservices.addEmployees(employee)
      .then((success) => {
        console.log(success.data);
      })
      .catch((error) => console.log(error));

    alert("Employee details Saved successfully");
    setAccount("");
    setProject("");
    setEmpid("");
    setEmpname("");
    setPurposeoftravel("");
    setTravelfrom("");
    setTravelto("");
    setDatefrom("");
    setDateto("");
    setFlight("");
    setHotac("");
    setPerdium("");
    setOthercost("");
    setTotalcost("");
    setcommentsifany("");
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center">Employee Details Form</h2>
      <br></br>
      <div className="card-body ml-3">
        <form>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Account
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                class="form-control"
                id="account"
                placeholder="Account"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Project/Contract
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={project}
                onChange={(e) => setProject(e.target.value)}
                type="text"
                class="form-control"
                id="project"
                placeholder="Project/Contract"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Emp ID
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={empid}
                onChange={(e) => setEmpid(e.target.value)}
                type="text"
                class="form-control"
                id="empid"
                placeholder="Emp ID"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Emp Name
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={empname}
                onChange={(e) => setEmpname(e.target.value)}
                type="text"
                class="form-control"
                id="empname"
                placeholder="Employee Name"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Purose of Travel
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={purposeoftravel}
                onChange={(e) => setPurposeoftravel(e.target.value)}
                type="text"
                class="form-control"
                id="purposeoftravel"
                placeholder="Purpose"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Travel From
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={travelfrom}
                onChange={(e) => setTravelfrom(e.target.value)}
                type="text"
                class="form-control"
                id="travelfrom"
                placeholder="Travel From"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Travel To
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={travelto}
                onChange={(e) => setTravelto(e.target.value)}
                type="text"
                class="form-control"
                id="travelto"
                placeholder="Travel To"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Date From
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={datefrom}
                onChange={(e) => setDatefrom(e.target.value)}
                type="date"
                class="form-control"
                id="datefrom"
                placeholder="Travel To"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Date To
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={dateto}
                onChange={(e) => setDateto(e.target.value)}
                type="Date"
                class="form-control"
                id="dateto"
                placeholder="Travel To"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Flight
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={flight}
                onChange={(e) => setFlight(e.target.value)}
                type="text"
                class="form-control"
                id="flight"
                placeholder="Flight Cost"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Hotac
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={hotac}
                onChange={(e) => setHotac(e.target.value)}
                type="text"
                class="form-control"
                id="hotac"
                placeholder="Hotac cost"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Perdium
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={perdiem}
                onChange={(e) => setPerdium(e.target.value)}
                type="text"
                class="form-control"
                id="perdium"
                placeholder="Perdium cost"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Other cost
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                value={othercost}
                onChange={(e) => setOthercost(e.target.value)}
                type="text"
                class="form-control"
                id="othercost"
                placeholder="Other cost"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="inputPassword"
              class="col-md-2 col-sm-2 col-form-label text-center align-items-center"
            >
              Total Cost
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                type="text"
                class="form-control"
                id="totalcost"
                value={totalcost}
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <div class="offset-md-2 col-md-2 col-sm-12">
              <input
                type="button"
                value="Find Total cost"
                class="btn btn-primary"
                onClick={() => findsum()}
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="comments"
              class="col-md-2 col-sm-2 col-form-label text-center"
            >
              Comments if Any:
            </label>
            <div class="col-md-10 col-sm-10">
              <input
                type="text"
                class="form-control"
                id="commentsifany"
                value={commentsifany}
                onChange={(e) => setcommentsifany(e.target.value)}
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <div class="offset-md-2 col-md-2 col-sm-12">
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => saveEmployee(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
