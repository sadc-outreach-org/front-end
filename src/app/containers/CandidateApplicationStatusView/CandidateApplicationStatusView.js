import React, {Component} from 'react';
import CandidateSideNav from '../../components/SideNav/CandidateSideNav';
import ApplicationStatus from '../../components/ApplicationStatus/ApplicationStatus';
import '../../../styles/CandidateApplicationStatus.css';
import axios from 'axios';

class CandidateApplicationStatusView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // componentDidMount() {
    //     axios.get('http://cloud-25.cs.trinity.edu:8080/cmorale1/info')
    //         .then(res => {
    //             const user = res.data.result;
    //             this.setState({user});
    //             this.setState({userName : user.userName});
    //             this.setState({firstName : user.firstName});
    //             this.setState({lastName : user.lastName});
    //             this.setState({email : user.email});
    //             this.setState({streetAddress : user.streetAddress});
    //             this.setState({zipCode : user.zipCode});
    //             this.setState({state : user.state});
    //             this.setState({city : user.city});
    //             this.setState({phoneNumber : user.phoneNumber});
    //             this.setState({githubLink : user.githubLink});
    //         })
    // }

    render() {
        return (
            <div className={"applicationStatusView"}>
                <CandidateSideNav/>
                <ApplicationStatus/>
            </div>
        )
    }
}

export default CandidateApplicationStatusView;