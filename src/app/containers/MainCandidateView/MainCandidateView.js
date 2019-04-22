import React, {Component} from 'react';
import '../../../styles/AllCandidateApplicationsView.css';
import '../../../styles/CandidateProfile.css';
import '../../../styles/side-menu.css';
import SideMenu, {Item} from 'react-sidemenu';
import CandidateProfileInfo from '../../components/CandidateProfileInfo/CandidateProfileInfo';
import Applications from '../../components/Applications/Applications';
import {Route, HashRouter} from "react-router-dom";
import '../../../styles/MainCandidateView.css';
import Modal from 'react-modal';
import NotificationList from "../../components/Notifications/NotificationList";

const customStyling = {
    content : {
        padding: '0',
    }
};

class MainCandidateView extends Component {
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
            <div className={"mainCandidateViewContainer"}>
                <HashRouter>
                    <div>
                        <SideMenu>
                            <Item divider={true} label="Actions" value="segment1"/>
                            <Item label="Profile" value="profile"/>
                            <Item label="Applications" value="applications"/>
                            <Item divider={true} label={"Notifications"}/>
                            <Item label={"Notifications"} onClick={this.handleOpenModal}/>
                        </SideMenu>
                        <div className={"mainCandidateContent"}>
                            <Route path={"/profile"} component={CandidateProfileInfo}/>
                            <Route path={"/applications"} component={Applications}/>
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

export default MainCandidateView;