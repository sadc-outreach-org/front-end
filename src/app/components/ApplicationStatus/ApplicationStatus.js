import React from 'react';
import '../../../styles/ApplicationStatus.css';

export default class ApplicationStatus extends React.Component {
    state = {

    };

    render() {
        return (
            <div className={"applicationStatusContainer"}>
                <h1 id={"application-header"}>Application Status for: Developer I</h1>
                <ul className="progressbar">
                    <li className="active">Coding Challenge</li>
                    <li className="active">Submit Code for Review</li>
                    <li>Setup Interview</li>
                </ul>
            </div>
        )
    }
}