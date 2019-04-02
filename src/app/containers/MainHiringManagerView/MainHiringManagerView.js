import React, {Component} from 'react';
import AllCandidates from '../../components/Candidates/Candidates';
import Jobs from '../../components/Jobs/Jobs';
import Requisitions from '../../components/Requisitions/Requisitions';
import ActiveApplications from '../../components/ActiveApplications/ActiveApplications';
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
                            <Item label="Applicants" value="/applicants"></Item>
                            <Item label="Jobs" value="/jobs"></Item>
                            <Item label="Requisitions" value="/requisitions"></Item>
                            <Item label="Active Applications" value="/active-applications"></Item>
                        </SideMenu>
                        <div className={"mainHiringManagerContent"}>
                            <Route path={"/applicants"} component={AllCandidates}/>
                            <Route path={"/jobs"} component={Jobs}/>
                            <Route path={"/requisitions"} component={Requisitions}/>
                            <Route path={"/active-applications"} component={ActiveApplications}/>
                        </div>
                    </div>
                </HashRouter>
            </div>
        )
    }
}

export default MainCandidateProfileView;