import React from 'react';
// import {getApplications} from servies.js

export default class Applications extends React.Component {
    state = {
        applications: []
    };

    // componentDidMount() {
    //     getUsers().then(res => {
    //         const candidates = res.data.result;
    //         this.setState({candidates});
    //     })
    // }

    render() {
        return (
            <div className={"tableContainer"}>
                <table>
                    <h1 className={"applicationsHeader"}>Your Applications</h1>
                    <tr>
                        <th>Requisition</th>
                        <th>Date Applied</th>
                        <th>Status</th>
                    </tr>
                    <tbody>
                    {/*{this.state.candidates.map(application =>*/}
                        {/*<tr>*/}
                            {/*/!*<td>{candidate.firstName}</td>*!/*/}
                            {/*/!*<td>{candidate.email}</td>*!/*/}
                            {/*/!*<td>{candidate.phoneNumber}</td>*!/*/}
                        {/*</tr>)*/}
                    {/*}*/}
                        <tr>
                            <td>Developer I</td>
                            <td>Feb. 2, 2019</td>
                            <td>Ready for Interview</td>
                        </tr>
                        <tr>
                            <td>Developer II</td>
                            <td>Feb 4, 2019</td>
                            <td>Ready for Interview</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}