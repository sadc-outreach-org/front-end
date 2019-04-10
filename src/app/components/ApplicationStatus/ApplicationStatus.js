import React from 'react';
import {Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import '../../../styles/ApplicationStatus.css';
import {submitGitLink} from "../../services";

export default class ApplicationStatus extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            gitLink: ''
        };

        this.handleGitSubmit = this.handleGitSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({gitLink: this.props.clickedApplication.gitLink});
    }

    handleGitSubmit = event => {
        event.preventDefault();
        let payload = {
            gitLink: this.state.gitLink
        };

        submitGitLink(payload, this.props.clickedApplication.applicationID).then(res => {
            console.log("Github Submit Response: " + JSON.stringify(res));
        })
    };

    render() {
        return (
            <div className={"applicationStatusContainer"}>
                <h1 className={"application-header"}>Application Status for: {this.props.clickedApplication.requisition.title}</h1>
                <ul className="progressbar">
                    <li className="active">Coding Challenge</li>
                    <li className="active">Submit Code for Review</li>
                    <li>Attend Interview</li>
                </ul>
                <h2 className={"application-subheader"}>Step 1: Coding Challenge</h2>
                <p className={"application-p"}>Coding Challenge: Write a program that prints out "Hello World!"</p>
                <h2 className={"application-subheader"}>Step 2: Submit Code for Review</h2>
                <p className={"application-p"}>Once you've completed the coding challenge, submit your github link here:</p>
                <Form onSubmit={this.handleGitSubmit}>
                    <FormGroup>
                        <Input
                            type={"text"}
                            name={"gitHubSubmitField"}
                            id={"gitHubSubmitField"}
                            placeholder={"Github Repo Link"}
                            defaultValue={this.props.clickedApplication.gitLink}
                            onChange={(event) => this.setState({email: event.target.value})}
                            required
                        />
                        <Button
                            type={"submit"}
                            className={"submitGitLink btn-block"}
                        >Submit</Button>
                    </FormGroup>
                </Form>
                <h2 className={"application-subheader"}>Step 3: Attend Interview</h2>
                <p className={"application-p"}>Your interview is scheduled for February 2, 2019 at 3:00 PM.</p>
            </div>
        )
    }
}