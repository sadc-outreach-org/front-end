import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Modal from 'react-modal';
// import {getApplications} from services.js

export default class Applications extends React.Component {
    constructor () {
        super();
        this.state = {
            applications: [],
            show: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    // componentDidMount() {
    //     getUsers().then(res => {
    //         const candidates = res.data.result;
    //         this.setState({candidates});
    //     })
    // }

    handleOpenModal () {
        this.setState({showModal: true})
        console.log(this.state.show)
    }

    handleCloseModal () {
        this.setState({showModal: false})
        console.log(this.state.show)
    }

    handleAppClick = event => {
        event.preventDefault();
        // let payload = {
        //     email: this.state.email,
        //     password: this.state.password
        // };

        console.log("Row Clicked!");

        // axios.post("http://cloud-25.cs.trinity.edu:8080/user/login", payload)
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data.result);
        //     })
    };

    render() {
        return (
            <div className={"tableContainer"}>
                <table>
                    <h1 className={"applicationsHeader"}>Applications</h1>
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
                    <tr onClick={this.handleOpenModal}>
                        <td>Developer I</td>
                        <td>Feb. 2, 2019</td>
                        <td>Ready for Interview</td>
                    </tr>
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </Modal>
            </div>
        );
    }
}