import React from 'react'
import '../css/UserActivity.css'

function UserActivity(props) {
    const {item} = props;
    return (
        <div className="single-activity">
            <p className="user-id">{item.username}</p>
            <p className="type">{item.status}</p>
            <p className="date-time">{item.date_time}</p>
            <p className="ip-add">{item.userIP}</p>
            <p className="geolocation">{item.geolocation}</p>
        </div>
    )
}

export default UserActivity
