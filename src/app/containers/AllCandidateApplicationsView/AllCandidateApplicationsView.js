import React, {Component} from 'react';
import '../../../styles/AllCandidateApplicationsView.css';
import Applications from '../../components/Applications/Applications';

class AllCandidateApplicationsView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className={"allCandidateApplicationsView"}>
                <h1>Your Applications</h1>
                <div className={"tableContainer"}>
                    <Applications/>
                </div>
            </div>
        );
    }
}

export default AllCandidateApplicationsView;