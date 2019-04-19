import React from 'react';
import { getNotifications, markNotificationRead } from "../services";

export default class NotificationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
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
        });
    }

    render(){
        return(
            <div>
                <table>
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