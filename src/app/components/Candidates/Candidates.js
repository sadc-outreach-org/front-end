import React from 'react';
import logo from '../../../images/heb-red.png';
import '../../../styles/AllCandidates.css';
import {getCandidateInfo} from '../../components/services.js';
import Modal from 'react-modal';
import CandidateProfileModal from '../CandidateProfileModal/CandidateProfileModal';
import {
    sortUsersByApplicationAsc, sortUsersByApplicationDesc,
    sortUsersByEmailAsc, sortUsersByEmailDesc,
    sortUsersByFirstNameAsc, sortUsersByFirstNameDesc,
    sortUsersByLastNameAsc, sortUsersByLastNameDesc
} from "../../components/services";

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

export default class Candidates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            currentCandidate: [],
            info: [],
            showModal: false,
            readyForInterview: false,
            initialReadyForInterview: false
        };
        this.changeInterviewState = this.changeInterviewState.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    //---------CALENDAR----------
    state = {
        date: new Date(),
        showCalendar: false
    };

    changeInterviewState() {
        if(this.state.readyForInterview === true) {
            this.setState({readyForInterview: false})
        } else if(this.state.readyForInterview === false) {
            this.setState({readyForInterview: true});
        }
        // this.setState({readyForInterview: !this.state.readyForInterview});
    }

    handleOpenModal (candidate, candidateID, status) {
        getCandidateInfo(candidateID).then(res => {
            const info = res.data.result;
            this.setState({info: info});
        });
        this.setState({currentCandidate: candidate});
        this.setState({showModal: true});
        if(status === "Schedule Interview") {
            this.setState({readyForInterview: true}, function() {
                this.setState({initialReadyForInterview: true});
            });
        } else {
            this.setState({readyForInterview: false}, function() {
                this.setState({showCalendar: false});
                this.setState({initialReadyForInterview: false});
            });
        }
    }

    handleCloseModal () {
        this.setState({showModal: false});
        this.setState({readyForInterview: false});
        sortUsersByApplicationDesc().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    sortCandidatebyAppStatusAsc() {
        sortUsersByApplicationAsc().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
    }

    componentDidMount() {
        sortUsersByApplicationDesc().then(res => {
            const candidates = res.data.result;
            this.setState({candidates: candidates});
        })
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

    render() {
        return (
            <div className={"candidatesContainer"}>
                <div className={"addNewCandidateImage"}>
                    <img src={logo} className={"smallHebLogo"} alt={"hebLogo"}/>
                </div>
                <h1 id={"applicantsHeader"}>Applicants</h1>
                <p>Select a candidate to view their contact information, assign them to a new requisition, or schedule an interview.</p>
                <table className={"candidatesTable"} id={"candidates-table"}>
                    <tbody>
                        <tr>
                            <th>First<i className="upArrow" onClick={() => this.sortCandidatebyFirstNameAsc()}/><i className="downArrow" onClick={() => this.sortCandidatebyFirstNameDesc()}/></th>
                            <th>Last<i className="upArrow" onClick={() => this.sortCandidatebyLastNameAsc()}/><i className="downArrow" onClick={() => this.sortCandidateByLastNameDesc()}/></th>
                            <th>Email<i className="upArrow" onClick={() => this.sortCandidatebyEmailAsc()}/><i className="downArrow" onClick={() => this.sortCandidatebyEmailDesc()}/></th>
                            <th>Application Status<i className="upArrow"onClick={() => this.sortCandidatebyAppStatusAsc()}/><i className="downArrow" onClick={() => this.componentDidMount()}/></th>
                        </tr>
                        {this.state.candidates.map(candidate =>
                            <tr onClick={() => this.handleOpenModal(candidate, candidate.candidateID, candidate.status)}>
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
                    <CandidateProfileModal info={this.state.info} currentCandidate={this.state.currentCandidate} initialReadyForInterview={this.state.initialReadyForInterview} readyForInterview={this.state.readyForInterview} changeInterviewState={this.changeInterviewState}/>
                </Modal>
            </div>
        )
    }
}