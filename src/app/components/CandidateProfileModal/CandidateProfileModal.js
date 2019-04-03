import React from 'react';
import {getJobs} from '../../services.js';
import '../../../styles/CandidateProfileModal.css';
import {getCandidateInfo} from "../services";

export default class ApplicationStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddToReq: false,
            jobs: [],
            buttonText1: "Send Email",
            buttonText2: "Assign to New Requisition"
        };

        this.handleAddToReqClick = this.handleAddToReqClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleAddToReqClick () {
        this.setState({buttonText1: "Cancel"});
        this.setState({buttonText2: "Assign"});
        this.setState({showAddToReq: true});
        getJobs().then(res => {
            const jobs = res.data.result;
            this.setState({jobs: jobs});
            console.log(jobs);
        })
    }

    handleCancelClick () {
        if(this.state.showAddToReq === true) {
            this.setState({showAddToReq: false});
            this.setState({buttonText1: "Send Email"});
            this.setState({buttonText2: "Assign to New Requisition"});
        }
    }

    render() {
        return (
            <div className={"candidateProfileModalContainer"}>
                <h1>{this.props.info.firstName + " " + this.props.info.lastName}</h1>
                <p><strong>Email: </strong><a href={"mailto:"+this.props.info.email}>{this.props.info.email}</a></p>
                <p><strong>Phone:</strong>{" " + this.props.info.phoneNum}</p>
                <p><strong>Address:</strong>{" " + this.props.info.streetAddress}</p>
                <p><strong>Location:</strong>{" " + this.props.info.city + ", " + this.props.info.state}</p>
                <p hidden={!this.state.showAddToReq}>Conditional Text!</p>
                <div className={"candidateProfileModalButtons"}>
                    <button id={"candidateProfileModalButton1"} onClick={this.handleCancelClick}><a href={"mailto:"+this.props.info.email}>{this.state.buttonText1}</a></button>
                    <button id={"candidateProfileModalButton2"} onClick={this.handleAddToReqClick}>{this.state.buttonText2}</button>
                </div>
            </div>
        )
    }
}