import React from 'react';
import {addJobToCandidate} from '../../services.js';
import '../../../styles/CandidateProfileModal.css';
import {
    getUsers,
    sortUsersByEmailAsc, sortUsersByEmailDesc,
    sortUsersByFirstNameAsc,
    sortUsersByFirstNameDesc, sortUsersByLastNameAsc,
    sortUsersByLastNameDesc
} from "../services";

export default class AllCandidatesModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSuccess: false,
            jobs: [],
            showInfo: true,
            showUsers: true,
            candidates: []
        };

        this.handleAddToReq = this.handleAddToReq.bind(this);
    }

    componentDidMount() {
        getUsers().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        });
        this.setState({showUsers: true});
    }

    sortCandidatebyFirstNameDesc() {
        sortUsersByFirstNameDesc().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    sortCandidatebyFirstNameAsc() {
        sortUsersByFirstNameAsc().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    sortCandidateByLastNameDesc() {
        sortUsersByLastNameDesc().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    sortCandidatebyLastNameAsc() {
        sortUsersByLastNameAsc().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    sortCandidatebyEmailDesc() {
        sortUsersByEmailDesc().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    sortCandidatebyEmailAsc() {
        sortUsersByEmailAsc().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    handleAddToReq(candidate) {
        let payload = {
            jobID: this.props.jobInfo.jobID,
            candidateID: candidate.candidateID
        };

        this.setState({showUsers: false});
        this.setState({showSuccess: true});

        addJobToCandidate(this.props.jobInfo.jobID, payload);
    }

    render() {
        return (
            <div className={"candidateProfileModalContainer"}>
                <div className={"candidateModalHeader"}>
                    <h1>Add Candidate to: {this.props.jobInfo.title}</h1>
                </div>
                <div hidden={!this.state.showUsers}>
                    <table className={"candidatesTable"} id={"candidates-table"}>
                        <tbody>
                        <tr>
                            <th>First<i className="upArrow" onClick={() => this.sortCandidatebyFirstNameAsc()}/><i className="downArrow" onClick={() => this.sortCandidatebyFirstNameDesc()}/></th>
                            <th>Last<i className="upArrow" onClick={() => this.sortCandidatebyLastNameAsc()}/><i className="downArrow" onClick={() => this.sortCandidateByLastNameDesc()}/></th>
                            <th>Email<i className="upArrow" onClick={() => this.sortCandidatebyEmailAsc()}/><i className="downArrow" onClick={() => this.sortCandidatebyEmailDesc()}/></th>
                            <th/>
                        </tr>
                        {this.state.candidates.map(candidate =>
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
                <h3 hidden={!this.state.showSuccess}>Candidate added to {this.props.jobInfo.title}.</h3>
            </div>
        )
    }
}