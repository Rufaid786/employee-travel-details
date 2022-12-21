import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Employee from "./components/Employee";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import POM from "./components/POM";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<POM />} />
          <Route path="/employeesection" element={<Employee />} />
          <Route path="/employeeform" element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
