import React from 'react';
import logo from '../../../images/heb-red.png';
import {Button, Form, FormGroup, Input, Container, Row, Col, Alert} from 'reactstrap';
import '../../../styles/SignUp.css';
import {addCandidate, uploadResume} from '../../components/services';

const ConditionalAlert = ({visible, message})=> {
    if(visible){
        return(
            <Alert color={"danger"}>
                {message}
            </Alert>
        );
    } else return null;
}

class AddNewCandidate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            phoneNum: '',
            streetAddress: '',
            zipCode: '',
            city: '',
            state: '',
            resume: null,
            userID: '',
            candidateWasAdded: false
        };

        this.formRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileUp = this.fileUp.bind(this);
        this.successfulAddition = this.successfulAddition.bind(this);
    }

    fileUp(userID, file) {
        const formData = new FormData();
        console.log("This is the user ID pushed to fileUP method: " + userID);
        formData.append('file',file)
        /* Jerry had this in his resume upload stuff but it's unused and will
        cause errors in CircleCI. Will remove when verified it's not needed
         */
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        return uploadResume(userID, formData);
    }

    handleSubmit = event => {
        event.preventDefault();

        let payload = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            streetAddress: this.state.streetAddress,
            zipCode: this.state.zipCode,
            city: this.state.city,
            state: this.state.state,
            phoneNum: this.state.phoneNum,
            gitLink: this.state.githubLink
        };

         addCandidate(payload).then(res => {
             console.log("The following is the response for Signup:");
             console.log(res);
             console.log(res.data.result);
             console.log("Candidate ID from add candidate call: " + res.data.result.candidateID);
             this.setState({userID : res.data.result.candidateID});
             this.fileUp(res.data.result.candidateID, this.state.file).then((response) => {
                 console.log("The following is the response for file upload:");
                 console.log(response);
                 console.log(response.data.result);
             })
             if(res.status === 200) {
                 this.successfulAddition();
             }
         });
    };

    successfulAddition() {
        this.setState({
            email: '',
            firstName: '',
            lastName: '',
            phoneNum: '',
            streetAddress: '',
            zipCode: '',
            city: '',
            state: '',
            resume: null,
            candidateWasAdded: true
        })
        this.formRef.current.reset();
    }

    render() {
        return (
            <div className={"signupContainer"}>
                <img src={logo} className={"hebLogo"} alt={"hebLogo"}/>
                <Container>
                    <Row>
                        <Col xs={"12"} md={{size: 6, offset: 3}} lg={{size: 4, offset: 4}}>
                            <Form onSubmit={this.handleSubmit} innerRef={this.formRef}>
                                <FormGroup>
                                    <h1 className={"title"}>Add New Candidate</h1>
                                    <Input
                                        type={"text"}
                                        name={"firstname"}
                                        id={"firstname"}
                                        placeholder={"First Name"}
                                        defaultValue={this.state.firstName}
                                        onChange={(event) => this.setState({firstName: event.target.value})}
                                        required
                                    />
                                    <Input
                                        type={"text"}
                                        name={"lastname"}
                                        id={"lastname"}
                                        placeholder={"Last Name"}
                                        defaultValue={this.state.lastName}
                                        onChange={(event) => this.setState({lastName: event.target.value})}
                                        required
                                    />
                                    <Input
                                        type={"email"}
                                        name={"email"}
                                        id={"email"}
                                        placeholder={"Email"}
                                        defaultValue={this.state.email}
                                        onChange={(event) => this.setState({email: event.target.value})}
                                        required
                                    />
                                    <Input
                                        type={"text"}
                                        name={"phonenumber"}
                                        id={"phonenumber"}
                                        placeholder={"Phone Number"}
                                        defaultValue={this.state.phoneNum}
                                        onChange={(event) => this.setState({phoneNum: event.target.value})}
                                        required
                                    />
                                    <Input
                                        type={"text"}
                                        name={"streetaddress"}
                                        id={"streetaddress"}
                                        placeholder={"Street Address"}
                                        defaultValue={this.state.streetAddress}
                                        onChange={(event) => this.setState({streetAddress: event.target.value})}
                                        required
                                    />
                                    <Input
                                        type={"text"}
                                        name={"zipcode"}
                                        id={"zipcode"}
                                        placeholder={"Zip Code"}
                                        defaultValue={this.state.zipCode}
                                        onChange={(event) => this.setState({zipCode: event.target.value})}
                                        required
                                    />
                                    <Input
                                        type={"text"}
                                        name={"city"}
                                        id={"city"}
                                        placeholder={"City"}
                                        defaultValue={this.state.city}
                                        onChange={(event) => this.setState({city: event.target.value})}
                                        required
                                    />
                                    <Input
                                        type={"text"}
                                        name={"state"}
                                        id={"state"}
                                        placeholder={"State"}
                                        defaultValue={this.state.state}
                                        onChange={(event) => this.setState({state: event.target.value})}
                                        required
                                    />
                                    <Input
                                        type={"file"}
                                        name={"resume"}
                                        id={"resume"}
                                        defaultValue={this.state.gitLink}
                                        onChange={(event) => this.setState({file: event.target.files[0]})}
                                        required
                                    />
                                    <ConditionalAlert visible={this.state.candidateWasAdded} message={'Candidate successfully added!'}/>
                                    <Button
                                        type={"submit"}
                                        className={"submitSignup btn-block"}
                                    >ADD CANDIDATE</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AddNewCandidate;