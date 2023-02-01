import React, { useEffect, useState } from "react";
import Employeeservices from "../Services/Employeeservices";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { bookingid } from "./Employee";
import { useNavigate } from "react-router-dom";
import { rupeetoDollar } from "./Currencyconversion";
import { Dollartorupee } from "./Currencyconversion";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Form.css";
import Records from "./Records.json";
function EmployeeForm() {
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
  const [accountspan, setAccountspan] = useState("");
  const [projectspan, setProjectspan] = useState("");
  const [empnamespan, setEmpnamespan] = useState("");
  const [countryfromspan, setCountryfromspan] = useState("");
  const [statefromspan, setStatefromspan] = useState("");
  const [cityfromspan, setCityfromspan] = useState("");
  const [countrytospan, setCountrytospan] = useState("");
  const [statetospan, setStatetospan] = useState("");
  const [citytospan, setCitytospan] = useState("");
  const [currency, setCurrency] = useState("");
  const [empidspan, setempidspan] = useState("");
  const [emp, setEmp] = useState([]);
  const [purposeoftravelspan, setPurposeoftravelspan] = useState("");
  const [datefromspan, setDatefromspan] = useState("");
  const [datetospan, setDatetospan] = useState("");
  const [empidnav, setEmpidnav] = useState("");
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/employeesection");
  };
  const [approved, setApproved] = useState("unapproved");
  const [statesdatafrom, setStatesdatafrom] = useState([]);
  const [citiesdatafrom, setCitiesdatafrom] = useState([]);
  const [statesdatato, setStatesdatato] = useState([]);
  const [citiesdatato, setCitiesdatato] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [flightinDollar, setFlightinDollar] = useState("");
  const [hotacinDollar, setHotacindollar] = useState("");
  const [perdiuminDollar, setPerdiumindollar] = useState("");
  const [othercostinDollar, setOthercostindollar] = useState("");
  const [totalCostindollar, setTotalcostindollar] = useState("");
  // finding countries from the dataset.Set is used for unique values means same country will be repeated again and again.By using set repeatation can be avoided.
  // ...is used to convert set back into array.Hence uniquecountries will be an array with unique country names.
  const countries = [...new Set(Records.map((item) => item.country))];
  countries.sort();

  const handlestatesfrom = () => {
    let uniquestatesfrom = Records.filter(
      (state) => state.country === countryfrom
    );
    uniquestatesfrom = [
      ...new Set(uniquestatesfrom.map((state) => state.subcountry)),
    ];
    uniquestatesfrom.sort();
    setStatesdatafrom(uniquestatesfrom);
  };
  const handlecitiesfrom = () => {
    let uniquecitiesfrom = Records.filter(
      (city) => city.subcountry === statefrom
    );
    uniquecitiesfrom = [...new Set(uniquecitiesfrom.map((city) => city.name))];
    uniquecitiesfrom.sort();
    setCitiesdatafrom(uniquecitiesfrom);
  };

  const handlestatesto = () => {
    let uniquestatesto = Records.filter((state) => state.country === countryto);
    uniquestatesto = [
      ...new Set(uniquestatesto.map((state) => state.subcountry)),
    ];
    uniquestatesto.sort();
    setStatesdatato(uniquestatesto);
  };
  const handlecitiesto = () => {
    let uniquecitiesto = Records.filter((city) => city.subcountry === stateto);
    uniquecitiesto = [...new Set(uniquecitiesto.map((city) => city.name))];
    uniquecitiesto.sort();
    setCitiesdatato(uniquecitiesto);
  };
  const handletravelfrom = (city) => {
    setCityfrom(city);
  };
  const handletravelto = (city) => {
    setCityto(city);
  };

  useEffect(() => {
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
          setFlight(success.data.Flight.slice(1, success.data.Flight.length));
          setHotac(success.data.Hotac.slice(1, success.data.Hotac.length));
          setPerdium(
            success.data.Perdiem.slice(1, success.data.Perdiem.length)
          );
          setOthercost(
            success.data["Other cost"].slice(
              1,
              success.data["Other cost"].length
            )
          );

          setTotalcost(
            success.data["Total Cost"].slice(
              1,
              success.data["Total Cost"].length
            )
          );
          setcommentsifany(success.data["Comments if Any"]);
          setEmp(success.data);
          setCurrency(success.data.Currency);
          if (success.data.Currency === "Indian Rupee") {
            setCurrencySymbol("₹");
          } else {
            setCurrencySymbol("$");
          }
        })
        .catch((error) => console.log(error));
    } else {
      setId(uuidv4().slice(0, 6));
    }
  }, []);

  const saveEmployee = (e) => {
    console.log(e);
    console.log(totalcost);
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
      flightinDollar,
      hotacinDollar,
      perdiuminDollar,
      othercostinDollar,
      totalCostindollar,
      currency,
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
      return <h2 className="text-center">Request Update Form</h2>;
    } else {
      return <h2 className="text-center">Travel Request Form</h2>;
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
      Employeeservices.getEmployeebyempid(id)
        .then((success) => {
          if (typeof success.data == "string") {
            setAccount("");
            setProject("");
            setEmpname("");
          } else {
            setAccount(success.data.Account);
            setProject(success.data["Project/Contract"]);
            setEmpname(success.data["Emp Name"]);
            setEmpidnav("");
            setAccountspan("");
            setProjectspan("");
            setEmpnamespan("");
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
    if (account) {
      setAccountspan("");
    }
    if (project) {
      setProjectspan("");
    }
    if (empname) {
      setEmpnamespan("");
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
    account === ""
      ? setAccountspan("This field is Required")
      : setAccountspan("");
    project === ""
      ? setProjectspan("This field is Required")
      : setProjectspan("");
    empname === ""
      ? setEmpnamespan("This field is Required")
      : setEmpnamespan("");
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
      : setDatefromspan("");
    dateto === ""
      ? setDatetospan("This field is Required")
      : datefrom > dateto
      ? setDatetospan("Please select a valid date range")
      : setDatetospan("");
    if (
      empid !== "" &&
      account !== "" &&
      project !== "" &&
      empname !== "" &&
      purposeoftravel !== "" &&
      countryfrom !== "" &&
      statefrom !== "" &&
      cityfrom !== "" &&
      countryto !== "" &&
      stateto !== "" &&
      cityto !== "" &&
      datefrom !== "" &&
      dateto !== "" &&
      datefrom < dateto
    ) {
      setTravelfrom(countryfrom.concat(",", statefrom).concat(",", cityfrom));
      setTravelto(countryto.concat(",", stateto).concat(",", cityto));
      handleShow();
    }
  };
  useEffect(() => {
    dateValidation();
  }, [dateto]);
  const dateValidation = () => {
    if (datefrom > dateto) {
      setDatetospan("Please choose a valid date range");
    } else {
      setDatetospan("");
    }
  };
  const currencySymbolset = () => {
    if (currency === "Indian Rupee") {
      setCurrencySymbol("₹");
      setHotac("");
      setPerdium("");
      setFlight("");
      setOthercost("");
      setTotalcost("");
    } else {
      setCurrencySymbol("$");
      setHotac("");
      setPerdium("");
      setFlight("");
      setOthercost("");
      setTotalcost("");
    }
  };
  useEffect(() => {
    currencySymbolset();
  }, [currency]);
  useEffect(() => {
    currencyConversion();
  }, [flight, hotac, perdiem, othercost, totalcost]);
  const currencyConversion = () => {
    if (currency === "Indian Rupee") {
      let costtoConvert =
        Number(flight) + Number(hotac) + Number(perdiem) + Number(othercost);
      let costinDollar = rupeetoDollar(costtoConvert);
      // cost in dollar error
      setTotalcost(costinDollar.toString());
      setTotalcostindollar("$" + totalcost);
      // setHotacindollar(rupeetoDollar(Number(hotac)).toString());
      setHotacindollar(currencySymbol + hotac);
      setPerdiumindollar(currencySymbol + perdiem);
      setFlightinDollar(currencySymbol + flight);
      setOthercostindollar(currencySymbol + othercost);
    } else {
      let totalCostindollar =
        Number(flight) + Number(hotac) + Number(perdiem) + Number(othercost);
      let roundedCost = (Math.round(totalCostindollar * 1000) / 1000).toFixed(
        2
      );
      setTotalcost(roundedCost.toString());
      setTotalcostindollar("$" + totalcost);
      setHotacindollar(currencySymbol + hotac);
      setPerdiumindollar(currencySymbol + perdiem);
      setOthercostindollar(currencySymbol + othercost);
      setFlightinDollar(currencySymbol + flight);
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
      <div style={{ background: "#f0f2f5" }}>
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
                    getdetails(e.target.value);
                  }}
                  type="text"
                  class="form-control"
                  id="empid"
                  placeholder="Emp ID"
                />
                <span style={{ color: "red" }}>{empidnav}</span>
                <span style={{ color: "red" }}>{empidspan}</span>
              </div>
              <div class="form-group col-md-6 col-sm-12">
                <label for="inputPassword">
                  Account
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>

                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  class="form-control"
                  id="account"
                  onKeyUp={() => keyupvalidation()}
                />
                <span style={{ color: "red" }}>{accountspan}</span>
              </div>
              <div class="form-group mb-3 col-md-6 col-sm-12">
                <label for="inputPassword">
                  Project/Contract
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <input
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  type="text"
                  class="form-control"
                  id="project"
                  onKeyUp={() => keyupvalidation()}
                />
                <span style={{ color: "red" }}>{projectspan}</span>
              </div>
              <div class="form-group  col-md-6 col-sm-12 mb-3">
                <label for="empname">
                  Emp Name
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <input
                  value={empname}
                  onChange={(e) => setEmpname(e.target.value)}
                  type="text"
                  class="form-control"
                  id="empname"
                  onKeyUp={() => keyupvalidation()}
                />
                <span style={{ color: "red" }}>{empnamespan}</span>
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
                  <label for="countryfrom">Country:</label>
                  <select
                    name="countryfrom"
                    values={countryfrom}
                    class="form-select"
                    onChange={(e) => {
                      setCountryfrom(e.target.value);
                      setCountryfromspan("");
                      setStatefrom("");
                      setCityfrom("");
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
                  <label for="statefrom">State:</label>
                  <select
                    name="statefrom"
                    value={statefrom}
                    class="form-select"
                    aria-label="Default select example"
                    onClick={() => handlestatesfrom()}
                    onChange={(e) => {
                      setStatefrom(e.target.value);
                      setStatefromspan("");
                      setCityfrom("");
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
                  <label for="cityfrom">City:</label>
                  <select
                    name="cityfrom"
                    class="form-select"
                    value={cityfrom}
                    aria-label="Default select example"
                    onClick={() => handlecitiesfrom()}
                    onChange={(e) => {
                      setCityfromspan("");
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
                  <label for="countryto">Country:</label>
                  <select
                    name="countryto"
                    class="form-select"
                    value={countryto}
                    onChange={(e) => {
                      setCountryto(e.target.value);
                      setCountrytospan("");
                      setStateto("");
                      setCityto("");
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
                  <label for="stateto">State:</label>
                  <select
                    name="stateto"
                    value={stateto}
                    class="form-select"
                    aria-label="Default select example"
                    onClick={() => {
                      handlestatesto();
                    }}
                    onChange={(e) => {
                      setStateto(e.target.value);
                      setStatetospan("");
                      setCityto("");
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
                  <label for="cityto">City:</label>
                  <select
                    name="cityto"
                    value={cityto}
                    class="form-select"
                    aria-label="Default select example"
                    onClick={() => {
                      handlecitiesto();
                    }}
                    onChange={(e) => {
                      setCitytospan("");
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
              <div className="row">
                <div class="form-group mb-3 col-md-3 col-sm-12">
                  <label for="currencyselection">Choose your currency:</label>
                  <Form.Select onChange={(e) => setCurrency(e.target.value)}>
                    <option>{currency}</option>
                    <option value="Indian Rupee" key="Indian Rupee">
                      Indian Rupee
                    </option>
                    <option
                      value="United States Dollar"
                      key="United States Dollar"
                    >
                      United States Dollar
                    </option>
                  </Form.Select>
                </div>
              </div>
              <div class="form-group mb-3 col-md-6 col-sm-12">
                <Form.Label htmlFor="flightcost">Flight Cost</Form.Label>

                <InputGroup>
                  <InputGroup.Text>{currencySymbol}</InputGroup.Text>
                  <Form.Control
                    value={flight}
                    onChange={(e) => setFlight(e.target.value)}
                    class="form-control"
                    id="flightcost"
                    placeholder="Flight Cost"
                  />
                </InputGroup>
              </div>
              <div class="form-group col-md-6 col-sm-12">
                <Form.Label htmlFor="hotaccost">Hotac Cost</Form.Label>
                <InputGroup>
                  <InputGroup.Text>{currencySymbol}</InputGroup.Text>
                  <Form.Control
                    value={hotac}
                    onChange={(e) => setHotac(e.target.value)}
                    class="form-control"
                    id="hotaccost"
                    placeholder="Hotac cost"
                  />
                </InputGroup>
              </div>
              <div class="form-group mb-3 col-md-6 col-sm-12">
                <Form.Label htmlFor="perdiumcost">Perdium Cost</Form.Label>
                <InputGroup>
                  <InputGroup.Text>{currencySymbol}</InputGroup.Text>
                  <Form.Control
                    value={perdiem}
                    onChange={(e) => setPerdium(e.target.value)}
                    class="form-control"
                    id="perdiumcost"
                    placeholder="Perdium cost"
                  />
                </InputGroup>
              </div>
              <div class="form-group  col-md-6 col-sm-12">
                <Form.Label htmlFor="othercost">Other Cost</Form.Label>
                <InputGroup>
                  <InputGroup.Text>{currencySymbol}</InputGroup.Text>
                  <Form.Control
                    value={othercost}
                    onChange={(e) => setOthercost(e.target.value)}
                    class="form-control"
                    id="othercost"
                    placeholder="Other cost"
                  />
                </InputGroup>
              </div>
              <div class="form-group  mb-3 col-md-3 col-sm-12">
                <Form.Label htmlFor="totalcost">Total Cost</Form.Label>
                <InputGroup>
                  <InputGroup.Text>{"$"}</InputGroup.Text>
                  <Form.Control
                    class="form-control"
                    id="totalcost"
                    value={totalcost}
                    disabled
                  />
                </InputGroup>
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
                class="form-control mt-2 section"
                id="commentsifany"
                value={commentsifany}
                onChange={(e) => setcommentsifany(e.target.value)}
              />
            </div>
          </div>

          <div class="form-group row mt-3">
            <div
              className="mb-5"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
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

export default EmployeeForm;
