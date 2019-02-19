import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import resumeFile from '../../../images/Resume_2018_Dec_18_Gerardo_Gonzalez.pdf';


class resume extends Component {
    state = {
        numPages: null,
        pageNumber: 1,
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div>
                <Document
                    file={resumeFile}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
                <div>
                    <iframe src= {resumeFile}></iframe>
                </div>
            </div>


    );
    }
}
export default resume;