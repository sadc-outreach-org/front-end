import React from 'react';
import '../../../styles/AllCandidates.css';
import {getUsers} from '../../components/services.js';
import { Link } from 'react-router-dom';

export default class Candidates extends React.Component {
    state = {
        candidates: []
    };

    componentDidMount() {
        getUsers().then(res => {
                const candidates = res.data.result;
                this.setState({candidates});
            })
    }

    render() {
        return (
            <div className={"tableContainer"}>
                <h1 id={"applicantsHeader"}>Applicants</h1>
                <input type={"text"} id={"searchInput"} onKeyUp={console.log("typed")} placeholder={"Search by name"} title={"Type in a name"}/>
                <table>
                    <tbody>
                        <tr>
                            <th>First</th>
                            <th>Last</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Application Status <i className="upArrow"></i><i className="downArrow"></i></th>
                        </tr>
                        {this.state.candidates.map(candidate =>
                            <tr>
                                <td>
                                    <Link to={`/user/${candidate.email}/info`}>
                                        {candidate.firstName}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/user/${candidate.email}/info`}>
                                        {candidate.lastName}
                                    </Link>
                                </td>
                                <td>{candidate.email}</td>
                                <td>{candidate.phoneNum}</td>
                                <td>{candidate.phoneNum}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}