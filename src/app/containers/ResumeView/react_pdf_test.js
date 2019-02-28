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
            const file = res.data.result;
            this.setState({file});
            alert(res.data.result)
        })
        console.log("yo")
    }


    render() {
        return (
            <div>
                <div>

                </div>

                <a href= 'http://34.73.221.154:8080/user/jbutt@gmail.com/resume'> view</a>
            </div>


    );
    }
}
export default resume;