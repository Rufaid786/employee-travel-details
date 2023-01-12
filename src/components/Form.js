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

  const [countryfrom, setCountryfrom] = useState("");
  const [statefrom, setStatefrom] = useState("");
  const [cityfrom, setCityfrom] = useState("");
  const [countryto, setCountryto] = useState("");
  const [stateto, setStateto] = useState("");
  const [cityto, setCityto] = useState("");
  const [countryfromspan, setCountryfromspan] = useState("");
  const [statefromspan, setStatefromspan] = useState("");
  const [cityfromspan, setCityfromspan] = useState("");
  const [countrytospan, setCountrytospan] = useState("");
  const [statetospan, setStatetospan] = useState("");
  const [citytospan, setCitytospan] = useState("");

  const [empidspan, setempidspan] = useState("");
  const [emp, setEmp] = useState([]);

  const [purposeoftravelspan, setPurposeoftravelspan] = useState("");
  const [traveltospan, setTraveltospan] = useState("");
  const [datefromspan, setDatefromspan] = useState("");
  const [datetospan, setDatetospan] = useState("");
  const [empidnav, setEmpidnav] = useState("");
  // var currentdate = new Date();
  // var datetime =
  //   currentdate.getDate() +
  //   "-" +
  //   (currentdate.getMonth() + 1) +
  //   "-" +
  //   currentdate.getFullYear() +
  //   "\t" +
  //   currentdate.getHours() +
  //   ":" +
  //   currentdate.getMinutes() +
  //   ":" +
  //   currentdate.getSeconds();
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/employeesection");
  };
  const [approved, setApproved] = useState("unapproved");
  const [data, setData] = useState([]);

  const [statesdatafrom, setStatesdatafrom] = useState([]);
  const [citiesdatafrom, setCitiesdatafrom] = useState([]);
  const [statesdatato, setStatesdatato] = useState([]);
  const [citiesdatato, setCitiesdatato] = useState([]);
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

  const handlecountryfrom = (event) => {
    setCountryfrom(event);
    setCountryfromspan("");
    let uniquestatesfrom = data.filter((state) => state.country === event);
    uniquestatesfrom = [
      ...new Set(uniquestatesfrom.map((state) => state.subcountry)),
    ];
    uniquestatesfrom.sort();
    setStatesdatafrom(uniquestatesfrom);
  };
  const handlestatesfrom = (event) => {
    setStatefrom(event);
    setStatefromspan("");
    let uniquecitiesfrom = data.filter((city) => city.subcountry === event);
    uniquecitiesfrom = [...new Set(uniquecitiesfrom.map((city) => city.name))];
    uniquecitiesfrom.sort();
    setCitiesdatafrom(uniquecitiesfrom);
  };

  const handlecountryto = (event) => {
    setCountryto(event);
    setCountrytospan("");
    let uniquestatesto = data.filter((state) => state.country === event);
    uniquestatesto = [
      ...new Set(uniquestatesto.map((state) => state.subcountry)),
    ];
    uniquestatesto.sort();
    setStatesdatato(uniquestatesto);
  };
  const handlestatesto = (event) => {
    setStateto(event);
    setStatetospan("");
    let uniquecitiesto = data.filter((city) => city.subcountry === event);
    uniquecitiesto = [...new Set(uniquecitiesto.map((city) => city.name))];
    uniquecitiesto.sort();
    setCitiesdatato(uniquecitiesto);
  };
  const handletravelfrom = (city) => {
    setCityfrom(city);
    console.log(city);
    setCityfromspan("");
  };
  const handletravelto = (city) => {
    console.log(city);
    setCityto(city);
    setCitytospan("");
  };
  const check = () => {
    console.log(travelfrom);
    console.log(travelto);
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
          setCountryfrom(success.data["Travel from"].split(",")[0]);
          setStatefrom(success.data["Travel from"].split(",")[1]);
          setCityfrom(success.data["Travel from"].split(",")[2]);
          setCountryto(success.data["Travel to"].split(",")[0]);
          setStateto(success.data["Travel to"].split(",")[1]);
          setCityto(success.data["Travel to"].split(",")[2]);
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
    console.log(e);

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
      approved,
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
    setCountryfrom("");
    setStatefrom("");
    setCityfrom("");
    setCountryto("");
    setStateto("");
    setCityto("");

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
    setCountryfrom("");
    setStatefrom("");
    setCityfrom("");
    setCountryto("");
    setStateto("");
    setCityto("");
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
    if (countryfrom) {
      setCountryfromspan("");
    }
    if (statefrom) {
      setStatefromspan("");
    }
    if (cityfrom) {
      setCityfromspan("");
    }
    if (countryto) {
      setCountrytospan("");
    }
    if (stateto) {
      setStatetospan("");
    }
    if (cityto) {
      setCitytospan("");
    }
  };
  const validation = () => {
    empid === "" ? setempidspan("This field is Required") : setempidspan("");
    purposeoftravel === ""
      ? setPurposeoftravelspan("This field is Required")
      : setPurposeoftravelspan("");
    countryfrom === ""
      ? setCountryfromspan("This field is Required")
      : setCountryfromspan("");
    statefrom === ""
      ? setStatefromspan("This field is Required")
      : setStatefromspan("");
    cityfrom === ""
      ? setCityfromspan("This field is Required")
      : setCityfromspan("");
    countryto === ""
      ? setCountrytospan("This field is Required")
      : setCountrytospan("");
    stateto === ""
      ? setStatetospan("This field is Required")
      : setCitytospan("");
    cityto === "" ? setCitytospan("This field is Required") : setCitytospan("");

    datefrom === ""
      ? setDatefromspan("This field is Required")
      : setDatetospan("");
    dateto === "" ? setDatetospan("This field is Required") : setDatetospan("");
    if (
      empid !== "" &&
      purposeoftravel !== "" &&
      countryfrom !== "" &&
      statefrom !== "" &&
      cityfrom !== "" &&
      countryto !== "" &&
      stateto !== "" &&
      cityto !== "" &&
      datefrom !== "" &&
      dateto !== ""
    ) {
      setTravelfrom(countryfrom.concat(",", statefrom).concat(",", cityfrom));
      setTravelto(countryto.concat(",", stateto).concat(",", cityto));
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
                <span>
                  Travel From
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </span>
                <div class="form-group mb-3 col-md-4 col-sm-12">
                  <select
                    values={countryfrom}
                    class="form-select"
                    onChange={(e) => {
                      handlecountryfrom(e.target.value);
                    }}
                  >
                    <option>{countryfrom}</option>
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
                    value={statefrom}
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      handlestatesfrom(e.target.value);
                    }}
                  >
                    <option selected>{statefrom}</option>
                    {statesdatafrom.map((items) => (
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
                    value={cityfrom}
                    aria-label="Default select example"
                    onChange={(e) => {
                      handletravelfrom(e.target.value);
                    }}
                  >
                    <option selected>{cityfrom}</option>
                    {citiesdatafrom.map((items) => (
                      <option key={items} value={items}>
                        {items}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: "red" }}>{cityfromspan}</span>
                </div>
              </div>
              <div className="row p-2">
                <span>
                  Travel To
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </span>
                <div class="form-group mb-3 col-md-4 col-sm-12">
                  <select
                    class="form-select"
                    value={countryto}
                    onChange={(e) => {
                      handlecountryto(e.target.value);
                    }}
                  >
                    <option>{countryto}</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: "red" }}>{countrytospan}</span>
                </div>
                <div class="form-group mb-3 col-md-4 col-sm-12">
                  <select
                    value={stateto}
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      handlestatesto(e.target.value);
                    }}
                  >
                    <option>{stateto}</option>
                    {statesdatato.map((items) => (
                      <option key={items} value={items}>
                        {items}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: "red" }}>{statetospan}</span>
                </div>
                <div class="form-group mb-3 col-md-4 col-sm-12">
                  <select
                    value={cityto}
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      handletravelto(e.target.value);
                    }}
                  >
                    <option>{cityto}</option>
                    {citiesdatato.map((items) => (
                      <option key={items} value={items}>
                        {items}
                      </option>
                    ))}
                  </select>
                  <span style={{ color: "red" }}>{citytospan}</span>
                  <button onClick={() => check()}>check</button>
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
                  // check();
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
