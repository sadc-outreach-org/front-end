import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './app/containers/Login/Login';
import AllCandidates from './app/containers/AllCandidatesView/AllCandidates';
import SignUp from './app/containers/SignUp/SignUp';
import CandidateView from './app/containers/CandidateProfileView/CandidateProfileView';
import resume from './app/containers/ResumeView/react_pdf_test';
import resumeUp from './app/containers/ResumeUpload/ResumeUpload'
import './styles/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Route path="/" exact component={Login}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/candidates" component={AllCandidates}/>
                        <Route path="/user" component={CandidateView}/>
                        <Route path="/resume" component={resume}/>
                        <Route path="/resumeUpload" component = {resumeUp}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;