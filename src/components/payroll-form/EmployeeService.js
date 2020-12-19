import AxiosService from "./axios-service";
export default class EmployeeService {
    baseURL = "http://localhost:3000/EmployeePayrollDB/";
    addEmployee(data) {
        return AxiosService.postService(`${this.baseURL}`, data);
    }

    getAllEmployee() {
        return AxiosService.getAllEmpService(`${this.baseURL}`);
    }

    getEmployeeById(id) {
        return AxiosService.getEmployeeById(`${this.baseURL + id}`);
    }

    editDetailsOfEmployee(data) {
        return AxiosService.putService(`${this.baseURL + data.id}`, data);
    }
}