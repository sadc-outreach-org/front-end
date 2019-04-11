import React from 'react';
import '../../../styles/AllCandidates.css';
import {getUsers, getCandidateInfo, sortUsersByApplication} from '../../components/services.js';
import Modal from 'react-modal';
import CandidateProfileModal from '../CandidateProfileModal/CandidateProfileModal';
import {
    sortUsersByApplicationAsc,
    sortUsersByApplicationDesc,
    sortUsersByEmail, sortUsersByEmailAsc, sortUsersByEmailDesc,
    sortUsersByFirstName, sortUsersByFirstNameAsc, sortUsersByFirstNameDesc,
    sortUsersByLastName, sortUsersByLastNameAsc, sortUsersByLastNameDesc
} from "../../components/services";
import Calendar from 'react-calendar';



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

    //---------CALENDAR----------
    state = {
        date: new Date(),
        showCalendar: false
    }

    onChange = date => this.setState({ date: date })


    handleOpenModal (candidateID, status) {
        getCandidateInfo(candidateID).then(res => {
            const info = res.data.result;
            this.setState({info: info});
        })
        this.setState({showModal: true});
        console.log("status: " + status)
        if(status === "Schedule Interview") {
            this.setState({showCalendar: true}, function(){
                console.log("Calendar should say true ? : " + this.state.showCalendar)
            })
            console.log("status says schedule interview: " + this.state.showCalendar)
        } else {
            this.setState({showCalendar: false}, function(){
                console.log("Calendar should say false ? : " + this.state.showCalendar)
            })
            console.log("status says otherwise: " + this.state.showCalendar)
        }

    }



    handleCloseModal () {
        this.setState({showModal: false})
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
                <h1 id={"applicantsHeader"}>Applicants</h1>
                <input type={"text"} id={"candidateSearchInput"} onKeyUp={console.log("typed")} placeholder={"Search by name"} title={"Type in a name"}/>
                <table className={"candidatesTable"}>
                    <tbody>
                        <tr>
                            <th>First<i className="upArrow" onClick={() => this.sortCandidatebyFirstNameAsc()}></i><i className="downArrow" onClick={() => this.sortCandidatebyFirstNameDesc()}></i></th>
                            <th>Last<i className="upArrow" onClick={() => this.sortCandidatebyLastNameAsc()}></i><i className="downArrow" onClick={() => this.sortCandidateByLastNameDesc()}></i></th>
                            <th>Email<i className="upArrow" onClick={() => this.sortCandidatebyEmailAsc()}></i><i className="downArrow" onClick={() => this.sortCandidatebyEmailDesc()}></i></th>
                            <th>Application Status<i className="upArrow"onClick={() => this.sortCandidatebyAppStatusAsc()} ></i><i className="downArrow" onClick={() => this.componentDidMount()}></i></th>
                        </tr>
                        {this.state.candidates.map(candidate =>
                            <tr onClick={() => this.handleOpenModal(candidate.candidateID, candidate.status)}>
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
                <div hidden={!this.state.showCalendar}>
                        <Calendar
                           // onChange={this.onChange}
                            value={this.state.date}
                            onClickDay={() => this.onChange()}
                            //console.log('Clicked Day: ') + this.state.date
                        />
                </div>
                    <div className="modalCloseButton" onClick={this.handleCloseModal}/>
                    <CandidateProfileModal info={this.state.info}/>
                </Modal>
            </div>
        )
    }
}