import React, { useState } from "react";
import Csvform from "./Csvform";

function POM() {
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [span, setSpan] = useState("");
  const validation = () => {
    if (email === "Pmo@gmail.com" && password === "Pmo@123") {
      setSpan("");
      setShowResults(true);
    } else {
      setShowResults(false);
      setSpan("Please provide correct email and password");
    }
  };
  return (
    <div className="container p-5" style={{ background: "#f0f2f5" }}>
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
        <div>
          {showResults ? (
            <Csvform
              setShowResults={setShowResults}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default POM;
