import React from 'react';
import {Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import '../../../styles/ApplicationStatus.css';
import {submitGitLink} from "../../services";

export default class ApplicationStatus extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            gitLink: '',
            showUpdated: false
        };

        this.handleGitSubmit = this.handleGitSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({gitLink: this.props.clickedApplication.gitLink});
        let steps = document.getElementsByClassName("progressbar-item");
        let i;
        for(i = 0; i < steps.length; i++) {
            if(steps[i].innerHTML.includes(this.props.clickedApplication.status)) {
                steps[i].className = steps[i].className+" active";
            }
        }
    }

    handleGitSubmit = event => {
        event.preventDefault();
        let payload = {
            gitLink: this.state.gitLink
        };
        submitGitLink(payload, this.props.clickedApplication.applicationID);
        this.setState({showUpdated: true});
    };

    render() {
        return (
            <div className={"applicationStatusContainer"}>
                <h1 className={"application-header"}>Application Status for: {this.props.clickedApplication.requisition.title}</h1>
                <ul className="progressbar">
                    <li className={"progressbar-item"}>Submit Code for Review</li>
                    <li className={"progressbar-item"}>Schedule Interview</li>
                    <li className={"progressbar-item"}>Attend Interview</li>
                    <li className={"progressbar-item"}>Wait for Response</li>
                </ul>
                <div className={"applicationStatusStepSpace"}>
                <h2 className={"application-subheader"}>Step 1: Submit Code for Review</h2>
                <p className={"application-p"}>Coding Challenge: Write a program that prints out "Hello World!"</p>
                <Form onSubmit={this.handleGitSubmit}>
                    <FormGroup>
                        <Input
                            type={"text"}
                            name={"gitHubSubmitField"}
                            id={"githubSubmissionLink"}
                            placeholder={"Github Repo Link"}
                            defaultValue={this.props.clickedApplication.gitLink}
                            onChange={(event) => this.setState({gitLink: event.target.value})}
                            required
                        />
                        <Button
                            type={"submit"}
                            className={"gitHubSubmissionButton btn-block"}
                        >Submit</Button>
                    </FormGroup>
                </Form>
                <h2 className={"application-subheader"}>Step 2: Schedule Interview</h2>
                <p className={"application-p"}>Waiting for Hiring Manager to schedule your interview</p>
                <h2 className={"application-subheader"}>Step 3: Attend Interview</h2>
                <p className={"application-p"}>Your interview is scheduled for February 2, 2019 at 3:00 PM.</p>
                <h2 className={"application-subheader"}>Step 4: Wait for Response</h2>
                <p className={"application-p"}>Please allow at least two weeks for a response from your hiring manager.</p>
                <div hidden={!this.state.showUpdated} className={"applicationUpdated"}>
                    <p><strong>Your Application has been successfully updated.</strong></p>
                </div>
            </div>
        )
    }
}