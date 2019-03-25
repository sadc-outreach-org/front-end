import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/heb-red.png';
import {Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import '../../../styles/Login.css';
import { login } from '../../services';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
                    this.props.history.push('/c-dashboard/profile', {});
                 }
            })
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