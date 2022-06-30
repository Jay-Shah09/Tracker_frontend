import React from 'react';
import '../css/Login.css';

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const slackLogin = async() => {
        window.open("https://localhost:3001/auth/slack", "_self");
    }

    return (
        <div className="login-container">
            <h1>Login via Slack</h1>
            <form method="post" action="/login" className="login-form" onSubmit={handleSubmit}>
                <button type="submit" className="sample-btn login-btn" onClick={slackLogin}>Login</button>
            </form> 
        </div>
    )
}

export default Login
