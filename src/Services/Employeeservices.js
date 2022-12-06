import axios from "axios";

class Employeeservices {
  getEmployees() {
    return axios.get(
      "https://gqdo0tn2dh.execute-api.ap-south-1.amazonaws.com/emp"
    );
  }
  addEmployees(emp) {
    return axios.post(
      "https://tkblde9dkd.execute-api.ap-south-1.amazonaws.com/emp/",
      emp
    );
  }
}
export default new Employeeservices();
