import React, { Component } from 'react';
import {getResume} from '../../services';
import '../../../styles/pdf_modal.css';
import Pdf_modal from '../../components/Modal/resume_modal';
import Modal from 'react-modal';
import { Document, Page } from 'react-pdf';

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


export default class Applications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: new File([""], "resume.pdf", {
                type: "application/pdf",
            }),
            url: "",
            isShowing: false,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    componentDidMount() {
        getResume(57).then(res => {


//Create a Blob from the PDF Stream
            const pdf = new Blob(
                [res.data],
                {type: 'application/pdf'});
            //Save state of file
            this.setState({file : pdf});
            //Build a URL from the file
            const fileURL = URL.createObjectURL(pdf);
            this.setState({url : fileURL});
//Open the URL on new Window
            //window.open(fileURL, "_parent ");
        })
            .catch(error => {
                console.log(error);
            });
    }
    handleOpenModal () {
        this.setState({showModal: true})
    }
    handleCloseModal () {
        this.setState({showModal: false})
    }

    render() {
        let {file, url, isShowing} = this.state;
        const fileURL = URL.createObjectURL(file);
        const sample = 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf'
        const type = 'pdf';


        return (

            <div class="iframe-container">
                <iframe title="PDF" src = {fileURL}  />
                <button text = "Click me"  onClick={this.handleOpenModal}></button>
                <div >
                    <Modal isOpen={this.state.showModal} ariaHideApp={false} style={customStyling} contentLabel="Minimal Modal Example">
                        <div className="modalCloseButton" onClick={this.handleCloseModal}/>
                        <Pdf_modal file = {this.state.file}/>
                        <div className="printf" onClick={this.print_pdf} />
                    </Modal>

                </div>

            </div>

        )

    }
}