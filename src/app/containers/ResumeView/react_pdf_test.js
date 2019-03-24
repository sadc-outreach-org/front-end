import React, { Component } from 'react';
//import resumeFile from '../../../images/Resume_2018_Dec_18_Gerardo_Gonzalez.pdf';
import {getResume} from '../../services.js';
//import {Thumbnail} from 'react-thumbnail';



class resume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: new File([""], "resume.pdf", {
                type: "application/pdf",
            })
        };
    }

    componentDidMount() {
        getResume().then(res => {
//Create a Blob from the PDF Stream
            const pdf = new Blob(
                [res.data],
                {type: 'application/pdf'});
            console.log("    ");
            console.log(res.data);
            console.log("    ");
            console.log(pdf);
            //Save state of file
            this.setState({file : pdf});

//Build a URL from the file
            const fileURL = URL.createObjectURL(pdf);
//Open the URL on new Window
            window.open(fileURL, "_blank");
        })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        let {file} = this.state;
        console.log(file)
        const fileURL = URL.createObjectURL(file);

        return (
    <div>
        {/*<Thumbnail>*/}
            {/*width={250}*/}
            {/*height={250}*/}
            {/*page={fileURL}*/}
            {/*scale={4}*/}
        {/*</Thumbnail>*/}
        <iframe title="PDF" src = {fileURL}/>
    </div>
        )

    }
}
export default resume;