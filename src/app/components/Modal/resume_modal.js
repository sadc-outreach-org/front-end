import React from 'react';
import '../../../styles/pdf_modal.css';


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
            <div className={"applicationResume"} id="modalPDF">
                <iframe  id = "IframeOnModal" src = {fileURL} width="95%" height="750px" frameborder="0"/>
            </div>
        )
    }
}