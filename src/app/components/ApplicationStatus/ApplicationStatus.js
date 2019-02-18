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
                    <li className="active">Step 1</li>
                    <li className="active">Step 2</li>
                    <li>Step 3</li>
                    <li>Step 4</li>
                </ul>
            </div>
        )
    }
}