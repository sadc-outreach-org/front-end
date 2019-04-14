import React, {Component} from 'react';
import '../../../styles/CandidateProfile.css';
import {Input, Button} from 'reactstrap';
import axios from 'axios';
import {updateCandidateProfile} from '../../services.js'

class CandidateProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            streetAddress: '',
            zipCode: '',
            state: '',
            city: '',
            phoneNumber: '',
            githubLink: '',
            candidateID: ''
        };
    }

    componentDidMount() {
        axios.get('http://34.73.221.154:8080/users/'+localStorage.getItem("userID"))
            .then(res => {
                const user = res.data.result;
                console.log("User Data: " + JSON.stringify(user));
                this.setState({user});
                this.setState({userName : user.userName});
                this.setState({firstName : user.firstName});
                this.setState({lastName : user.lastName});
                this.setState({email : user.email});
                this.setState({streetAddress : user.streetAddress});
                this.setState({zipCode : user.zipCode});
                this.setState({state : user.state});
                this.setState({city : user.city});
                this.setState({phoneNumber : user.phoneNumber});
                this.setState({githubLink : user.githubLink});
                this.setState({candidateID: user.candidateID});
            })
    }

    handleUpdateButton() {
        let payload = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            streetAddress: this.state.streetAddress,
            zipCode: this.state.zipCode,
            state: this.state.state,
            city: this.state.city,
            phoneNum: this.state.phoneNum
        };
        updateCandidateProfile(this.state.candidateID, payload).then(res => {
            console.log("Update Profile Response: " + JSON.stringify(res));
        });
    }

    render() {
        let {userName, firstName, lastName, email, streetAddress, zipCode, state, city, phoneNumber, githubLink} = this.state;
        let disableUpdateButton =
            firstName !== this.state.user.firstName
            || lastName !== this.state.user.lastName
            || userName !== this.state.user.userName
            || email !== this.state.user.email
            || streetAddress !== this.state.user.streetAddress
            || zipCode !== this.state.user.zipCode
            || state !== this.state.user.state
            || city !== this.state.user.city
            || phoneNumber !== this.state.user.phoneNumber
            || githubLink !== this.state.user.githubLink;

        return (
            <div className={"profileView"}>
                <div className={"main-content"}>
                    <div className={"form"}>
                        <h1 className={"profile-header"}>Profile</h1>
                        <div className={"column"}>
                            <label htmlFor="">First Name</label>
                            <Input
                                type={"text"}
                                id={"firstName"}
                                className={"profileField"}
                                placeholder={"First Name"}
                                defaultValue={this.state.firstName}
                                onChange={(event) => this.setState({firstName: event.target.value})}
                            />
                            <label htmlFor="">Username</label>
                            <Input
                                type={"text"}
                                name={"username"}
                                id={"username"}
                                className={"profileField"}
                                placeholder={"Username"}
                                defaultValue={this.state.userName}
                                onChange={(event) => this.setState({userName: event.target.value})}
                            />
                            <label htmlFor="">City</label>
                            <Input
                                type={"text"}
                                id={"city"}
                                className={"profileField"}
                                placeholder={"City"}
                                defaultValue={this.state.city}
                                onChange={(event) => this.setState({city: event.target.value})}
                            />
                            <label htmlFor="">Address</label>
                            <Input
                                type={"text"}
                                id={"streetAddress"}
                                className={"profileField"}
                                placeholder={"Street Address"}
                                defaultValue={this.state.streetAddress}
                                onChange={(event) => this.setState({streetAddress: event.target.value})}
                            />
                            <label htmlFor="">Phone Number</label>
                            <Input
                                type={"text"}
                                id={"phone"}
                                placeholder={"Phone Number"}
                                className={"profileField"}
                                defaultValue={this.state.phoneNumber}
                                onChange={(event) => this.setState({phoneNumber: event.target.value})}
                            />
                        </div>
                        <div className={"column"}>
                            <label htmlFor="">Last Name</label>
                            <Input
                                type={"text"}
                                id={"lastName"}
                                className={"profileField"}
                                placeholder={"Last Name"}
                                defaultValue={this.state.lastName}
                                onChange={(event) => this.setState({lastName: event.target.value})}
                            />
                            <label htmlFor="">Email</label>
                            <Input
                                type={"text"}
                                id={"email"}
                                className={"profileField"}
                                placeholder={"Email"}
                                defaultValue={this.state.email}
                                onChange={(event) => this.setState({email: event.target.value})}
                            />
                            <label htmlFor="">State</label>
                            <Input
                                type={"text"}
                                id={"state"}
                                className={"profileField"}
                                placeholder={"State"}
                                defaultValue={this.state.state}
                                onChange={(event) => this.setState({state: event.target.value})}
                            />
                            <label htmlFor="">Zip Code</label>
                            <Input
                                type={"text"}
                                id={"zip"}
                                className={"profileField"}
                                placeholder={"Zip Code"}
                                defaultValue={this.state.zipCode}
                                onChange={(event) => this.setState({zipCode: event.target.value})}
                            />
                            <label htmlFor="">Github</label>
                            <Input
                                type={"text"}
                                id={"github"}
                                className={"profileField"}
                                placeholder={"Github Link"}
                                defaultValue={this.state.githubLink}
                                onChange={(event) => this.setState({githubLink: event.target.value})}
                            />
                        </div>
                        <Button
                            type={"submit"}
                            className={"btn-submit"}
                            onClick={() => this.handleUpdateButton()}
                            disabled={!disableUpdateButton}
                        >UPDATE</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CandidateProfileInfo;