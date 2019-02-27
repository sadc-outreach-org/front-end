import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import CandidateAppStatusView from './app/containers/CandidateApplicationStatusView/CandidateApplicationStatusView';
import AllCandidates from './app/containers/AllCandidatesView/AllCandidates';
import AllCandidateApplicationsView from './app/containers/AllCandidateApplicationsView/AllCandidateApplicationsView';
import MainCandidateProfileView from './app/containers/MainCandidateProfileView/MainCandidateProfileView';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MainCandidateProfileView/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
