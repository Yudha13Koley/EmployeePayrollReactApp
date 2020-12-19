import React from 'react';
import logo from "../../assets/images/logo.png";
import './homepage.css';
import { Link } from 'react-router-dom';
import Display from '../display/display';
import EmployeeService from "../payroll-form/EmployeeService";
import addButton from "../../assets/icons/add-24px.svg";

class homePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeArray: []
        }
        this.getEmployeeList = this.getEmployeeList.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.getEmployeeList);
    }

    getEmployeeList() {
        new EmployeeService().getAllEmployee().then(data => {
            console.log("Data After Get Call : " + data.data);
            this.setState({ employeeArray: data.data });
            console.log(this.state.employeeArray);
            localStorage.removeItem('editEmp');
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <header className="header-content header">
                    <div className="logo-content">
                        <img className="logo-content-img" src={logo} alt="Logo" />
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br />
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div class="main-content">
                    <div class="header-content">
                        <div class="emp-detail-text">Employee Details<div className="emp-count">{this.state.employeeArray.length}</div>
                        </div>
                        <Link to="payroll-form" className="add-button"><img src={addButton}
                            alt="" />Add User</Link>
                    </div>
                    <div className="table-main">
                        <Display employeeArray={this.state.employeeArray} />
                    </div>
                </div>
            </div>
        );
    }
}

export default homePage;