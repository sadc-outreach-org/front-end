import React from 'react';
import '../../../styles/AllJobs.css';
import {getJobs} from '../../services.js';
import { Link } from 'react-router-dom';

export default class Jobs extends React.Component {
    state = {
        jobs: []
    };

    componentDidMount() {
        getJobs().then(res => {
            const jobs = res.data.result;
            this.setState({jobs});
            console.log(res.data.result);
        })
    }

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
                        <tr>
                            <td>
                                
                            </td>
                            <td>
                                <Link to={`/user/${job.title}/info`}>
                                    {job.title}
                                </Link>
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}