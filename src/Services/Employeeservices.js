import axios from "axios";

const baseurl =
  "https://ige5g8yjma.execute-api.ap-south-1.amazonaws.com/employee/";
class Employeeservices {
  getEmployees() {
    return axios.get(baseurl);
  }
  addemployee(emp) {
    return axios.post(baseurl, emp);
  }

  getEmployeebyid(bookid) {
    return axios.get(baseurl + "empget?id=" + bookid);
  }

  deleteEmployeebyid(bookingid) {
    return axios.delete(baseurl + "?id=" + bookingid);
  }

  getfiltereddata(startingdate, endingdate) {
    return axios.get(
      baseurl +
        "datefilter?startdate=" +
        startingdate +
        "&enddate=" +
        endingdate
    );
  }

  getPmoValidation(email, password) {
    return axios.get(baseurl + "Pmo?email=" + email + "&password=" + password);
  }

  getEmployeebyempid(eid) {
    return axios.get(baseurl + "employeeid?empid=" + eid);
  }
}
export default new Employeeservices();
