import React from 'react';
// import '../../../styles/ActiveApplications.css';
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
                <h1 id={"activeApplicationsHeader"}>Jobs</h1>
                <input type={"text"} id={"searchInput"} onKeyUp={console.log("typed")} placeholder={"Search by title"} title={"Type in a title"}/>
                <table>
                    <tbody>
                    <tr>
                        <th>Requisitions</th>
                    </tr>
                    {this.state.reqs.map(req =>
                        <tr onClick={() => this.handleReqClick()}>
                            <td>
                                {req.title}
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
                <br/>
                <table>
                    <tbody>
                    <tr>
                        <th>Candidate</th>
                        <th>Position</th>
                        <th>Requisition No.</th>
                        <th>Application Status</th>
                    </tr>
                    {this.state.applications.map(app =>
                        <tr>
                            <td>
                                {app.title}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}