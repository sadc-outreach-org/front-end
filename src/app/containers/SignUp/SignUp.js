import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Container, Row, Col, Alert} from 'reactstrap';
import '../../../styles/SignUp.css';
import {updatePassword} from '../../components/services';

const ConditionalAlert = ({visible, message})=> {
    if(visible){
        return(
            <Alert color={"danger"}>
                {message}
            </Alert>
        );
    } else return null;
}

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            passwordsMatch: true,
            userID: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();

        if(this.state.newPassword !== this.state.confirmPassword) {
            this.setState({passwordsMatch: false});
        } else {
            this.setState({passwordsMatch: true});
            let payload = {
                email: this.state.email,
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            };

            updatePassword(payload).then(res => {
                console.log("The following is the response for Signup:");
                console.log(res);
                console.log(res.data.result);
                if(res.status === 200) {
                    this.props.history.push('/login', {});
                }
            });
        }
    };

    render() {
        return (
            <div className={"signupContainer"}>
                <Container>
                    <Row>
                        <Col xs={"12"} md={{size: 6, offset: 3}} lg={{size: 4, offset: 4}}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <h1 className={"title"}>Update Password</h1>
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
                                        type={"password"}
                                        name={"password"}
                                        id={"password"}
                                        placeholder={"Old Password"}
                                        defaultValue={this.state.oldPassword}
                                        onChange={(event) => this.setState({oldPassword: event.target.value})}
                                        required
                                    />
                                    <Input
                                        type={"password"}
                                        name={"password"}
                                        id={"password"}
                                        placeholder={"New Password"}
                                        defaultValue={this.state.password}
                                        onChange={(event) => this.setState({newPassword: event.target.value})}
                                        required
                                    />
                                    <Input
                                        type={"password"}
                                        name={"password"}
                                        id={"password"}
                                        placeholder={"Confirm Password"}
                                        defaultValue={this.state.confirmPassword}
                                        onChange={(event) => this.setState({confirmPassword: event.target.value})}
                                        required
                                    />
                                    <ConditionalAlert visible={!this.state.passwordsMatch} message={"Passwords must match!"}/>
                                    <Button
                                        type={"submit"}
                                        className={"submitSignup btn-block"}
                                    >UPDATE PASSWORD</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SignUp;