import React, { Component } from 'react';
import resumeFile from '../../../images/Resume_2018_Dec_18_Gerardo_Gonzalez.pdf';
import  {getResume} from "../../components/services";


class resume extends Component {



    render() {
        return (
            <div>
                <div>
                    <iframe src= {resumeFile} width="50%" height="600" title = "Resume"></iframe>

                </div>

                <a href= 'http://34.73.221.154:8080/user/jbutt@gmail.com/resume'> view</a>
            </div>


    );
    }
}
export default resume;