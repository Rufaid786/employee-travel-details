import React, { useEffect, useState } from "react";
import Employeeservices from "../Services/Employeeservices";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { bookingid } from "./Employee";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Form.css";
function Form() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const [empidspan, setempidspan] = useState("");
  const [emp, setEmp] = useState([]);
  const [purposeoftravelspan, setPurposeoftravelspan] = useState("");
  const [travelfromspan, setTravelfromspan] = useState("");
  const [traveltospan, setTraveltospan] = useState("");
  const [datefromspan, setDatefromspan] = useState("");
  const [datetospan, setDatetospan] = useState("");
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
    setempidspan("");
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
  const keyupvalidation = () => {
    if (purposeoftravel) {
      setPurposeoftravelspan("");
    }
    if (datefrom) {
      setDatefromspan("");
    }
    if (dateto) {
      setDatetospan("");
    }
    if (travelfrom) {
      setTravelfromspan("");
    }
    if (travelto) {
      setTraveltospan("");
    }
  };
  const validation = () => {
    empid === "" ? setempidspan("This field is Required") : setempidspan("");
    purposeoftravel === ""
      ? setPurposeoftravelspan("This field is Required")
      : setPurposeoftravelspan("");
    travelfrom === ""
      ? setTravelfromspan("This field is Required")
      : setTravelfromspan("");
    travelto === ""
      ? setTraveltospan("This field is Required")
      : setTraveltospan("");
    datefrom === ""
      ? setDatefromspan("This field is Required")
      : setDatetospan("");
    dateto === "" ? setDatetospan("This field is Required") : setDatetospan("");
    if (
      empid !== "" &&
      purposeoftravel !== "" &&
      travelfrom !== "" &&
      travelto !== "" &&
      datefrom !== "" &&
      dateto !== ""
    ) {
      handleShow();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Alert!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Employee details Saved successfully with{" "}
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            Booking ID:{id}
          </span>
          .Please keep this ID for future purpose
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              saveEmployee(e);
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container" style={{ background: "#f0f2f5" }}>
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
                Emp ID<span style={{ color: "red", marginLeft: "5px" }}>*</span>
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
                <span style={{ color: "red" }}>{empidspan}</span>
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
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <div class="col-md-10 col-sm-10">
                <input
                  value={purposeoftravel}
                  onChange={(e) => setPurposeoftravel(e.target.value)}
                  type="text"
                  class="form-control"
                  id="purposeoftravel"
                  placeholder="Purpose"
                  onKeyUp={() => keyupvalidation()}
                />
                <span style={{ color: "red" }}>{purposeoftravelspan}</span>
              </div>
            </div>
            <div class="form-group row mb-3">
              <label
                for="inputPassword"
                class="col-md-2 col-sm-2 col-form-label text-center"
              >
                Travel From
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <div class="col-md-10 col-sm-10">
                <input
                  value={travelfrom}
                  onChange={(e) => setTravelfrom(e.target.value)}
                  type="text"
                  class="form-control"
                  id="travelfrom"
                  placeholder="Travel From"
                  onKeyUp={() => keyupvalidation()}
                />
                <span style={{ color: "red" }}>{travelfromspan}</span>
              </div>
            </div>
            <div class="form-group row mb-3">
              <label
                for="inputPassword"
                class="col-md-2 col-sm-2 col-form-label text-center"
              >
                Travel To
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <div class="col-md-10 col-sm-10">
                <input
                  value={travelto}
                  onChange={(e) => setTravelto(e.target.value)}
                  type="text"
                  class="form-control"
                  id="travelto"
                  placeholder="Travel To"
                  onKeyUp={() => keyupvalidation()}
                />
                <span style={{ color: "red" }}>{traveltospan}</span>
              </div>
            </div>
            <div class="form-group row mb-3">
              <label
                for="inputPassword"
                class="col-md-2 col-sm-2 col-form-label text-center"
              >
                Date From
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <div class="col-md-10 col-sm-10">
                <input
                  value={datefrom}
                  onChange={(e) => {
                    setDatefrom(e.target.value);
                    setDatefromspan(" ");
                  }}
                  type="date"
                  class="form-control"
                  id="datefrom"
                />
                <span style={{ color: "red" }}>{datefromspan}</span>
              </div>
            </div>
            <div class="form-group row mb-3">
              <label
                for="inputPassword"
                class="col-md-2 col-sm-2 col-form-label text-center"
              >
                Date To
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <div class="col-md-10 col-sm-10">
                <input
                  value={dateto}
                  onChange={(e) => {
                    setDateto(e.target.value);
                    setDatetospan(" ");
                  }}
                  type="Date"
                  class="form-control"
                  id="dateto"
                />
                <span style={{ color: "red" }}>{datetospan}</span>
              </div>
            </div>
            <div class="form-group row  cost-section">
              <header
                className="col-md-12 p-2"
                style={{ backgroundColor: "rgb(33 112 229)" }}
              >
                <span style={{ fontSize: "1.5rem", color: "white" }}>
                  Cost Estimation
                </span>
              </header>
              <div class="form-group p-2 col-md-6 col-sm-10">
                <label for="flightcost">Flight</label>

                <input
                  value={flight}
                  onChange={(e) => setFlight(e.target.value)}
                  onKeyUp={() => findsum()}
                  type="text"
                  class="form-control"
                  id="flight"
                  placeholder="Flight Cost"
                />
              </div>
              <div class="form-group p-2 col-md-6 col-sm-10">
                <label for="Hotaccost">Hotac</label>

                <input
                  value={hotac}
                  onChange={(e) => setHotac(e.target.value)}
                  onKeyUp={() => findsum()}
                  type="text"
                  class="form-control"
                  id="hotac"
                  placeholder="Hotac cost"
                />
              </div>
              <div class="form-group p-2 col-md-6 col-sm-10">
                <label for="perdiumcost">Perdium</label>

                <input
                  value={perdiem}
                  onChange={(e) => setPerdium(e.target.value)}
                  onKeyUp={() => findsum()}
                  type="text"
                  class="form-control"
                  id="perdium"
                  placeholder="Perdium cost"
                />
              </div>
              <div class="form-group p-2 col-md-6 col-sm-10">
                <label for="othercost">Other cost</label>

                <input
                  value={othercost}
                  onChange={(e) => setOthercost(e.target.value)}
                  onKeyUp={() => findsum()}
                  type="text"
                  class="form-control"
                  id="othercost"
                  placeholder="Other cost"
                />
              </div>
              <div class="form-group p-2 mb-2 col-md-3 col-sm-10">
                <label for="totalcost">Total Cost</label>

                <input
                  type="text"
                  class="form-control"
                  id="totalcost"
                  value={totalcost}
                  disabled
                />
              </div>
            </div>

            <div class="form-group mt-3 row mb-3">
              <label
                for="comments"
                class="col-md-2 col-sm-2 col-form-label text-center"
              >
                Comments if Any:
              </label>
              <div class="col-md-4 col-sm-10">
                <textarea
                  rows="5"
                  class="form-control"
                  id="commentsifany"
                  value={commentsifany}
                  onChange={(e) => setcommentsifany(e.target.value)}
                />
              </div>
            </div>
            <div class="form-group row pb-5">
              <div class="offset-md-2 col-md-2 mt-3">
                <Button
                  variant="primary"
                  onClick={() => {
                    validation();
                  }}
                >
                  Submit
                </Button>
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
