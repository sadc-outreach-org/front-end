import React from 'react';
import '../../../styles/ActiveApplications.css';
import {getRequisitions, getApplicationsForReq} from '../../services.js';

export default class ActiveApplications extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            reqs: [],
            applications: []
        };

        this.handleReqClick = this.handleReqClick.bind(this);
    }

    handleReqClick(reqID) {
        getApplicationsForReq(reqID).then(res => {
            const applications = res.data.result;
            this.setState({applications: applications})
            console.log(applications);
        })
    }

    componentDidMount() {
        getRequisitions().then(res => {
            const reqs = res.data.result;
            this.setState({reqs: reqs});
        })
    };

    render() {
        return (
            <div className={"activeApplicationsContainer"}>
                <h1 id={"activeApplicationsHeader"}>Active Applications</h1>
                {/*<input type={"text"} id={"activeApplicationsSearchInput"} onKeyUp={console.log("typed")} placeholder={"Search by title"} title={"Type in a title"}/>*/}
                <table className={"requisitionsActiveApplicationsTable"}>
                    <tbody>
                    <tr>
                        <th>Requisitions</th>
                    </tr>
                    {this.state.reqs.map(req =>
                        <tr onClick={() => this.handleReqClick(req.requisitionID)}>
                            <td>
                                {req.title}
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
                <table className={"activeApplicationsTable"}>
                    <tbody>
                    <tr>
                        <th>Application ID</th>
                        <th>Candidate</th>
                        <th>Position</th>
                        <th>Application Status</th>
                    </tr>
                    {this.state.applications.map(app =>
                        <tr>
                            <td>
                                {app.applicationID}
                            </td>
                            <td>
                                {app.candidate.firstName + " " + app.candidate.lastName}
                            </td>
                            <td>
                                {app.requisition.title}
                            </td>
                            <td>
                                {app.status}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}