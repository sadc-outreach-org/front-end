import React, {Component} from 'react';
import '../../../styles/AllCandidateApplicationsView.css';
import '../../../styles/CandidateProfile.css';
import CandidateSideNav from '../../components/SideNav/CandidateSideNav';
import CandidateProfileInfo from '../../components/CandidateProfileInfo/CandidateProfileInfo';
import Applications from '../../components/Applications/Applications';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Login from "../Login/Login";

class MainCandidateProfileView extends Component {
    render() {
        return(
            <HashRouter>
                <div>
                    <CandidateSideNav/>
                    <div className={"main-candidate-content"}>

                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default MainCandidateProfileView;