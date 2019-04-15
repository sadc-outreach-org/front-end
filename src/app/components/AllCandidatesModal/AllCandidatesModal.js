import React from 'react';
import {getJobs, addJobToCandidate, setInterviewForApplication, getApplicationsForUser} from '../../services.js';
import '../../../styles/CandidateProfileModal.css';

export default class AllCandidatesModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSuccess: false,
            jobs: [],
            showInfo: true,
        };

        this.handleAddToReq = this.handleAddToReq.bind(this);
    }

    handleAddToReq(candidate) {
        let payload = {
            jobID: this.props.jobInfo.jobID,
            candidateID: candidate.candidateID
        };

        addJobToCandidate(this.props.jobInfo.jobID, payload);
    }

    render() {
        return (
            <div className={"candidateProfileModalContainer"}>
                <div className={"candidateModalHeader"}>
                    <h1>Add Candidate to: {this.props.jobInfo.title}</h1>
                </div>
                <table className={"candidatesTable"} id={"candidates-table"}>
                    <tbody>
                    <tr>
                        <th>First</th>
                        <th>Last</th>
                        <th>Email</th>
                        <th/>
                    </tr>
                    {this.props.candidates.map(candidate =>
                        <tr className={"candidateProfileModalContainer row"}>
                            <td>{candidate.firstName}</td>
                            <td>{candidate.lastName}</td>
                            <td>{candidate.email}</td>
                            <td><form><input type="submit" value="Add" style={{width : '100%'}} className={"candidateProfileModalContainer addToReqButton"} onClick={() => this.handleAddToReq(candidate)}/></form></td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}