import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './app/containers/Login/Login';
import AllCandidates from './app/containers/AllCandidatesView/AllCandidates';
import SignUp from './app/containers/SignUp/SignUp';
import MainCandidateView from './app/containers/MainCandidateView/MainCandidateView';
import MainHiringManagerView from './app/containers/MainHiringManagerView/MainHiringManagerView';
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
                        <Route path="/c-dashboard" component={MainCandidateView}/>
                        <Route path="/hm-dashboard" component={MainHiringManagerView}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;