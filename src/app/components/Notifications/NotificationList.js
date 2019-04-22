import React from 'react';
import { getNotifications, markNotificationRead } from "../services";

export default class NotificationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            hasNotifications: false
        };
        this.fetchNotifications = this.fetchNotifications.bind(this);
    }

    componentDidMount(){
        this.fetchNotifications();
    }

    fetchNotifications = () => {
        console.log("FETCHING NOTIFICATIONS!");
        getNotifications(localStorage.getItem("userID")).then(res => {
            const notificationList = res.data.result;
            this.setState({notifications: notificationList});
            if(notificationList.toString() === "") {
                console.log("Notifications are empty");
                this.setState({hasNotifications : false});
            } else {
                console.log("Notifications are not Empty");
                this.setState({hasNotifications : true});
            }
        });
    };

    render(){
        return(
            <div className={"notificationsContainer"}>
                <div className={"application-header"}>
                    <h1>Notifications</h1>
                </div>
                <p id={"notificationsAlert"} hidden={this.state.hasNotifications}><strong>You have no new notifications.</strong></p>
                <table hidden={!this.state.hasNotifications}>
                    <tbody>
                        {this.state.notifications.map(notification =>
                            <tr key={notification.notificationID}>
                                <td>
                                    {notification.hasRead ? notification.message : <b>{notification.message}</b>}
                                </td>
                                <td>
                                    <button onClick={() => markNotificationRead(notification.notificationID).then(this.fetchNotifications())}>
                                        X
                                    </button>
                                 </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

}