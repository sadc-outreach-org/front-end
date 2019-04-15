import React from 'react';
import '../../../styles/ApplicationStatus.css';
import logo from '../../../images/heb-red.png';
import ApplicationStatus from '../ApplicationStatus/ApplicationStatus';
import {getApplicationsForUser, getApplicationDetails} from '../../services.js';
import Modal from 'react-modal';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.7)';

const customStyling = {
    content : {
        padding: '0'
    }
};

export default class Applications extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            applications: [],
            clickedApplication: [],
            codingChallengeInfo: [],
            showModal: false
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleAppClick = this.handleAppClick.bind(this);
    }

    componentDidMount() {
        getApplicationsForUser(localStorage.getItem("userID")).then(res => {
            const applications = res.data.result;
            this.setState({applications : applications});
        })
    }

    handleCloseModal () {
        this.setState({showModal: false});
        getApplicationsForUser(localStorage.getItem("userID")).then(res => {
            const applications = res.data.result;
            this.setState({applications : applications});
        })
    }

    handleAppClick (singleApplication) {
        this.setState({clickedApplication: singleApplication}, function() {
            this.setState({showModal: true});
        });
        getApplicationDetails(singleApplication.applicationID).then(res => {
            this.setState({codingChallengeInfo: res.data.result.requisition.codingChallenges[0]});
        });
    }

    render() {
        return (
            <div className={"candidateApplicationsContainer"}>
                <div className={"addNewCandidateImage"}>
                    <img src={logo} className={"smallHebLogo"} alt={"hebLogo"}/>
                </div>
                <h1 className={"applicationsHeader"}>Applications</h1>
                <table className={"candidateApplicationsTable"}>
                    <tr>
                        <th>Requisition</th>
                        <th>Date Applied</th>
                        <th>Status</th>
                    </tr>
                    <tbody>
                    {this.state.applications.map(application =>
                    <tr onClick={() => {this.handleAppClick(application)}}>
                        <td>{application.requisition.title}</td>
                        <td>{application.createdAt}</td>
                        <td>{application.status}</td>
                    </tr>)
                    }
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.showModal}
                    ariaHideApp={false}
                    style={customStyling}
                    contentLabel="Minimal Modal Example"
                >
                    <div className="modalCloseButton" onClick={this.handleCloseModal}/>
                    <ApplicationStatus clickedApplication={this.state.clickedApplication} codingChallengeInfo={this.state.codingChallengeInfo}/>
                </Modal>
            </div>
        );
    }
}