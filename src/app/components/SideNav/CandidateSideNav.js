import React, {Component} from 'react';
import SideMenu, {Item} from 'react-sidemenu';
import '../../../styles/side-menu.css';

class CandidateSideNav extends Component {
    render() {
        return (
            <div className={"profileSideNavComponent"}>
                <SideMenu>
                    <Item divider={true} label="Profile" value="segment1"/>
                    <Item label="Home"/>
                    <Item label="Profile" value="item2"/>
                    <Item label="Logout" value="item3"/>
                    <Item divider={true} label="Actions" value="segment2"/>
                    <Item label="Requisitions" value="item3"/>
                    <Item label="Available Positions" value="item4"/>
                </SideMenu>
            </div>
        )
    }
}

export default CandidateSideNav;
