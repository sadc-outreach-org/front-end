import React from 'react';
import '../../../styles/CandidateProfileModal.css';

export default class ApplicationStatus extends React.Component {

    render() {
        return (
            <div className={"candidateProfileModalContainer"}>
                <h1>{this.props.info.firstName + " " + this.props.info.lastName}</h1>
                <p><strong>Email:</strong>{" " + this.props.info.email}</p>
                <p><strong>Phone:</strong>{" " + this.props.info.phoneNum}</p>
                <p><strong>Address:</strong>{" " + this.props.info.streetAddress}</p>
                <p><strong>Location:</strong>{" " + this.props.info.city + ", " + this.props.info.state}</p>
                <div className={"candidateProfileModalButtons"}>
                    <button id={"candidateProfileModalButton1"}>Send Email</button><button id={"candidateProfileModalButton2"}>Assign to Requisition</button>
                </div>
            </div>
        )
    }
}