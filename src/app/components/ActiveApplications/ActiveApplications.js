import React from 'react';
import '../../../styles/ActiveApplications.css';
import {getRequisitions, getApplicationsForReq, getApplicationDetails, getCandidateInfo} from '../../services.js';
import CandidateProfileModal from '../CandidateProfileModal/CandidateProfileModal';
import logo from "../../../images/heb-red.png";
import Modal from 'react-modal';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.7)';

const customStyling = {
    content : {
        top: '40%',
        left: '50%',
        height: '70%',
        padding: '0',
        transform: 'translate(-50%, -50%)'
    }
};

export default class ActiveApplications extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            reqs: [],
            applications: [],
            currentApplication: [],
            info: [],
            readyForInterview: false,
            showCalendar: false,
            showModal: false,
            moreCandidateInfo: []
        };

        this.handleReqClick = this.handleReqClick.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleReqClick(reqID) {
        getApplicationsForReq(reqID).then(res => {
            const applications = res.data.result;
            this.setState({applications: applications})
        })
    }

    componentDidMount() {
        getRequisitions().then(res => {
            const reqs = res.data.result;
            this.setState({reqs: reqs});
        })
    };

    handleOpenModal (application) {
        getApplicationDetails(application.applicationID).then(res => {
            const info = res.data.result.candidate;
            this.setState({info: info});
            getCandidateInfo(this.state.info.candidateID).then(res => {
                this.setState({moreCandidateInfo: res.data.result});
            })
        });
        this.setState({currentApplication: application});
        this.setState({showModal: true});
        if(application.status === "Schedule Interview") {
            this.setState({readyForInterview: true}, function() {
                this.setState({showCalendar: true});
            });
        } else {
            this.setState({readyForInterview: false}, function() {
                this.setState({showCalendar: false});
            });
        }
    }

    handleCloseModal () {
        this.setState({showModal: false});
        this.setState({readyForInterview: false});
    }

    render() {
        return (
            <div className={"activeApplicationsContainer"}>
                <div className={"addNewCandidateImage"}>
                    <img src={logo} className={"smallHebLogo"} alt={"hebLogo"}/>
                </div>
                <h1 id={"activeApplicationsHeader"}>Active Applications</h1>
                <p>Click on a requisition to see all applications for it.</p>
                <table className={"requisitionsActiveApplicationsTable"}>
                    <tbody>
                    <tr>
                        <th>Requisitions</th>
                    </tr>
                    {this.state.reqs.map(req =>
                        <tr onClick={() => this.handleReqClick(req.requisitionID)}>
                            <td>
                                {req.title}
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
                <table className={"activeApplicationsTable"}>
                    <tbody>
                    <tr>
                        <th>Application ID</th>
                        <th>Candidate</th>
                        <th>Position</th>
                        <th>Application Status</th>
                    </tr>
                    {this.state.applications.map(app =>
                        <tr onClick={() => this.handleOpenModal(app)}>
                            <td>
                                {app.applicationID}
                            </td>
                            <td>
                                {app.candidate.firstName + " " + app.candidate.lastName}
                            </td>
                            <td>
                                {app.requisition.title}
                            </td>
                            <td>
                                {app.status}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.showModal}
                    ariaHideApp={false}
                    style={customStyling}
                    contentLabel=""
                >
                    <div className="modalCloseButton" onClick={this.handleCloseModal}/>
                    <CandidateProfileModal info={this.state.info} moreCandidateInfo={this.state.moreCandidateInfo} currentCandidate={this.state.currentCandidate} readyForInterview={this.state.readyForInterview}/>
                </Modal>
            </div>
        )
    }
}