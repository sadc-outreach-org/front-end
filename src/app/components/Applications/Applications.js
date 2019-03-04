import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
// import {getApplications} from services.js

export default class Applications extends React.Component {
    state = {
        applications: [],
        show: false
    };

    // componentDidMount() {
    //     getUsers().then(res => {
    //         const candidates = res.data.result;
    //         this.setState({candidates});
    //     })
    // }

    showModal = () => {
        this.setState({show: true})
    }

    hideModal = () => {
        this.setState({show: false})
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
            <main>
                <ApplicationModal show={this.state.show} handleClose={this.hideModal}>
                    <p>Modal</p>
                    <p>Data</p>
                </ApplicationModal>
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
                        <tr onClick={this.showModal}>
                            <td>Developer I</td>
                            <td>Feb. 2, 2019</td>
                            <td>Ready for Interview</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}

const ApplicationModal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                {children}
                <button
                    onClick={handleClose}
                >
                    Close
                </button>
            </section>
        </div>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
ReactDOM.render(<Applications />, container);