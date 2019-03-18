import React, { Component } from 'react';
//import resumeFile from '../../../images/Resume_2018_Dec_18_Gerardo_Gonzalez.pdf';
import {getResume} from "../../components/services";




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
            window.open(fileURL);
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