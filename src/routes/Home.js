import React,{useState} from 'react';
import {dbService} from "../fbase";

const Home=()=>{
    const [nweet,setNweet]=useState("");
    const onSumbit=async (event)=>{
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet,
            createdAt:Date.now(),
        });
        setNweet("");
    };

    const onChange=(event)=>{
       const {target:{value}}=event;
       setNweet(value);
    };
    return(
        <div>
            <form onSubmit={onSumbit}>
                <input type="text" value={nweet} onChange={onChange} placeholder="what's on your mind" maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>
        </div>
    )
}

export default Home;