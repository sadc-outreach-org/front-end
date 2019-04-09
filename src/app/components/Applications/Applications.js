import React from 'react';
import '../../../styles/ApplicationStatus.css';
import ApplicationStatus from '../ApplicationStatus/ApplicationStatus';
import {getApplicationsForUser} from '../../services.js';
import Modal from 'react-modal';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.7)';

const customStyling = {
    content : {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class Applications extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            applications: [],
            clickedApplication: null,
            clickedApplicationTitle: '',
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleAppClick = this.handleAppClick.bind(this);
    }

    componentDidMount() {
        getApplicationsForUser(localStorage.getItem("userID")).then(res => {
            const applications = res.data.result;
            this.setState({applications : applications});
        })
    }

    handleOpenModal () {
        this.setState({showModal: true})
    }


    handleCloseModal () {
        this.setState({showModal: false})
    }

    handleAppClick (singleApplication) {
        // this.handleOpenModal().then();
        console.log("Entire Application Passed: " + JSON.stringify(singleApplication));
        console.log("Title received from passed application parameter: " + singleApplication.requisition.title);
        this.setState({clickedApplication: singleApplication});
        this.setState({clickedApplicationTitle: singleApplication.requisition.title});
        console.log("Clicked Application Title: " + this.state.clickedApplicationTitle);
        console.log("Clicked Application: " + this.state.clickedApplication);
    }

    render() {
        return (
            <div className={"candidateApplicationsContainer"}>
                <h1 className={"applicationsHeader"}>Applications</h1>
                <table className={"candidateApplicationsTable"}>
                    <tr>
                        <th>Requisition</th>
                        <th>Date Applied</th>
                        <th>Status</th>
                    </tr>
                    <tbody>
                    {this.state.applications.map(application =>
                    <tr onClick={() => this.handleAppClick(application)}>
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
                    contentLabel="Minimal Modal Example"
                >
                    <div className="modalCloseButton" onClick={this.handleCloseModal}/>
                    <ApplicationStatus/>
                </Modal>
            </div>
        );
    }
}