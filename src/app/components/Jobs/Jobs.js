import React from 'react';
import '../../../styles/AllJobs.css';
import {getJobs, getRequisitions, getReqsForJob} from '../../services.js';
import { Link } from 'react-router-dom';

export default class Jobs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            jobs: [],
            reqs: []
        };

        this.handleJobClick = this.handleJobClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    handleJobClick(jobID) {
        console.log(jobID + " was clicked");

        getReqsForJob(jobID).then(res => {
            const reqs = res.data.result;
            this.setState({reqs: reqs})
            console.log(reqs);
        })
    };

    handleResetClick() {
        getRequisitions().then(res => {
            const reqs = res.data.result;
            this.setState({reqs: reqs})
        })
    };

    componentDidMount() {
        getJobs().then(res => {
            const jobs = res.data.result;
            this.setState({jobs: jobs});
        });

        getRequisitions().then(res => {
            const reqs = res.data.result;
            this.setState({reqs: reqs});
        })
    };

    render() {
        return (
            <div className={"jobContainer"}>
                <h1 id={"jobsHeader"}>Jobs</h1>
                <input type={"text"} id={"searchInput"} onKeyUp={console.log("typed")} placeholder={"Search by title"} title={"Type in a title"}/>
                <button className={"resetButton"} onClick={() => this.handleResetClick()}>Reset</button>
                <table>
                    <tbody>
                    <tr>
                        <th>Order</th>
                        <th>Job Title</th>
                    </tr>
                    {this.state.jobs.map(job =>
                        <tr onClick={() => this.handleJobClick(job.jobID)}>
                            <td>
                                
                            </td>
                            <td>
                                {job.title}
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
                <br/>
                <table>
                    <tbody>
                    <tr>
                        <th>Requisition</th>
                    </tr>
                    {this.state.reqs.map(req =>
                        <tr>
                            <td>
                                {req.title}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}