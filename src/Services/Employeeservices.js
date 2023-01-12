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

  getfiltereddata(startingdate, endingdate) {
    return axios.get(
      baseurl +
        "datefilter?startdate=" +
        startingdate +
        "&enddate=" +
        endingdate
    );
  }

  geteid(id) {
    return axios.get(
      "https://yqiwczwecb.execute-api.ap-south-1.amazonaws.com/empdim?empid=" +
        id
    );
  }

  getCountrycitystate() {
    return axios.get(
      "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
    );
  }
}
export default new Employeeservices();
