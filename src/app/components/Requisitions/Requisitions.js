import React from 'react';
import '../../../styles/AllRequisitions.css';
import {getRequisitions} from '../../services.js';

export default class Requisitions extends React.Component {
    state = {
        requisitions: []
    };

    componentDidMount() {
        getRequisitions().then(res => {
            const requisitions = res.data.result;
            this.setState({requisitions});
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
                        <th>Requisition Title</th>
                    </tr>
                    {this.state.requisitions.map(requisition =>
                        <tr>
                            <td>

                            </td>
                            <td>
                                {requisition.title}
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}