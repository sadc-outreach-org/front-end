import React, {Component} from 'react';
import '../../../styles/CandidateProfile.css';
import {Input, Button, Form} from 'reactstrap';
import axios from 'axios';
import {getResume} from '../../services.js';
import '../../../styles/pdf_modal.css';
import Pdf_modal from '../../components/Modal/resume_modal';
import Modal from 'react-modal';
//import Form from "reactstrap/src/Form";
import {uploadResume} from "../services";

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.7)';
const customStyling = {
    content : {
        top: '50.5%',
        left: '50%',
        height: '750px',
        // right: 'auto',
        // bottom: 'auto',
        transform: 'translate(-50%, -50%)',

    }
};

class CandidateProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: new File([""], "resume.pdf", {
                type: "application/pdf",
            }),
            url: "",
            isShowing: false,
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
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.onFileSubmit = this.onFileSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUp = this.fileUp.bind(this)
    }

    componentDidMount() {
        axios.get('http://34.73.221.154:8080/users/'+localStorage.getItem("userID"))
            .then(res => {
                const user = res.data.result;
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
            })

        getResume(localStorage.getItem("userID")).then(res => {
            //Create a Blob from the PDF Stream
            console.log(localStorage.getItem("userID"))

            const pdf = new Blob(
                [res.data],
                {type: 'application/pdf'});
            //Save state of file
            this.setState({file : pdf});
            //Build a URL from the file
            const fileURL = URL.createObjectURL(pdf);
            this.setState({url : fileURL});
        })
            .catch(error => {
                console.log(error);
            });
    }
    //Resume Modal
    handleOpenModal () {
        this.setState({showModal: true})
    }
    handleCloseModal () {
        this.setState({showModal: false})
    }
    //Resume Upload
    onFileSubmit = event => {
        event.preventDefault()
        this.fileUp(this.state.file).then((response) => {
            console.log(response.data);
        })
    }
    onChange = event => {
        this.setState({file:event.target.files[0]})
    }
    fileUp(file) {
        const formData = new FormData();
        formData.append('file',file)
        console.log(localStorage.getItem("userID"))
        return uploadResume(localStorage.getItem("userID"),formData)
    }

    render() {
        let {file, url, isShowing, userName, firstName, lastName, email, streetAddress, zipCode, state, city, phoneNumber, githubLink} = this.state;
        let disableUpdateButton = firstName !== this.state.user.firstName
            || lastName !== this.state.user.lastName
            || userName !== this.state.user.userName
            || email !== this.state.user.email
            || streetAddress !== this.state.user.streetAddress
            || zipCode !== this.state.user.zipCode
            || state !== this.state.user.state
            || city !== this.state.user.city
            || phoneNumber !== this.state.user.phoneNumber
            || githubLink !== this.state.user.githubLink;
        const fileURL = URL.createObjectURL(file);
        const sample = 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf'
        const type = 'pdf';

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
                            <label htmlFor="">Resume</label>
                            <div>
                                <br/>
                            </div>
                            <div className="iframe-container">
                                <iframe title="PDF" src={fileURL+'#view=Fit&toolbar=0&statusbar=0&messages=0&navpanes=0&scrollbar=0'}/>
                                <button text="Click me" onClick={this.handleOpenModal}></button>
                                <div>
                                    <Modal isOpen={this.state.showModal} ariaHideApp={false} style={customStyling}
                                           contentLabel="Minimal Modal Example">
                                        <div className="modalCloseButton" onClick={this.handleCloseModal}/>
                                        <Pdf_modal file={this.state.file}/>
                                        <div className="printf" onClick={this.print_pdf}/>
                                    </Modal>
                                </div>
                            </div>
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
                            <label htmlFor="">Resume Upload</label>
                              <div >
                                <Form id = "resumeUploadForm" onSubmit={this.onFileSubmit}>
                                    <Input id = "resumeUploadInput" type="file" name = "file" onChange={this.onChange}/>
                                    <Button
                                        type={"submit"}
                                        className={"submitResumeUpload btn-block"}
                                    >UPLOAD</Button>
                                </Form>
                              </div>
                        </div>
                        <Button
                            type={"submit"}
                            className={"btn-submit"}
                            disabled={!disableUpdateButton}
                        >UPDATE</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CandidateProfileInfo;