import React, {Component} from 'react';
import AllCandidates from '../../components/Candidates/Candidates';
import Jobs from '../../components/Jobs/Jobs';
import Requisitions from '../../components/Requisitions/Requisitions';
import ActiveApplications from '../../components/ActiveApplications/ActiveApplications';
import AddNewCandidate from '../../components/AddNewCandidate/AddNewCandidate';
import '../../../styles/MainHiringManagerView.css';
import SideMenu, {Item} from 'react-sidemenu';

import {Route, HashRouter} from "react-router-dom";

class MainCandidateProfileView extends Component {
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
                        </SideMenu>
                        <div className={"mainHiringManagerContent"}>
                            <Route path={"/applicants"} component={AllCandidates}/>
                            <Route path={"/jobs"} component={Jobs}/>
                            <Route path={"/active-applications"} component={ActiveApplications}/>
                            <Route path={"/add-new-candidate"} component={AddNewCandidate}/>
                        </div>
                    </div>
                </HashRouter>
            </div>
        )
    }
}

export default MainCandidateProfileView;