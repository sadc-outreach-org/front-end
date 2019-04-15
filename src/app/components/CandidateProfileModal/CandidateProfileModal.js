import React from 'react';
import {getJobs, addJobToCandidate, setInterviewForApplication, getApplicationsForUser} from '../../services.js';
import '../../../styles/CandidateProfileModal.css';
import Calendar from "react-calendar";

const currentApplications = [];

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
            date: new Date(),
            currentApplication: []
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
            this.state.jobs.forEach(job => {
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
        this.props.changeInterviewState();

        if(this.state.showAddToReq === true) {
            this.setState({showAddToReq: false});
            this.setState({buttonText1: "Send Email"});
            this.setState({buttonText2: "Assign to New Requisition"});
            this.setState({showSuccess: false});
        }
        if(this.state.showCalendar === true) {
            this.setState({showCalendar: false});
            this.setState({buttonText1: "Send Email"});
            this.setState({buttonText2: "Assign to New Requisition"});
            this.setState({showSuccess: false});
        }
    }

    addZ(n){return n<10? '0'+n:''+n;}

    convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if(hours === '12') {
            hours = '00';
        }
        if(modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        hours = this.addZ(hours);
        return `${hours}:${minutes}`;
    };

    handleScheduleClick () {
        this.props.changeInterviewState();

        if(this.state.showCalendar === false) {
            this.setState({showInfo: false});
            this.setState({buttonText1: "Cancel"});
            this.setState({buttonText2: "Schedule"});
            this.setState({showCalendar: true});
        } else if(this.state.showCalendar === true) {

            getApplicationsForUser(this.props.info.candidateID).then(res => {
               const applications = res.data.result;
               applications.forEach(app => {
                  if(app.status === this.props.currentCandidate.status) {
                      currentApplications.push(app);
                  }
               });

                let payload = {
                    "interviewTime": this.state.date.getFullYear()+"-"
                        +this.addZ(this.state.date.getMonth()+1)+"-"
                        +this.addZ(this.state.date.getDay())+" "
                        +this.convertTime12to24(document.getElementById("timeSelection").value)+":00"
                };

                setInterviewForApplication(currentApplications[0].applicationID, payload);
            });
        }
    }

    render() {
        return (
            <div className={"candidateProfileModalContainer"}>
                <div className={"candidateModalHeader"}>
                    <h1>{this.props.info.firstName + " " + this.props.info.lastName}</h1>
                </div>
                <div hidden={!this.state.showInfo} className={"candidateModalInfo"}>
                    <p><strong>Email: </strong><a href={"mailto:"+this.props.info.email}>{this.props.info.email}</a></p>
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
                    <div className={"timeSelect"}>
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
                    <button className={"candidateProfileModalButton"} id={"candidateProfileModalButton1"} onClick={this.handleCancelClick}><a href={"mailto:"+this.props.info.email}>{this.state.buttonText1}</a></button>
                    <button className={"candidateProfileModalButton"} id={"candidateProfileModalButton2"} onClick={() => this.handleAddToReqClick(this.props.info.candidateID, document.getElementById("reqSelection").value)}>{this.state.buttonText2}</button>
                </div>
            </div>
        )
    }
}