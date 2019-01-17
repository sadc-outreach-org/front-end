import React, {Component} from 'react';
import '../../../styles/AllCandidates.css';
import Candidates from '../../components/Candidates/Candidates';
import {Input} from 'reactstrap';

class AllCandidates extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className={"allCandidatesView"}>
                <div className={"tempNav"}>
                    <a href={"/"}>Home</a>
                    <a href={"/"}>Login</a>
                    <a href={"/"}>Signup</a>
                </div>
                <h1>All Candidates View</h1>
                <Input
                    type={"text"}
                    className={"AllCandidatesSearchField"}
                    placeholder={"Search by Name"}
                />
                <div className={"tableContainer"}>
                    <Candidates/>
                </div>
            </div>
        );
    }
}

export default AllCandidates;