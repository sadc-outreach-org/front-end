import React, {Component} from 'react';
import '../../../styles/AllCandidateApplicationsView.css';
import '../../../styles/CandidateProfile.css';
import '../../../styles/side-menu.css';
import SideMenu, {Item} from 'react-sidemenu';
import CandidateProfileInfo from '../../components/CandidateProfileInfo/CandidateProfileInfo';
import Applications from '../../components/Applications/Applications';
import {Route, HashRouter} from "react-router-dom";
import {Modal} from 'react-modal';
import ApplicationStatus from "../../components/ApplicationStatus/ApplicationStatus";

class MainCandidateView extends Component {
    constructor () {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    render() {
        return(
            <div>
                <HashRouter>
                    <div className={"profileSideNavComponent"}>
                        <SideMenu>
                            <Item divider={true} label="Actions" value="segment1"/>
                            <Item label="Profile" value="/profile"></Item>
                            <Item label="Application Status" value="/applications"></Item>
                            <Item divider={true} label={"Notifications"}/>
                            <Item label={"Notifications"} onClick={this.handleOpenModal}/>
                        </SideMenu>
                        <div className={"main-candidate-content"}>
                            <Route path={"/profile"} component={CandidateProfileInfo}/>
                            <Route path={"/applications"} component={Applications}/>
                        </div>
                    </div>

                </HashRouter>

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