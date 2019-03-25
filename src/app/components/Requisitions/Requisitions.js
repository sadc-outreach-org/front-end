import React from 'react';
// import '../../../styles/AllJobs.css';
import '../../../styles/AllRequisitions.css';
import {getRequisitions} from '../../services.js';
import { Link } from 'react-router-dom';

export default class Jobs extends React.Component {
    state = {
        requisitions: []
    };

    componentDidMount() {
        getRequisitions().then(res => {
            const requisitions = res.data.result;
            this.setState({requisitions});
            console.log(res.data.result);
        })
    }

    render() {
        return (
            <div className={"requisitionsContainer"}>
                <h1 id={"requisitionsHeader"}>Jobs</h1>
                <input type={"text"} id={"searchInput"} onKeyUp={console.log("typed")} placeholder={"Search by title"} title={"Type in a title"}/>
                <table>
                    <tbody>
                    <tr>
                        <th>Order</th>
                        <th>Job Title</th>
                    </tr>
                    {this.state.requisitions.map(requisition =>
                        <tr>
                            <td>

                            </td>
                            <td>
                                <Link to={`#`}>
                                    {requisition.title}
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