import React from 'react';
import { getNotifications } from "../services";

export default class NotificationList extends React.Component {
    state = {
        notifications: ['a', 'b', 'c']
    };

    componentDidMount(){
        getNotifications().then(res => {
            const notificationList = res.data.result;
            //this.setState({notifications: notificationList});
        });
    }
    render(){
        return(
            <div>
                <table>
                    <tbody>
                        {this.state.notifications.map(notification =>
                            <tr>
                                <td>
                                    Notification text
                                </td>
                                <td>
                                    X
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

}