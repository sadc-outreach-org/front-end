import React from 'react';
import '../../../styles/AllCandidates.css';
import {getUsers, getCandidateInfo, sortUsersByApplication} from '../../components/services.js';
import Modal from 'react-modal';
import CandidateProfileModal from '../CandidateProfileModal/CandidateProfileModal';
import {sortUsersByEmail, sortUsersByFirstName, sortUsersByLastName} from "../../components/services";



Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.7)';

const customStyling = {
    content : {
        top: '40%',
        left: '50%',
        height: '70%',
        padding: 0,
        transform: 'translate(-50%, -50%)'
    }
};

export default class Candidates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            info: [],
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal (candidateID) {
        getCandidateInfo(candidateID).then(res => {
            const info = res.data.result;
            this.setState({info: info});
        })
        this.setState({showModal: true})
    }


    handleCloseModal () {
        this.setState({showModal: false})
    }

    componentDidMount() {
        sortUsersByApplication().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    sortCandidatebyFirstName() {
        sortUsersByFirstName().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    sortCandidatebyLastName() {
        sortUsersByLastName().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    sortCandidatebyEmail() {
        sortUsersByEmail().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }



    render() {
        return (
            <div className={"candidatesContainer"}>
                <h1 id={"applicantsHeader"}>Applicants</h1>
                <input type={"text"} id={"candidateSearchInput"} onKeyUp={console.log("typed")} placeholder={"Search by name"} title={"Type in a name"}/>
                <table className={"candidatesTable"}>
                    <tbody>
                        <tr>
                            <th onClick={() => this.sortCandidatebyFirstName()}>First</th>
                            <th onClick={() => this.sortCandidatebyLastName()}>Last</th>
                            <th onClick={() => this.sortCandidatebyEmail()}>Email</th>
                            <th onClick={() => this.componentDidMount()}>Application Status<i className="upArrow"></i><i className="downArrow"></i></th>
                        </tr>
                        {this.state.candidates.map(candidate =>
                            <tr onClick={() => this.handleOpenModal(candidate.candidateID)}>
                                <td>{candidate.firstName}</td>
                                <td>{candidate.lastName}</td>
                                <td>{candidate.email}</td>
                                <td>{candidate.status}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.showModal}
                    ariaHideApp={false}
                    style={customStyling}
                    contentLabel=""
                >
                    <div className="modalCloseButton" onClick={this.handleCloseModal}/>
                    <CandidateProfileModal info={this.state.info}/>
                </Modal>
            </div>
        )
    }
}