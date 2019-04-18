import React from 'react';
import '../../../styles/AllJobs.css';

import {getJobs, getRequisitions, getReqsForJob, getUsers} from '../../services.js';
import logo from "../../../images/heb-red.png";
import AllCandidatesModal from '../AllCandidatesModal/AllCandidatesModal';
import Modal from 'react-modal';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.7)';

const customStyling = {
    content : {
        padding: '0',
    }
};


export default class Jobs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            jobs: [],
            reqs: [],
            jobInfo: [],
            candidates: [],
            showModal: false
        };

        this.handleJobClick = this.handleJobClick.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal(job) {
        getUsers().then(res => {
            this.setState({candidates: res.data.result});
            this.setState({showModal: true});
        });

        this.setState({jobInfo: job});
    }

    handleCloseModal () {
        this.setState({showModal: false});
    }

    handleJobClick(job) {
        getReqsForJob(job.jobID).then(res => {
            const reqs = res.data.result;
            this.setState({reqs: reqs});
        });

        this.handleOpenModal(job);
    }

    componentDidMount() {
        getJobs().then(res => {
            const jobs = res.data.result;
            this.setState({jobs: jobs});
        });

        getRequisitions().then(res => {
            const reqs = res.data.result;
            this.setState({reqs: reqs});
        });
    };

    render() {
        return (
            <div className={"jobContainer"}>
                <div className={"addNewCandidateImage"}>
                    <img src={logo} className={"smallHebLogo"} alt={"hebLogo"}/>
                </div>
                <h1 id={"jobsHeader"}>Jobs</h1>
                <p>Select a job to assign a candidate to it.</p>
                <table className={"jobsTable"}>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                    {this.state.jobs.map(job =>
                        <tr onClick={() => this.handleJobClick(job)}>
                            <td>
                                HEB-8750-
                            </td>
                            <td>
                                {job.title}
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
                <table className={"jobsRequisitionsTable"}>
                    <tbody>
                    <tr>
                        <th>Requisitions</th>
                    </tr>
                    {this.state.reqs.map(req =>
                        <tr>
                            <td>
                                {req.title}
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
                    <AllCandidatesModal candidates={this.state.candidates} jobInfo={this.state.jobInfo} />
                </Modal>
            </div>
        )
    }
}