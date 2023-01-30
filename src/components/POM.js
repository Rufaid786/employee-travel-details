import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Employeeservices from "../Services/Employeeservices";

function POM() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [span, setSpan] = useState("");
  const navigate = useNavigate();
  const changepage = () => {
    navigate("/pmologinform");
  };
  const validation = () => {
    Employeeservices.getPmoValidation(email, password)
      .then((success) => {
        if (success.data === "Login Success") {
          setSpan("");
          changepage();
        } else {
          setSpan(success.data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-5" style={{ background: "#f0f2f5" }}>
      <form>
        <div class="form-group mb-3">
          <label
            for="exampleInputEmail1"
            className="mb-2"
            style={{ fontSize: "25px" }}
          >
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter PMO email"
          />
        </div>
        <div class="form-group mb-3">
          <label
            for="exampleInputPassword1"
            style={{ fontSize: "25px" }}
            className="mb-2"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => validation()}
        >
          Submit
        </button>
        <br></br>
        <span style={{ color: "red" }}>{span}</span>
      </form>
    </div>
  );
}

export default POM;
