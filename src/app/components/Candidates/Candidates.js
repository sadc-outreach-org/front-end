import React from 'react';
import {getUsers} from '../../services.js';
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
                <table>
                    <tbody>
                        <tr>
                            <th>First</th>
                            <th>Last</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                        {this.state.candidates.map(candidate =>
                            <tr>
                                <td>
                                    <Link to={`/user/${candidate.email}/info`}>//TODO update this to redirect to profile page
                                        {candidate.firstName}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/user/${candidate.email}/info`}>//TODO update this to redirect to profile page
                                        {candidate.lastName}
                                    </Link>
                                </td>
                                <td>{candidate.email}</td>
                                <td>{candidate.phoneNum}</td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}