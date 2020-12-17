import AxiosService from "./axios-service";
export default class EmployeeService {
    baseURL = "http://localhost:3000/EmployeePayrollDB/";
    addEmployee(data) {
        return AxiosService.postService(`${this.baseURL}`, data);
    }
}