import React from 'react';
import {getUsers} from '../services.js';

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
                    <tr>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                    <tbody>
                        {this.state.candidates.map(candidate =>
                            <tr>
                                <td>{candidate.firstName}</td>
                                <td>{candidate.email}</td>
                                <td>{candidate.phoneNumber}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}