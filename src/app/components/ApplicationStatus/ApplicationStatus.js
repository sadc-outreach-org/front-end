import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import '../../../styles/ApplicationStatus.css';
import {submitGitLink} from "../../services";
import {addNotification} from "../services";

export default class ApplicationStatus extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            gitLink: '',
            showUpdated: false,
            originalClass: 'progressbar-item',
            showCodingChallenge: false,
            showScheduleInterviewText: false,
            showAttendInterviewText: false,
            showSuccess: false,
            showGitLink: false
        };

        this.handleGitSubmit = this.handleGitSubmit.bind(this);
    }

    componentDidMount() {
        console.log('adminID: ');
        console.log(this.props.clickedApplication);
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
                this.setState({showGitLink: true});
            } else {
                this.setState({showCodingChallenge: false});
                this.setState({showGitLink: false});
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

        addNotification(this.props.clickedApplication.requisition.admin.adminID, `Candidate ${this.props.clickedApplication.candidate.firstName + ' ' + this.props.clickedApplication.candidate.lastName} has submitted their code for review!`);
        this.setState({showUpdated: true});
        this.setState({showSuccess: true});
        this.setState({showGitLink: false});
    };

    render() {
        return (
            <div className={"applicationStatusContainer"}>
                <div className={"application-header"}>
                    <h1>Application Status for {this.props.clickedApplication.requisition.title}</h1>
                </div>
                <ul className="progressbar">
                    <li className={"progressbar-item"}>Submit Code for Review</li>
                    <li className={"progressbar-item"}>Schedule Interview</li>
                    <li className={"progressbar-item"}>Attend Interview</li>
                </ul>
                <div className={"applicationStatusStepSpace"}>
                    <div className={"applicationStepCard"}>
                        <h2 className={"application-step-header"}>{this.props.clickedApplication.status}</h2>
                        <p className={"application-step-p"} hidden={!this.state.showCodingChallenge}>Please complete the following coding challenge and submit using the form below:{console.log("Coding Challenge Info: " + JSON.stringify(this.props.codingChallengeInfo))}</p>
                        <div hidden={!this.state.showCodingChallenge} className={"codingChallengeDiv"}>
                            <h2 className={"challenge-header"}><u>Your Challenge</u></h2>
                            <p className={"application-step-p"}><strong>{this.props.codingChallengeInfo.name}</strong> - {this.props.codingChallengeInfo.description}</p>
                            <div hidden={!this.state.showGitLink}>
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
                            <p hidden={!this.state.showSuccess}>Your application has been updated!</p>
                        </div>
                        <div hidden={!this.state.showScheduleInterviewText}>
                            <p>Please give the hiring manager <strong>1-2 weeks</strong> to schedule your interview.</p>
                            <p>For questions, please email the hiring manager at: <a href={"mailto:"+this.props.clickedApplication.requisition.admin.email}>{this.props.clickedApplication.requisition.admin.email}</a></p>
                        </div>
                        <div hidden={!this.state.showAttendInterviewText}>
                            <p>Congratulations! Your interview is set for <strong>{this.props.clickedApplication.interviewTime}</strong></p>
                            <p>Please arrive at the HEB Headquarters no later than the stated time.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}