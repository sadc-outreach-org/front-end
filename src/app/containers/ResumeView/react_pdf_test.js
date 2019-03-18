import React, { Component } from 'react';
import resumeFile from '../../../images/Resume_2018_Dec_18_Gerardo_Gonzalez.pdf';
import {getResume} from '../../services.js';


//Thumbnail
const fs = require("fs")
const { join } = require("path")
const pdf = require("../index")

//with buffer
pdf(fs.readFileSync(join(__dirname, "pdf", "test.pdf")), {
    compress: {
        type:"JPEG",
        quality: 70
    }
})
    .then(data /*is a buffer*/ => data.pipe(fs.createWriteStream(join(__dirname, "previews", "previewBuffer.jpg"))))
    .catch(err => console.error(err))

// //with stream
pdf(fs.createReadStream(join(__dirname, "pdf", "test.pdf")), {
    compress: {
        type:"JPEG",
        quality: 70
    }
})
    .then(data /*is a buffer*/ => data.pipe(fs.createWriteStream(join(__dirname, "previews", "previewStream.jpg"))))
    .catch(err => console.error(err))

class resume extends Component {
    state = {
        file: new File([""], "resume.pdf", {
            type: "application/pdf",
        })
    };

    componentDidMount() {
        getResume().then(res => {

            //Create a Blob from the PDF Stream

            const file = new Blob(
                [res.data],
                {type: 'application/pdf'});
//Build a URL from the file
            const fileURL = URL.createObjectURL(file);
//Open the URL on new Window

            window.open(fileURL, "_blank");

        })
            .catch(error => {
                console.log(error);
            });
    }







    render() {
        return (
            <div>
                <div>

                </div>

                <a href= 'http://34.73.221.154:8080/users/1/resume'> view</a>
            </div>


    );
    }
}
export default resume;