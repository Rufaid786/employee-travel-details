import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Csvform from "./components/Csvform";
import Employee from "./components/Employee";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import POM from "./components/POM";

function App() {
  return (
    <div style={{ minWidth: "470px" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<POM />} />
          <Route path="/employeesection" element={<Employee />} />
          <Route path="/employeeform" element={<Form />} />
          <Route path="/pmosection" element={<POM />} />
          <Route path="/pmologinform" element={<Csvform />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
