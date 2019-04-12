import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import '../../../styles/ApplicationStatus.css';
import {submitGitLink} from "../../services";

export default class ApplicationStatus extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            gitLink: '',
            showUpdated: false,
            originalClass: 'progressbar-item',
            showCodingChallenge: false,
            showScheduleInterviewText: false,
            showAttendInterviewText: false
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
            } else {
                steps[i].className = this.state.originalClass;
            }

            if(this.props.clickedApplication.status === "Submit Code for Review") {
                this.setState({showCodingChallenge: true});
            } else {
                this.setState({showCodingChallenge: false});
            }

            if(this.props.clickedApplication.status === "Schedule Interview") {
                this.setState({showScheduleInterviewText: true});
            } else {
                this.setState({showScheduleInterviewText: false});
            }

            if(this.props.clickedApplication.status === "Attend Interview") {
                this.setState({showAttendInterviewText: true});
            } else {
                this.setState({showAttendInterviewText: false});
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
                </ul>
                <div className={"applicationStatusStepSpace"}>
                    <div className={"applicationStepCard"}>
                        <h2 className={"application-step-header"}>{this.props.clickedApplication.status}</h2>
                        <p className={"application-step-p"} hidden={!this.state.showCodingChallenge}>Please complete the following coding challenge and submit using the form below.</p>
                        <div hidden={!this.state.showCodingChallenge}>
                            <p>Write a program that prints out "Hello World!"</p>
                            <Form onSubmit={this.handleGitSubmit} className={"form-inline"}>
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
                                        className={"gitHubSubmissionButton"}
                                    >Submit</Button>
                                </FormGroup>
                            </Form>
                        </div>
                        <div hidden={!this.state.showScheduleInterviewText}>
                            <p>Please give the hiring manager <strong>1-2 weeks</strong> to get back to schedule your interview.</p>
                            <p>If you have any questions, please email the hiring manager at: <a href={"mailto:"+this.props.clickedApplication.requisition.admin.email}>{this.props.clickedApplication.requisition.admin.email}</a></p>
                        </div>
                        <div hidden={!this.state.showAttendInterviewText}>
                            <p>Congratulations! Your interview is set for April 28, 2019 at 3:00 PM</p>
                            <p>Please arrive at the HEB Headquarters no later than the stated time.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}