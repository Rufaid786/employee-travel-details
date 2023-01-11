import React, { useEffect, useState } from "react";
import Employeeservices from "../Services/Employeeservices";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { bookingid } from "./Employee";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Form.css";
import axios from "axios";
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
  const [countryfrom, setCountryfrom] = useState("");
  const [statefrom, setStatefrom] = useState("");
  const [cityfrom, setCityfrom] = useState("");
  const [countryto, setCountryto] = useState("");
  const [stateto, setStateto] = useState("");
  const [cityto, setCityto] = useState("");

  const [empidspan, setempidspan] = useState("");
  const [emp, setEmp] = useState([]);

  const [purposeoftravelspan, setPurposeoftravelspan] = useState("");
  const [traveltospan, setTraveltospan] = useState("");
  const [datefromspan, setDatefromspan] = useState("");
  const [datetospan, setDatetospan] = useState("");
  const [empidnav, setEmpidnav] = useState("");

  const navigate = useNavigate();

  const redirect = () => {
    navigate("/employeesection");
  };
  const [data, setData] = useState([]);
  const [selectedcountry, setSelectedcountry] = useState();
  const [selectedstate, setSelectedstate] = useState("");
  const [selectedcity, setSelectedcity] = useState();
  const [countryfromspan, setCountryfromspan] = useState("");
  const [statefromspan, setStatefromspan] = useState("");
  const [cityfromspan, setCityfromspan] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const getcoutrycitystate = () => {
    Employeeservices.getCountrycitystate()
      .then((success) => {
        setData(success.data);
        console.log(success.data);
      })
      .catch((error) => console.log(error));
  };
  // finding countries from the dataset.Set is used for unique values means same country will be repeated again and again.By using set repeatation can be avoided.
  // ...is used to conver set back into array.Hence uniquecountries will be an array with unique country names.
  const countries = [...new Set(data.map((item) => item.country))];
  countries.sort();

  const handlecountry = (event) => {
    setCountryfromspan("");
    setSelectedcountry(event);
    let uniquestates = data.filter((state) => state.country === event);
    uniquestates = [...new Set(uniquestates.map((state) => state.subcountry))];
    uniquestates.sort();
    setStates(uniquestates);
  };
  const handlestates = (event) => {
    setStatefromspan("");
    setSelectedstate(event);
    let uniquecities = data.filter((city) => city.subcountry === event);
    uniquecities = [...new Set(uniquecities.map((city) => city.name))];
    uniquecities.sort();
    setCities(uniquecities);
  };
  useEffect(() => {
    getcoutrycitystate();
    if (bid) {
      setId(bid);
      Employeeservices.getEmployeebyid(bid)
        .then((success) => {
          console.log(success);
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
  const alertwindow = () => {
    if (bid) {
      return (
        <span style={{ fontSize: "18px" }}>
          Are you sure you want to update the information?
        </span>
      );
    } else {
      return (
        <span style={{ fontSize: "18px" }}>
          Are you sure you want to Book a ticket?
        </span>
      );
    }
  };
  const getdetails = (id) => {
    console.log(id);
    setempidspan("");
    if (id.length > 0) {
      Employeeservices.geteid(id)
        .then((success) => {
          if (typeof success.data == "string") {
            setEmpidnav(success.data);
            setAccount("");
            setProject("");
            setEmpname("");
          } else {
            setAccount(success.data.Account);
            setProject(success.data["Project/Contract"]);
            setEmpname(success.data["Emp Name"]);
            setEmpidnav("");
          }
        })
        .catch((error) => {
          console.log(error);
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
      setCountryfromspan("");
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
      ? setCountryfromspan("This field is Required")
      : setCountryfromspan("");
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
          <Modal.Title className="text-success">Alert!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">{alertwindow()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={(e) => {
              saveEmployee(e);
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="p-3" style={{ background: "#f0f2f5" }}>
        {title()}

        <br></br>
        <div className="container">
          {/* *************************************************************** */}
          <div class="form-group row">
            <header className="col-md-12">
              <span style={{ fontSize: "2rem" }}>Employee Details</span>
            </header>
            <div className="row section p-2 mt-2 mb-3">
              <div class="form-group mb-3 col-md-6 col-sm-12">
                <label for="inputPassword">
                  Emp ID
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>

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
              <div class="form-group col-md-6 col-sm-12">
                <label for="inputPassword">Account</label>

                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  class="form-control"
                  id="account"
                  disabled
                />
              </div>
              <div class="form-group mb-3 col-md-6 col-sm-12">
                <label for="inputPassword">Project/Contract</label>

                <input
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  type="text"
                  class="form-control"
                  id="project"
                  disabled
                />
              </div>
              <div class="form-group  col-md-6 col-sm-10">
                <label for="empname">Emp Name</label>
                <input
                  value={empname}
                  onChange={(e) => setEmpname(e.target.value)}
                  type="text"
                  class="form-control"
                  id="empname"
                  disabled
                />
              </div>
            </div>
          </div>
          {/* ********************** Travel Details Beginning***************/}
          <div class="form-group row">
            <header className="col-md-12">
              <span style={{ fontSize: "2rem" }}>Travel Details</span>
            </header>
            <div className="row section mb-3">
              <div className="row p-2">
                <div class="form-group col-md-4 mb-3 col-sm-12">
                  <label for="purposeoftravel">
                    Purpose of Travel
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
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
                <div class="form-group col-md-4 col-sm-12">
                  <label for="datefrom">
                    Date From
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>

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
                <div class="form-group col-md-4 mb-3 col-sm-12">
                  <label for="dateto">
                    Date To
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>

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
                  <span style={{ color: "red" }}>{datetospan} </span>
                </div>
              </div>
              <div className="row p-2">
                <span style={{ fontSize: "1.5rem" }}>Travel From</span>
                <div class="form-group mb-3 col-md-4 col-sm-12">
                  <select
                    class="form-select"
                    onChange={(e) => {
                      handlecountry(e.target.value);
                    }}
                  >
                    <option>--Select a country--</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: "red" }}>{countryfromspan}</span>
                </div>
                <div class="form-group mb-3 col-md-4 col-sm-12">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      handlestates(e.target.value);
                    }}
                  >
                    <option selected>--Select a State--</option>
                    {states.map((items) => (
                      <option key={items} value={items}>
                        {items}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: "red" }}>{statefromspan}</span>
                </div>
                <div class="form-group mb-3 col-md-4 col-sm-12">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>--Select a city--</option>
                    {cities.map((items) => (
                      <option key={items} value={items}>
                        {items}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: "red" }}>{cityfromspan}</span>
                </div>
              </div>
              <div className="row p-2">
                <span style={{ fontSize: "1.5rem" }}>Travel To</span>
                <div class="form-group mb-3 col-md-4 col-sm-12">
                  <select
                    class="form-select"
                    onChange={(e) => {
                      handlecountry(e.target.value);
                    }}
                  >
                    <option>--Select a country--</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: "red" }}>{countryfromspan}</span>
                </div>
                <div class="form-group mb-3 col-md-4 col-sm-12">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      handlestates(e.target.value);
                    }}
                  >
                    <option selected>--Select a State--</option>
                    {states.map((items) => (
                      <option key={items} value={items}>
                        {items}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: "red" }}>{statefromspan}</span>
                </div>
                <div class="form-group mb-3 col-md-4 col-sm-12">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>--Select a city--</option>
                    {cities.map((items) => (
                      <option key={items} value={items}>
                        {items}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: "red" }}>{cityfromspan}</span>
                </div>
              </div>
            </div>
          </div>
          {/* ****************************************
                    Cost section Beginning
                ************************************** */}
          <div class="form-group row">
            <header className="col-md-12">
              <span style={{ fontSize: "2rem" }}>Cost Estimation</span>
            </header>
            <div className="row section p-2 mb-3">
              <div class="form-group mb-3 col-md-6 col-sm-12">
                <label for="flightcost">Flight Cost</label>

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
              <div class="form-group col-md-6 col-sm-12">
                <label for="Hotaccost">Hotac Cost</label>

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
              <div class="form-group mb-3 col-md-6 col-sm-12">
                <label for="perdiumcost">Perdium Cost</label>

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
              <div class="form-group  col-md-6 col-sm-10">
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
              <div class="form-group  mb-3 col-md-3 col-sm-10">
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
          </div>

          {/* ***************************************
          Cost Section End
          ************************ */}
          <div class="form-group row">
            <div class="col-md-4 col-sm-10">
              <label for="comments">Comments if Any:</label>

              <textarea
                rows="5"
                class="form-control mt-2"
                id="commentsifany"
                value={commentsifany}
                onChange={(e) => setcommentsifany(e.target.value)}
              />
            </div>
          </div>

          <div class="form-group row mt-3">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                variant="primary"
                onClick={() => {
                  validation();
                }}
              >
                Submit
              </Button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => reset()}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
