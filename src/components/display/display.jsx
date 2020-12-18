import React from 'react';
import './display.css';
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import editIcon from '../../assets/icons/create-black-18dp.svg';
import { withRouter } from 'react-router-dom';
import Profile1 from "../../assets/profile-images/Ellipse -1.png";
import Profile2 from "../../assets/profile-images/Ellipse -2.png";
import Profile3 from "../../assets/profile-images/Ellipse -3.png";
import Profile4 from "../../assets/profile-images/Ellipse -4.png";
import Profile5 from "../../assets/profile-images/Ellipse -5.png";

const Display = (props) => {
    return (
        <table id="display" className="display">
            <tbody>
                <tr key={-1}>
                    <th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Startdate</th>
                    <th>Actions</th>
                </tr>
                {
                    props.employeeArray && props.employeeArray.map((element, ind) => (
                        <tr key={ind}>
                            <td><img src={handleProfilePic(element.profilePic)} alt="" /></td>
                            <td>{element.name}</td>
                            <td>{element.gender}</td>
                            <td>{element.department && element.department.map(dept => (<div className="dept-label">{dept}</div>))}</td>
                            <td>{element.salary}</td>
                            <td>{stringifyDate(element.startDate)}</td>
                            <td><img src={deleteIcon} onClick={() => remove(element.id)} alt="delete" />
                                <img src={editIcon} onClick={() => edit(element.id)} alt="edit" /></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
const profileArr = ["../../assets/profile-images/Ellipse -1.png", "../../assets/profile-images/Ellipse -2.png", "../../assets/profile-images/Ellipse -3.png", "../../assets/profile-images/Ellipse -4.png", "../../assets/profile-images/Ellipse -5.png"];
const handleProfilePic = (profilePath) => {
    let index;
    for (let i = 0; i < profileArr.length; i++) {
        if (profileArr[i] === profilePath) {
            index = i;
        }
    }
    switch (index) {
        case 0: return Profile1;
        case 1: return Profile2;
        case 2: return Profile3;
        case 3: return Profile4;
        case 4: return Profile5;
        default: return null;
    }
}

const remove = (id) => {
    console.log("Delete Opertaion");
}

const edit = (id) => {
    console.log("Edit Operation");
}

const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

export default withRouter(Display);

