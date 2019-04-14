import React from 'react';
import '../../../styles/AllJobs.css';
import {getJobs, getRequisitions, getReqsForJob} from '../../services.js';
import logo from "../../../images/heb-red.png";

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
                <div className={"addNewCandidateImage"}>
                    <img src={logo} className={"smallHebLogo"} alt={"hebLogo"}/>
                </div>
                <h1 id={"jobsHeader"}>Jobs</h1>
                {/*<button className={"resetButton"} onClick={() => this.handleResetClick()}>Reset</button>*/}
                <table className={"jobsTable"}>
                    <tbody>
                    <tr>
                        <th>Order</th>
                        <th>Job Title</th>
                    </tr>
                    {this.state.jobs.map(job =>
                        <tr onClick={() => this.handleJobClick(job.jobID)}>
                            <td>
                                HEB-8750-
                            </td>
                            <td>
                                {job.title}
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
                <table className={"jobsRequisitionsTable"}>
                    <tbody>
                    <tr>
                        <th>Requisitions</th>
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