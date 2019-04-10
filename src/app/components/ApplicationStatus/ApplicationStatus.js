import React from 'react';
import {Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import '../../../styles/ApplicationStatus.css';

export default class ApplicationStatus extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            application: props.clickedApplication
        };
    }

    render() {
        return (
            <div className={"applicationStatusContainer"}>
                <h1 className={"application-header"}>Application Status for: {console.log("Child component App status: " + this.state.application)}</h1>
                <ul className="progressbar">
                    <li className="active">Coding Challenge</li>
                    <li className="active">Submit Code for Review</li>
                    <li>Attend Interview</li>
                </ul>
                <h2 className={"application-subheader"}>Step 1: Coding Challenge</h2>
                <p className={"application-p"}>Coding Challenge: Write a program that prints out "Hello World!"</p>
                <h2 className={"application-subheader"}>Step 2: Submit Code for Review</h2>
                <p className={"application-p"}>Once you've completed the coding challenge, submit your github link here:</p>
                <input type={"text"} name={"submissionLink"} id={"githubSubmissionLink"} placeholder={"Github Link"}/>
                <input type={"submit"} name={"submissionLink"} id={"githubSubmissionButton"}/>
                <h2 className={"application-subheader"}>Step 3: Attend Interview</h2>
                <p className={"application-p"}>Your interview is scheduled for February 2, 2019 at 3:00 PM.</p>
            </div>
        )
    }
}