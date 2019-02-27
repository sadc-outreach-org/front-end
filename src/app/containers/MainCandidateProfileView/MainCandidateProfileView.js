import React, {Component} from 'react';
import '../../../styles/AllCandidateApplicationsView.css';
import '../../../styles/CandidateProfile.css';
import '../../../styles/side-menu.css';
import SideMenu, {Item} from 'react-sidemenu';
import CandidateProfileInfo from '../../components/CandidateProfileInfo/CandidateProfileInfo';
import Applications from '../../components/Applications/Applications';
import {Route, HashRouter} from "react-router-dom";

class MainCandidateProfileView extends Component {
    render() {
        return(
            <HashRouter>
                <div className={"profileSideNavComponent"}>
                    <SideMenu>
                        <Item divider={true} label="Actions" value="segment1"/>
                        <Item label="Profile" value="/profile"></Item>
                        <Item label="Application Status" value="/applications"></Item>
                    </SideMenu>
                    <div className={"main-candidate-content"}>
                        <Route path={"/profile"} component={CandidateProfileInfo}/>
                        <Route path={"/applications"} component={Applications}/>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default MainCandidateProfileView;