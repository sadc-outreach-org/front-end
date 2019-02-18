import React, {Component} from 'react';
import SideMenu, {Item} from 'react-sidemenu';
import '../../../styles/side-menu.css';

class CandidateSideNav extends Component {
    render() {
        return (
            <div className={"profileSideNavComponent"}>
                <SideMenu>
                    <Item divider={true} label="Actions" value="segment1"/>
                    <Item label="Profile" value="item1"/>
                    <Item label="Application Status" value="item2"/>
                </SideMenu>
            </div>
        )
    }
}

export default CandidateSideNav;
