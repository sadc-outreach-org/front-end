import React, { Component } from 'react';
import resumeFile from '../../../images/Resume_2018_Dec_18_Gerardo_Gonzalez.pdf';


class resume extends Component {


    render() {
        return (
            <div>
                <div>
                    <iframe src= {resumeFile} width="50%" height="600" title = "Resume"></iframe>
                    <a href={resumeFile} target = "_blank"> view</a>
                </div>
            </div>


    );
    }
}
export default resume;