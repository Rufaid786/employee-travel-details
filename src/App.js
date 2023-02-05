import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Csvform from "./components/Csvform";
import Employee from "./components/Employee";
import EmployeeForm from "./components/EmployeeForm";

import Navbar from "./components/Navbar";
import Pmoauthorisation from "./components/Pmoauthorisation";
import POM from "./components/POM";

function App() {
  return (
    <div style={{ minWidth: "470px" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<POM />} />
          <Route path="/employeesection" element={<Employee />} />
          <Route path="/employeeform" element={<EmployeeForm />} />
          <Route path="/pmosection" element={<POM />} />
          <Route
            path="/pmoauthorisationandloginsection"
            element={<Pmoauthorisation />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
