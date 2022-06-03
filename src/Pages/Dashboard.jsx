import React,{useEffect,useState} from 'react'
import '../css/Dashboard.css'
import axios from 'axios'

function Dashboard() {
    const [user,setUser] = useState(null);
    useEffect(()=>{
        const getUserDetails = async() => {
        // fetch('https://localhost:3001/auth/login/success', {
        //     method: "GET",
        //     credentials: "include",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Credentials": true,
        //     },
        // }).then((response)=>{
        //     if(response.status === 200) {
        //         return response.json();
        //     }
        // }).then((resObject)=>{
        //     setUser(resObject.user);
        // }).catch((err)=>{
        //     console.log(err);
        // });
        try {
            const response = await fetch('https://localhost:3001/auth/login/success', {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",                    
                    "Access-Control-Allow-Credentials": true,
                }
            });
            const data = await response.json();
            setUser(data.user);
        }
        catch(err) {
            console.log(err);
        }
    }  
    getUserDetails();
  },[]);

    useEffect(()=>{
        const storeUser = () => {
            axios.post('https://localhost:3001/auth/addUser', {userid: user.id})
            .then((res)=>console.log('completed'))
            .catch((err)=>console.log(err));    
        } 
       user && storeUser();
    });

const logoutHandler = () => {
    window.open('https://localhost:3001/auth/logout', '_self');
}

    return (
        <div className="dashboard-container">
            <div className="header-container">
                <div className="logout-btn-container">
                    <button className="logout-btn attendence-btn" onClick={logoutHandler}>Logout</button>
                </div>
            </div>
            <div className="btn-cont">
                {user ? <h1 className="dashboard-text">Welcome {user.displayName}</h1> : <h1 className="dashboard-text">Welcome</h1>}
                <div className="attendence-btn-container">
                    <button className="attendence-btn check-in-btn">Check In</button>
                    <button className="attendence-btn check-out-btn">Check Out</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
