import React from 'react';
import '../../../styles/AllJobs.css';
import {getJobs, getReqsForJob} from '../../services.js';
import { Link } from 'react-router-dom';

export default class Jobs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            jobs: [],
            reqs: []
        };

        this.handleJobClick = this.handleJobClick.bind(this);
    }

    handleJobClick(jobID) {
        console.log(jobID + " was clicked");
        getReqsForJob(jobID).then(res => {
            const reqs = res.data.result;
            console.log(reqs);
        })
    };

    componentDidMount() {
        getJobs().then(res => {
            const jobs = res.data.result;
            this.setState({jobs});
        })
    };

    render() {
        return (
            <div className={"jobContainer"}>
                <h1 id={"jobsHeader"}>Jobs</h1>
                <input type={"text"} id={"searchInput"} onKeyUp={console.log("typed")} placeholder={"Search by title"} title={"Type in a title"}/>
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
            </div>
        )
    }
}