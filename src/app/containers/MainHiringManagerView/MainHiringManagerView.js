import React, {Component} from 'react';
import '../../../styles/side-menu.css';
import AllCandidates from '../../components/Candidates/Candidates';
import SideMenu, {Item} from 'react-sidemenu';
import {Route, HashRouter} from "react-router-dom";

class MainCandidateProfileView extends Component {
    render() {
        return(
            <HashRouter>
                <div className={"profileSideNavComponent"}>
                    <SideMenu>
                        <Item divider={true} label="Actions" value="segment1"/>
                        <Item label="Applicants" value="/applicants"></Item>
                        <Item label="Jobs" value="/jobs"></Item>
                        <Item label="Active Applications" value="/active-applications"></Item>
                    </SideMenu>
                    <div className={"main-hiring-manager-content"}>
                        <Route path={"/applicants"} component={AllCandidates}/>
                        {/*<Route path={"/applications"} component={Applications}/>*/}
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default MainCandidateProfileView;