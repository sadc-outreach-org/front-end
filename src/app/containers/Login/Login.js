import React, {Component} from 'react';
import logo from '../../../images/heb-red.png';
import {Button, Form, FormGroup, Input, Container, Row, Col, Alert} from 'reactstrap';
import '../../../styles/Login.css';
import { login } from '../../services';

const ConditionalAlert = ({visible, message})=> {
    if(visible){
        return(
            <Alert color={"danger"}>
                {message}
            </Alert>
        );
    } else return null;
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            badLogin: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = event => {
        event.preventDefault();
        let payload = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(payload);

        login(payload).then(res => {
                console.log(res);
                console.log(res.data.result);
                if(res.status === 200){
                    if(res.data.result.role === "Candidate")
                        this.props.history.push('/c-dashboard/profile', {});
                    else if(res.data.result.role === "Admin")
                        this.props.history.push('/hm-dashboard/profile', {});
                    else
                        console.log("Successfully logged in but user is not a candidate or admin!");
                 } else {
                    this.setState({badLogin: true});
                }
            }).catch( error => {
                this.setState({badLogin: true});
            });
    };

    render() {
        return (
            <div className={"loginContainer"}>
                <div className={"loginForm"}>
                    <img src={logo} className={"hebLogo"} alt={"hebLogo"}/>
                    <Container>
                        <Row>
                            <Col xs={"12"} md={{size: 6, offset: 3}} lg={{size: 4, offset: 4}}>
                                <Form onSubmit={this.handleClick}>
                                    <FormGroup>
                                        <h1>Login</h1>
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
                                            placeholder={"Password"}
                                            defaultValue={this.state.password}
                                            onChange={(event) => this.setState({password: event.target.value})}
                                            required
                                        />
                                        <ConditionalAlert visible={this.state.badLogin} message={'Incorrect username or password!'}/>
                                        <Button
                                            type={"submit"}
                                            className={"submitSignup btn-block"}
                                        >LOG IN</Button>
                                        <a href={"/"}>Forgot Password?</a><br/>
                                        <a href={"/"}>Don't have an account?</a>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Login;