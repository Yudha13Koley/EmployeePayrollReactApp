import './payroll-form.css';
import React from 'react';
import logo from "../../assets/images/logo.png";
import Profile1 from "../../assets/profile-images/Ellipse -1.png";
import Profile2 from "../../assets/profile-images/Ellipse -2.png";
import Profile3 from "../../assets/profile-images/Ellipse -3.png";
import Profile4 from "../../assets/profile-images/Ellipse -4.png";
import Profile5 from "../../assets/profile-images/Ellipse -5.png";
import EmployeeService from "./EmployeeService";
import { Link } from 'react-router-dom';

class PayrollForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            profilePic: '',
            gender: '',
            department: [],
            salary: 50000,
            day: "1",
            month: "0",
            year: "2020",
            startDate: '',
            note: '',
            NameErr: '',
            StartDateErr: '',
            isUpdate: false,
            id: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeProfilePicHandler = this.changeProfilePicHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeDayHandler = this.changeDayHandler.bind(this);
        this.changeMonthHandler = this.changeMonthHandler.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.checkForUpdate);
    }

    checkForUpdate = () => {
        const employeePayrollJson = localStorage.getItem('editEmp');
        let isUpdateAv = employeePayrollJson ? true : false;
        if (!isUpdateAv) return;
        let employeePayrollObj = JSON.parse(employeePayrollJson);
        this.setForm(employeePayrollObj);
    }

    setForm = (obj) => {
        let date = this.stringifyDate(obj.startDate).split(" ");
        this.setMonthValue(date[1]);
        this.setGender(obj.gender);
        this.setProfilePic(obj.profilePic);
        this.setDepartment(obj.department);
        this.setState({
            name: obj.name,
            profilePic: obj.profilePic,
            gender: obj.gender,
            department: obj.department,
            salary: obj.salary,
            day: date[0],
            year: date[2],
            startDate: obj.startDate,
            note: obj.note,
            NameErr: '',
            StartDateErr: '',
            isUpdate: true,
            id: obj.id
        });
    }

    setDepartment = (deptArr) => {
        for (let dept of deptArr) {
            if (this.refs.dep1.value === dept) {
                this.refs.dep1.checked = true;
            }
            if (this.refs.dep2.value === dept) {
                this.refs.dep2.checked = true;
            }
            if (this.refs.dep3.value === dept) {
                this.refs.dep3.checked = true;
            }
            if (this.refs.dep4.value === dept) {
                this.refs.dep4.checked = true;
            }
            if (this.refs.dep5.value === dept) {
                this.refs.dep5.checked = true;
            }
        }
    }

    setGender = (string) => {
        if (this.refs.gender1.value === string) {
            this.refs.gender1.checked = true;
        }
        if (this.refs.gender2.value === string) {
            this.refs.gender2.checked = true;
        }
        if (this.refs.gender3.value === string) {
            this.refs.gender3.checked = true;
        }
    }

    setProfilePic = (string) => {
        if (this.refs.profileImg1.value === string) {
            this.refs.profileImg1.checked = true;
        }
        if (this.refs.profileImg2.value === string) {
            this.refs.profileImg2.checked = true;
        }
        if (this.refs.profileImg3.value === string) {
            this.refs.profileImg3.checked = true;
        }
        if (this.refs.profileImg4.value === string) {
            this.refs.profileImg4.checked = true;
        }
        if (this.refs.profileImg5.value === string) {
            this.refs.profileImg5.checked = true;
        }
    }

    setMonthValue = (value) => {
        switch (value) {
            case "January": value = "0";
                break;
            case "February": value = "1";
                break;
            case "March": value = "2";
                break;
            case "April": value = "3";
                break;
            case "May": value = "4";
                break;
            case "June": value = "5";
                break;
            case "July": value = "6";
                break;
            case "August": value = "7";
                break;
            case "September": value = "8";
                break;
            case "October": value = "9";
                break;
            case "November": value = "10";
                break;
            case "December": value = "11";
                break;
            default: value = "1";
        }
        this.setState({ month: value })
    }

    checkName = (name) => {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (!nameRegex.test(name)) {
            throw 'Name is Incorrect !';
        }
    }

    checkStartDate = (year, month, day) => {
        let startDate = new Date(Date.UTC(year, month, day));
        if (startDate > new Date()) {
            throw 'Date is A Future Date !';
        }
        var diff = Math.abs(new Date().getTime() - startDate.getTime());
        if (diff / (1000 * 60 * 60 * 24) > 30) {
            throw 'Date is Not Within 30 Days !';
        }
    }

    changeNameHandler = (event) => {
        try {
            if (event.target.value.length !== 0) {
                this.checkName(event.target.value);
            }
            this.setState({ NameErr: '' });
        } catch (e) {
            this.setState({ NameErr: e });
        }
        this.setState({ name: event.target.value });
    }

    changeProfilePicHandler = (event) => {
        this.setState({ profilePic: event.target.value });
    }

    changeGenderHandler = (event) => {
        this.setState({ gender: event.target.value });
    }

    changeDepartmentHandler = (event) => {
        if (event.target.checked) {
            this.setState({ department: this.state.department.concat(event.target.value) });
        }
        if (!event.target.checked) {
            let index = 0;
            let arr = this.state.department;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === event.target.value) {
                    index = i;
                }
            }
            arr.splice(index, 1);
            this.setState({ department: arr });
        }
    }

    changeSalaryHandler = (event) => {
        this.setState({ salary: event.target.value });
    }

    changeDayHandler = (event) => {
        this.setState({ day: event.target.value });
        this.checkDateErr(this.state.year, this.state.month, event.target.value);
    }

    changeMonthHandler = (event) => {
        this.setState({ month: event.target.value });
        this.checkDateErr(this.state.year, event.target.value, this.state.day);
    }

    changeYearHandler = (event) => {
        this.setState({ year: event.target.value });
        this.checkDateErr(event.target.value, this.state.month, this.state.day);
    }

    changeNoteHandler = (event) => {
        this.setState({ note: event.target.value });
    }

    checkDateErr = (year, month, day) => {
        try {
            this.checkStartDate(year, month, day);
            this.setState({ StartDateErr: '' })
        } catch (e) {
            this.setState({ StartDateErr: e })
        }
    }

    stringifyDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
        return newDate;
    }

    save = async (event) => {
        event.preventDefault();
        alert(`${this.state.name} ${this.state.gender} ${this.state.profilePic} ${this.state.department} ${this.state.salary} ${this.stringifyDate(new Date(Date.UTC(this.state.year, this.state.month, this.state.day)))} ${this.state.note}`);

        let object = {
            id: this.state.id,
            name: this.state.name,
            profilePic: this.state.profilePic,
            gender: this.state.gender,
            department: this.state.department,
            salary: this.state.salary,
            startDate: new Date(Date.UTC(this.state.year, this.state.month, this.state.day)),
            note: this.state.note
        }
        if (!this.state.isUpdate) {
            new EmployeeService().addEmployee(object).then(data => {
                console.log("Data Added Successfully !");
            }).catch(err => {
                console.log("Error While Adding !");
            });
        }
        if (this.state.isUpdate) {
            new EmployeeService().editDetailsOfEmployee(object).then(data => {
                console.log("Data Edited Successfully !");
                this.setState({ isUpdate: false });
            }).catch(err => {
                console.log("Error While Adding !");
            });
        }

        window.location.replace("../");
    }

    reset = () => {
        this.setState({
            name: '',
            profilePic: '',
            gender: '',
            department: [],
            salary: 50000,
            day: "1",
            month: "0",
            year: "2020",
            startDate: '',
            note: '',
            NameErr: '',
            StartDateErr: ''
        });
    }

    render() {
        return (
            <body>
                <header class="header-content header">
                    <div class="logo-content">
                        <img class="logo-content-img" src={logo} alt="Logo" />
                        <div>
                            <span class="emp-text">EMPLOYEE</span><br />
                            <span class="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div id="formId" class="form-content">
                    <form class="form" action="#" onSubmit={this.save} onReset={this.reset}>
                        <div class="form-head">Employee Payroll Form</div>
                        <div class="row-content">
                            <label for="name" class="label text">Name</label>
                            <input type="text" class="input" id="name" name="name" value={this.state.name} onChange={this.changeNameHandler} placeholder="Your Name ..." required />
                            <error-output class="text-error" for="text">{this.state.NameErr}</error-output>
                        </div>
                        <div class="row-content">
                            <label for="profile" class="label text">Profile Image</label>
                            <div class="profile-radio-content">
                                <label>
                                    <input type="radio" id="profile1" name="profile" onChange={this.changeProfilePicHandler} value="../../assets/profile-images/Ellipse -1.png" ref="profileImg1"
                                        required />
                                    <img src={Profile1} class="profile" id="image1" alt="" />
                                </label>
                                <label>
                                    <input type="radio" id="profile2" name="profile" onChange={this.changeProfilePicHandler} value="../../assets/profile-images/Ellipse -2.png" ref="profileImg2"
                                        required />
                                    <img src={Profile2} class="profile" id="image2" alt="" />
                                </label>
                                <label>
                                    <input type="radio" id="profile3" name="profile" onChange={this.changeProfilePicHandler} value="../../assets/profile-images/Ellipse -3.png" ref="profileImg3"
                                        required />
                                    <img src={Profile3} class="profile" id="image3" alt="" />
                                </label>
                                <label>
                                    <input type="radio" id="profile4" name="profile" onChange={this.changeProfilePicHandler} value="../../assets/profile-images/Ellipse -4.png" ref="profileImg4"
                                        required />
                                    <img src={Profile4} class="profile" id="image4" alt="" />
                                </label>
                                <label>
                                    <input type="radio" id="profile5" name="profile" onChange={this.changeProfilePicHandler} value="../../assets/profile-images/Ellipse -5.png" ref="profileImg5"
                                        required />
                                    <img src={Profile5} class="profile" id="image5" alt="" />
                                </label>
                            </div>
                        </div>
                        <div class="row-content">
                            <label for="gender" class="label text">Gender</label>
                            <div>
                                <input type="radio" id="male" name="gender" value="male" onChange={this.changeGenderHandler} ref="gender1" />
                                <label for="male" class="text">Male</label>
                                <input type="radio" id="female" name="gender" value="female" onChange={this.changeGenderHandler} ref="gender2" />
                                <label for="female" class="text">Female</label>
                                <input type="radio" id="others" name="gender" value="others" onChange={this.changeGenderHandler} ref="gender3" />
                                <label for="others" class="text">Others</label>
                            </div>
                        </div>
                        <div class="row-content">
                            <label for="department" class="label text">Department</label>
                            <div>
                                <input type="checkbox" class="checkbox" id="hr" name="department" value="HR" onChange={this.changeDepartmentHandler} ref="dep1" />
                                <label class="text" for="hr">HR</label>
                                <input type="checkbox" class="checkbox" id="sales" name="department" value="Sales" onChange={this.changeDepartmentHandler} ref="dep2" />
                                <label class="text" for="sales">Sales</label>
                                <input type="checkbox" class="checkbox" id="finance" name="department" value="Finance" onChange={this.changeDepartmentHandler} ref="dep3" />
                                <label class="text" for="finance">Finance</label>
                                <input type="checkbox" class="checkbox" id="engineer" name="department" value="Engineer" onChange={this.changeDepartmentHandler} ref="dep4" />
                                <label class="text" for="engineer">Engineer</label>
                                <input type="checkbox" class="checkbox" id="others" name="department" value="Others" onChange={this.changeDepartmentHandler} ref="dep5" />
                                <label class="text" for="others">Others</label>
                            </div>
                        </div>
                        <div class="row-content">
                            <label for="salary" class="label text salary-label">Choose Your Salary :</label>
                            <input style={{ width: '100%' }} type="range" name="salary" id="salary" min="25000" max="100000" step="1000"
                                value={this.state.salary} onChange={this.changeSalaryHandler} />
                            <output class="salary-output text" for="salary">{this.state.salary}</output>
                        </div>
                        <div class="row-content">
                            <label for="startdate" class="label text">Start Date :</label>
                            <div name="startdate" id="startdate">
                                <select name="day" id="day" value={this.state.day} onChange={this.changeDayHandler}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                                <select name="month" id="month" value={this.state.month} onChange={this.changeMonthHandler}>
                                    <option value="0">January</option>
                                    <option value="1">February</option>
                                    <option value="2">March</option>
                                    <option value="3">April</option>
                                    <option value="4">May</option>
                                    <option value="5">June</option>
                                    <option value="6">July</option>
                                    <option value="7">August</option>
                                    <option value="8">September</option>
                                    <option value="9">October</option>
                                    <option value="10">November</option>
                                    <option value="11">December</option>
                                </select>
                                <select name="year" id="year" value={this.state.year} onChange={this.changeYearHandler}>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                </select>
                            </div>
                            <error-output class="date-error" for="startdate">{this.state.StartDateErr}</error-output>
                        </div>
                        <div class="row-content">
                            <label for="notes" class="label text">Notes</label>
                            <textarea class="input" name="notes" id="notes" style={{ height: '100px' }}
                                placeholder="Your Notes Here.." value={this.state.note} onChange={this.changeNoteHandler}></textarea>
                        </div>
                        <div class="buttonParent">
                            <Link to="home-page" class="resetButton button cancelButton">Cancel</Link>
                            <div class="submit-reset">
                                <button type="submit" class="button submitButton">Submit</button>
                                <button type="reset" class="resetButton button">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </body>
        );
    }

}

export default PayrollForm;