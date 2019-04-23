import React from 'react';
import {getJobs, addJobToCandidate, setInterviewForApplication, getApplicationsForUser, getCandidateInfo} from '../../services.js';
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
            leftButtonText: "Send Email",
            rightButtonText: "Assign to New Requisition",
            selectedReq: '',
            showInfo: true,
            showCalendar : false,
            date: new Date(),
            currentApplication: [],
            successText: "Interview Scheduled."
        };

        this.handleRightButtonClick = this.handleRightButtonClick.bind(this);
        this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this);
        this.handleScheduleClick = this.handleScheduleClick.bind(this);
    }

    handleRightButtonClick(candidateID, jobTitle) {

        if(this.state.rightButtonText === "Assign to New Requisition") {

            console.log("Assign to New Req Clicked");
            this.setState({leftButtonText : "Cancel"});
            this.setState({rightButtonText : "Assign"});
            if(this.props.initialReadyForInterview === true) {
                this.props.changeInterviewState();
            }
            if(this.state.showAddToReq === false) {
                this.setState({showAddToReq : true});
                getJobs().then(res => {
                    const jobs = res.data.result;
                    this.setState({jobs: jobs});
                })
            }

            if(this.props.readyForInterview === true) {
                this.props.changeInterviewState();
            }

        } else if(this.state.rightButtonText === "Schedule") {

            this.setState({leftButtonText : "Send Email"});
            this.setState({rightButtonText : "Assign to New Requisition"});
            this.setState({successText : "Interview Scheduled."});
            this.setState({showCalendar: false});
            this.setState({showInfo: true});
            this.setState({showSuccess: true});

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
                        +(this.state.date.getDay())+" "
                        +this.convertTime12to24(document.getElementById("timeSelection").value)+":00"
                };

                console.log(payload);

                // setInterviewForApplication(currentApplications[0].applicationID, payload).then(res => {
                //     console.log("Set Interview Responses: " + JSON.stringify(res));
                // });
            });

        } else if(this.state.rightButtonText === "Assign") {

            this.setState({leftButtonText : "Send Email"});
            this.setState({rightButtonText : "Assign to New Requisition"});
            this.setState({successText : "Candidate successfully added."});
            if(this.state.showAddToReq === true) {
                this.setState({showSuccess: true});
                this.setState({showAddToReq : false});
                this.state.jobs.forEach(job => {
                    if(jobTitle === job.title) {
                        let payload = {
                            jobID: job.jobID,
                            candidateID: candidateID
                        };
                        addJobToCandidate(job.jobID, payload).then(res => {
                            console.log("Add Job To Candidate Response: " + JSON.stringify(res));
                        })
                    }
                })
            }
        }

    }

    handleLeftButtonClick () {
        if(this.state.leftButtonText === "Cancel") {

            this.setState({leftButtonText: "Send Email"});
            this.setState({rightButtonText: "Assign to New Requisition"});

            if(this.props.initialReadyForInterview === true) {
                this.props.changeInterviewState();
            }

            if(this.state.showAddToReq === true) {
                this.setState({showAddToReq: false});
            }

            if(this.state.showCalendar === true) {
                this.setState({showCalendar: false});
                this.setState({showInfo: true});
            }

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
        if(this.state.showCalendar === false) {
            this.setState({showInfo: false});
            this.setState({leftButtonText: "Cancel"});
            this.setState({rightButtonText: "Schedule"});
            this.setState({showCalendar: true});
            this.props.changeInterviewState();
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
                    <p><strong>Address:</strong>{" " + this.props.moreCandidateInfo.streetAddress}</p>
                    <p><strong>Location:</strong>{" " + this.props.moreCandidateInfo.city + ", " + this.props.moreCandidateInfo.state}</p>
                </div>
                <p hidden={!this.state.showSuccess}>{this.state.successText}</p>
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
                    <p hidden={!this.state.showSuccess}>{this.state.successText}</p>
                </div>
                <div hidden={!this.props.readyForInterview}><button onClick={this.handleScheduleClick} className={"scheduleInterviewBtn"}>Schedule Interview</button></div>
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
                </div>
                <div className={"candidateProfileModalButtons"}>
                    <button className={"candidateProfileModalButton"} id={"candidateProfileModalButton1"} onClick={this.handleLeftButtonClick}><a href={"mailto:"+this.props.info.email}>{this.state.leftButtonText}</a></button>
                    <button className={"candidateProfileModalButton"} id={"candidateProfileModalButton2"} onClick={() => this.handleRightButtonClick(this.props.info.candidateID, document.getElementById("reqSelection").value)}>{this.state.rightButtonText}</button>
                </div>
            </div>
        )
    }
}