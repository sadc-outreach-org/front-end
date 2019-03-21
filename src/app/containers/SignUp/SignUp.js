import React, {Component} from 'react';
import logo from '../../../images/heb-red.png';
import {Button, Form, FormGroup, Input, Container, Row, Col, Alert} from 'reactstrap';
import '../../../styles/SignUp.css';
import {addCandidate} from '../../services';

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
            firstName: '',
            lastName: '',
            phoneNum: '',
            streetAddress: '',
            zipCode: '',
            city: '',
            state: '',
            gitLink: '',
            password: '',
            confirmPassword: '',
            passwordsMatch: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();

        if(this.state.password !== this.state.confirmPassword) {
            this.setState({passwordsMatch: false});
        } else {
            this.setState({passwordsMatch: true});
            let payload = {
                email: this.state.email,
                password: this.state.password,
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
                <img src={logo} className={"hebLogo"} alt={"hebLogo"}/>
                <Container>
                    <Row>
                        <Col xs={"12"} md={{size: 6, offset: 3}} lg={{size: 4, offset: 4}}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <h1 className={"title"}>Sign Up</h1>
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
                                        type={"text"}
                                        name={"gitlink"}
                                        id={"gitlink"}
                                        placeholder={"Git Link"}
                                        defaultValue={this.state.gitLink}
                                        onChange={(event) => this.setState({gitLink: event.target.value})}
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
                                    >SIGN UP</Button>
                                    <a href={"/"}>Already have an account?</a>
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