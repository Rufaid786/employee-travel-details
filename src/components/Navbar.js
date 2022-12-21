import React from "react";

function Navbar() {
  return (
    <div>
      <ul class="nav nav-tabs " style={{ backgroundColor: "rgb(33 112 229)" }}>
        <li class="nav-item">
          <a
            class="nav-link"
            style={{ fontSize: "2rem", color: "white" }}
            href="/"
          >
            POM
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            style={{ fontSize: "2rem", color: "white" }}
            href="employeesection"
          >
            Employee
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
