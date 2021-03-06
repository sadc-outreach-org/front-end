import React, {Component} from 'react';
import AllCandidates from '../../components/Candidates/Candidates';
import Jobs from '../../components/Jobs/Jobs';
import ActiveApplications from '../../components/ActiveApplications/ActiveApplications';
import AddNewCandidate from '../../components/AddNewCandidate/AddNewCandidate';
import '../../../styles/MainHiringManagerView.css';
import SideMenu, {Item} from 'react-sidemenu';
import {Route, HashRouter} from "react-router-dom";
import Modal from "react-modal";
import NotificationList from "../../components/Notifications/NotificationList";

const customStyling = {
    content : {
        padding: '0',
    }
};

class MainCandidateProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        Modal.setAppElement('#root');
    }

    render() {
        return(
            <div className={"mainHiringManagerViewContainer"}>
                <HashRouter>
                    <div>
                        <SideMenu>
                            <Item divider={true} label="Actions" value="segment1"/>
                            <Item label="Applicants" value="/applicants"/>
                            <Item label="Jobs" value="/jobs"/>
                            <Item label="Active Applications" value="/active-applications"/>
                            <Item label="Add New Candidate" value="/add-new-candidate"/>
                            <Item divider={true} label={"Notifications"}/>
                            <Item label={"Notifications"} onClick={this.handleOpenModal}/>
                        </SideMenu>
                        <div className={"mainHiringManagerContent"}>
                            <Route path={"/applicants"} component={AllCandidates}/>
                            <Route path={"/jobs"} component={Jobs}/>
                            <Route path={"/active-applications"} component={ActiveApplications}/>
                            <Route path={"/add-new-candidate"} component={AddNewCandidate}/>
                        </div>
                    </div>
                </HashRouter>
                <Modal
                    isOpen={this.state.showModal}
                    style={customStyling}
                    contentLabel="Notifications"
                >
                    <div className="modalCloseButton" id="modalCloseButton" onClick={this.handleCloseModal}/>
                    <NotificationList/>
                </Modal>
            </div>
        )
    }

    handleOpenModal(){
        this.setState({showModal: true})
    }

    handleCloseModal(){
        this.setState({showModal: false})
    }
}

export default MainCandidateProfileView;