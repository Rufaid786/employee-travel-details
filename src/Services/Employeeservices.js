import axios from "axios";

const baseurl =
  "https://0fryeoj2d7.execute-api.ap-south-1.amazonaws.com/employeedetails/";
class Employeeservices {
  getEmployees() {
    return axios.get(baseurl);
  }
  addemployee(emp) {
    return axios.post(baseurl, emp);
  }

  getEmployeebyid(bookid) {
    return axios.get(baseurl + "employeegetbyid?id=" + bookid);
  }
}
export default new Employeeservices();
