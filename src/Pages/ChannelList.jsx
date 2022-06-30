import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';
import { AppContext } from '../Context';
import '../css/ChannelList.css';
import CloseIcon from '@mui/icons-material/Close';

function ChannelList() {
    const [chId, setChId] = useState("");
    const {channelData, setChannelData} = useContext(AppContext);

    const handleChange = (e) => {
        setChId(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://localhost:3001/auth/addchannel', {channelId: chId}).then((res) => setChannelData(res.data)).catch((err)=>console.log(err));
        setChId("");
    }
    const channelDelete = async(id) => {
        await axios.post('https://localhost:3001/auth/deletechannel',{chid:id}).then((res)=>setChannelData(res.data)).catch((err)=>console.log(err));
    }

    useEffect(() => {
        axios.get('https://localhost:3001/auth/getChannelDbData').then((res) => setChannelData(res.data)).catch((err)=>console.log(err));
    }, []);

    return (
        <div className="channel-list-container">
            <form method="post" action="/mychannel" onSubmit={handleSubmit} className="add-channel-form">
                <input id="channel_list" name="channel_list" value={chId} autoComplete="off" type="text" onChange={handleChange}/>
                <button type="submit">Add</button>
            </form>
            <div className="channel-lists">
                {channelData && channelData.map((item,index) => {
                    return (
                        <div key={index} className="single-channel">
                            <p>{item.channelid}</p>
                            <p>{item.channelname}</p>
                            <p>{index > 0 && <button onClick={()=>{channelDelete(item._id)}} className="delete-channel-btn"><CloseIcon /></button>}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChannelList
