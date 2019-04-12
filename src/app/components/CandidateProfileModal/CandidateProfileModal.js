import React from 'react';
import {getJobs, addJobToCandidate} from '../../services.js';
import '../../../styles/CandidateProfileModal.css';
import Calendar from "react-calendar";

export default class CandidateProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddToReq: false,
            showSuccess: false,
            jobs: [],
            buttonText1: "Send Email",
            buttonText2: "Assign to New Requisition",
            selectedReq: '',
            showInfo: true,
            showCalendar : false,
            date: new Date()
        };

        this.handleAddToReqClick = this.handleAddToReqClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleScheduleClick = this.handleScheduleClick.bind(this);
    }

    handleAddToReqClick (candidateID, jobTitle) {
        if(this.state.showAddToReq === false) {
            this.setState({buttonText1: "Cancel"});
            this.setState({buttonText2: "Assign"});
            this.setState({showAddToReq: true});
            getJobs().then(res => {
                const jobs = res.data.result;
                this.setState({jobs: jobs});
            })
        }

        if(this.state.showAddToReq === true) {
            this.setState({showSuccess: true});
            console.log("Job Title: " + jobTitle);
            this.state.jobs.map(job => {
                if(jobTitle === job.title) {
                    console.log(job.jobID);
                    let payload = {
                        jobID: job.jobID,
                        candidateID: candidateID
                    };
                    console.log(payload);
                    addJobToCandidate(job.jobID, payload).then(res => {
                        console.log(res);
                    });
                }
            });
        }
    }

    handleCancelClick () {
        if(this.state.showAddToReq === true) {
            this.setState({showAddToReq: false});
            this.setState({buttonText1: "Send Email"});
            this.setState({buttonText2: "Assign to New Requisition"});
            this.setState({showSuccess: false});
        }
    }

    handleScheduleClick () {
        if(this.state.showCalendar === false) {
            this.setState({showInfo: false});
            this.setState({showCalendar: true});
        } else if(this.state.showCalendar === true) {
            console.log("Date selected: " + this.state.date + document.getElementById("timeSelection").value);
            console.log("Month/Day/Year Selected: " + this.state.date.getMonth() + ' ' + this.state.date.getDay() + ' ' + this.state.date.getFullYear());
        }
    }

    render() {
        return (
            <div className={"candidateProfileModalContainer"}>
                <h1>{this.props.info.firstName + " " + this.props.info.lastName}</h1>
                <div hidden={!this.state.showInfo}>
                    <p><strong>Email:</strong><a href={"mailto:"+this.props.info.email}>{this.props.info.email}</a></p>
                    <p><strong>Phone:</strong>{" " + this.props.info.phoneNum}</p>
                    <p><strong>Address:</strong>{" " + this.props.info.streetAddress}</p>
                    <p><strong>Location:</strong>{" " + this.props.info.city + ", " + this.props.info.state}</p>
                </div>
                <div hidden={!this.state.showCalendar} className={"calendarContainer"}>
                    <Calendar
                        value={this.state.date}
                        onClickDay={(value) => this.setState({date : value})}
                    />
                </div>
                <div hidden={!this.state.showCalendar}>
                    <select id={"timeSelection"}>
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>1:00 PM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                        <option>5:00 PM</option>
                    </select>
                </div>
                <div hidden={!this.props.readyForInterview}><button onClick={this.handleScheduleClick}>Schedule Interview</button></div>
                <div className={"addReqToCandidateText"} hidden={!this.state.showAddToReq}>
                    <p>Assign <strong>{this.props.info.firstName}</strong> to:
                    <select id={"reqSelection"}>
                        {this.state.jobs.map(job =>
                            <option>
                                {job.title}
                            </option>
                        )};
                    </select>?
                    </p>
                    <p hidden={!this.state.showSuccess}>Candidate successfully added.</p>
                </div>
                <div className={"candidateProfileModalButtons"}>
                    <button id={"candidateProfileModalButton1"} onClick={this.handleCancelClick}><a href={"mailto:"+this.props.info.email}>{this.state.buttonText1}</a></button>
                    <button id={"candidateProfileModalButton2"} onClick={() => this.handleAddToReqClick(this.props.info.candidateID, document.getElementById("reqSelection").value)}>{this.state.buttonText2}</button>
                </div>
            </div>
        )
    }
}