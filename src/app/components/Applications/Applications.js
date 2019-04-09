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
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        getApplicationsForUser(localStorage.getItem("userID")).then(res => {
            const applications = res.data.result;
            this.setState({applications : applications});
            console.log(applications);
        })
    }

    handleOpenModal () {
        this.setState({showModal: true})
    }


    handleCloseModal () {
        this.setState({showModal: false})
    }

    handleAppClick = event => {
        event.preventDefault();
        // let payload = {
        //     email: this.state.email,
        //     password: this.state.password
        // };

        console.log("Row Clicked!");

        // axios.post("http://cloud-25.cs.trinity.edu:8080/user/login", payload)
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data.result);
        //     })
    };

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
                    {this.state.candidates.map(application =>
                    <tr>
                        <td>{application.requisition.title}</td>
                        {/*<td>{candidate.email}</td>*/}
                        {/*<td>{candidate.phoneNumber}</td>*/}
                    </tr>)
                    }
                    <tr onClick={this.handleOpenModal}>
                        <td>Developer I</td>
                        <td>Feb. 2, 2019</td>
                        <td>Ready for Interview</td>
                    </tr>
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