import React, {Component} from 'react';
import {Button, Form, Input} from 'reactstrap';
import { uploadResume} from '../../services.js';


class resumeUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.onFileSubmit = this.onFileSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUp = this.fileUp.bind(this)
    }
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
        console.log("File be up")
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        return uploadResume("1",formData)
    }
    render() {
        return (
            <Form id = "resumeUploadForm" onSubmit={this.onFileSubmit}>
                <h1 className={"title"}>Resume Upload</h1>
                <Input id = "resumeUploadInput" type="file" name = "file" onChange={this.onChange}/>
                <Button
                    type={"submit"}
                    className={"submitResumeUpload btn-block"}
                >UPLOAD</Button>
            </Form>
        );
    }
}

export default resumeUpload;