import React, { useEffect, useState } from "react";
import Employeeservices from "../Services/Employeeservices";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { bookingid } from "./Employee";
import { useNavigate } from "react-router-dom";
function Form() {
  const bid = useRecoilValue(bookingid);
  const [id, setId] = useState("");
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
  const [emp, setEmp] = useState([]);
  const [empidnav, setEmpidnav] = useState("");
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/employeesection");
  };
  useEffect(() => {
    if (bid) {
      setId(bid);
      Employeeservices.getEmployeebyid(bid)
        .then((success) => {
          setAccount(success.data.Account);
          setProject(success.data["Project/Contract"]);
          setEmpid(success.data["Emp ID"]);
          setEmpname(success.data["Emp Name"]);
          setPurposeoftravel(success.data["Purpose of Travel"]);
          setTravelfrom(success.data["Travel from"]);
          setTravelto(success.data["Travel to"]);
          setDatefrom(success.data["Date from"]);
          setDateto(success.data["Date To"]);
          setFlight(success.data.Flight);
          setHotac(success.data.Hotac);
          setPerdium(success.data.Perdiem);
          setOthercost(success.data["Other cost"]);
          setTotalcost(success.data["Total Cost"]);
          setcommentsifany(success.data["Comments if Any"]);
          setEmp(success.data);
        })
        .catch((error) => console.log(error));
    } else {
      setId(uuidv4().slice(0, 6));
    }
  }, []);

  const findsum = () => {
    let req =
      Number(flight) + Number(hotac) + Number(perdiem) + Number(othercost);
    setTotalcost(req);
  };
  const saveEmployee = (e) => {
    e.preventDefault();
    // uuidv4().slice(0, 6),

    const employee = {
      id,
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
    Employeeservices.addemployee(employee)
      .then((success) => {
        console.log(success.data);
      })
      .catch((error) => console.log(error));

    // alert(
    //   "Employee details Saved successfully with id " +
    //     id +
    //     " please Keep this id for future purpose"
    // );
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
    //window.location.reload();
    redirect();
  };
  const reset = () => {
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
  const title = () => {
    if (bid) {
      return <h2 className="text-center">Employee Details Update Form</h2>;
    } else {
      return <h2 className="text-center">Employee Details add Form</h2>;
    }
  };
  const getdetails = (id) => {
    if (id.length > 0) {
      Employeeservices.geteid(id)
        .then((success) => {
          setAccount(success.data.Account);
          setProject(success.data["Project/Contract"]);
          setEmpname(success.data["Emp Name"]);
          setEmpidnav("");
        })
        .catch((error) => {
          setEmpidnav("Empid Not found");
          setAccount("");
          setProject("");
          setEmpname("");
        });
    } else {
      setEmpidnav("");
    }
  };
  return (
    <>
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title text-danger" id="exampleModalLongTitle">
                Alert!!!
              </h3>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center" style={{ fontSize: "17px" }}>
              Employee details Saved successfully with{" "}
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Booking ID:{id}
              </span>
              .Please keep this ID for future purpose
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-dismiss="modal"
                onClick={(e) => {
                  saveEmployee(e);
                  //refreshPage();
                  //window.location.reload();
                }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-3" style={{ background: "#f0f2f5" }}>
        {title()}

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
                  disabled
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
                  disabled
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
                  onChange={(e) => {
                    setEmpid(e.target.value);
                  }}
                  onKeyUp={(e) => getdetails(e.target.value)}
                  type="text"
                  class="form-control"
                  id="empid"
                  placeholder="Emp ID"
                />
                <span style={{ color: "red" }}>{empidnav}</span>
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
                  disabled
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
              <div class="offset-md-2 col-md-2 mt-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Submit
                </button>
              </div>
              <div class="offset-md-6 col-md-2 mt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => reset()}
                >
                  Clear All
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
