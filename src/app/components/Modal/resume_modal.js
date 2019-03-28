
import React from 'react';
import '../../../styles/ApplicationStatus.css';
import pdf from '../../../images/Resume_2018_Dec_18_Gerardo_Gonzalez.pdf'

export default class resume_modal extends React.Component {
    state = {
        file: new File([""], "resume.pdf", {
            type: "application/pdf",
        })

    };

    render() {
        const fileURL = URL.createObjectURL(this.props.file);
        //window.open(fileURL, "_parent ");
        return (
            <div className={"applicationStatusContainer"}>
                <iframe  src = {fileURL} frameborder="0"/>
            </div>
        )
    }
}
