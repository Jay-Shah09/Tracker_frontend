import React,{useEffect,useState} from 'react'
import '../css/Dashboard.css'
import axios from 'axios'
import UserActivity from '../Components/UserActivity';

function Dashboard() {
    if(localStorage.getItem('button_state')===null){
        localStorage.setItem('button_state',false);
    }
    const [user,setUser] = useState(null);
    const [activityDbData, setActivityDbData] = useState();
    const [disable, setDisable] = useState(localStorage.getItem('button_state') === 'false' ? false : true);
    
    useEffect(()=>{
        const getUserDetails = async() => {
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
            .then((res)=>console.log(res.data.message))
            .catch((err)=>console.log(err));    
        } 
       user && storeUser();
    });
    
    useEffect(()=>{
        axios.get('https://localhost:3001/auth/getActivityDbData').then((res)=>setActivityDbData(res.data)).catch((err)=>console.log('getting data probll'));
    },[]);
    
    const [activityData, setActivityData] = useState({});
    const [ipData, setIpData] = useState();

    useEffect(()=>{
        const getApiData = () => {
            axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=53bc354af1a442eb8f7bc09f0ef6030d')
            .then(response => {
                setIpData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
        getApiData();
    },[disable]);

    useEffect(()=>{
        const getActivityData = () => {
            setActivityData({
                userid: user.id,
                username: user.displayName,
                status: disable ? 'Checked Out' : 'Checked In',
                // date_time: ipData.timezone.current_time,
                date_time: `${new Date().toString().substring(4,15)} | ${new Date().toString().substring(16,21)}`,
                userIP: ipData.ip_address,
                geolocation: `${ipData.longitude}/${ipData.latitude}`,
                
            })
        }
        user && ipData && getActivityData();
    },[user,ipData,disable]);
    
    const checkInHandler = async () => {
        await setDisable(!disable);
        localStorage.setItem('button_state',true);
        axios.post('https://localhost:3001/auth/addUserActivity', activityData).then((res)=>setActivityDbData(res.data)).catch((err)=>console.log(err));
        postMessage();
    }

    const checkOutHandler = () => {
        setDisable(!disable);    
        localStorage.setItem('button_state',false);    
        axios.post('https://localhost:3001/auth/addUserActivity', activityData).then((res)=>setActivityDbData(res.data)).catch((err)=>console.log(err));
        postMessage();
    }
    const postMessage = async() => {
        const webHookURL = 'https://hooks.slack.com/services/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';
        const data = {
            "text": `${activityData.username} ${activityData.status} at ${new Date().toString().substring(16,21)}`
        }
        const res = await axios.post(webHookURL, JSON.stringify(data), {
            withCredentials:false,
            transformRequest: [(data,headers)=>{
                delete headers.post["Content-Type"];
                return data;
            }]
        });
        if(res.status === 200){
            console.log('message posted successfully');
        }
        else{
            console.log('message is not posted');
        }
    }

    useEffect(() => {
        axios.get('https://localhost:3001/auth/getMessages');
    },[]);

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
                    <button className="attendence-btn check-in-btn" disabled={disable} onClick={checkInHandler}>Check In</button>
                    <button className="attendence-btn check-out-btn" disabled={!disable} onClick={checkOutHandler}>Check Out</button>
                </div>
            </div>
            <div className="activity-container">
                {activityDbData && activityDbData.map((item,index)=>{
                        return index<=5 && <UserActivity key={index} item={item}/>
                })}
            </div>
        </div>
    )
}

export default Dashboard
