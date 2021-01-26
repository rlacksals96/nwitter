import React, {useEffect, useState} from 'react';
import {dbService, storageService} from "../fbase";
import Nweet from "../components/Nweet";
import { v4 as uuidv4 } from 'uuid';
const Home=({userObj})=>{
    const [nweet,setNweet]=useState("");
    const [nweets,setNweets]=useState([]);
    const [attachment,setAttachment]=useState()

    const getNweets=async ()=>{
        const dbNweets=await dbService.collection("nweets").get();
        dbNweets.forEach(document=>{
            const nweetObject={
                ...document.data(),
                id:document.id,

            }
            setNweets(prev=>[nweetObject,...prev]);
        });

    }
    useEffect(()=>{
        dbService.collection("nweets").onSnapshot((snapshot => {
            const nweetArray=snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        }))
    },[])
    const onSumbit=async (event)=>{
        event.preventDefault();
        const fileRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response= await fileRef.putString(attachment,"data_url");
        console.log(response);
        // await dbService.collection("nweets").add({
        //     text:nweet,
        //     createdAt:Date.now(),
        //     creatorId:userObj.uid,
        // });
        // setNweet("");
    };
    // console.log(nweets);
    const onChange=(event)=>{
       const {target:{value}}=event;
       setNweet(value);
    };
    const onFileChange=(event)=>{
        // console.log(event.target.files);
        const {target:{files},
        }=event;
        const theFile=files[0];
        const reader=new FileReader();
        reader.onloadend=(finishedEvent)=>{
            console.log(finishedEvent);
            const {currentTarget:{result},
            }=finishedEvent;

            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment=()=>setAttachment(null);
    return(
        <div>
            <form onSubmit={onSumbit}>
                <input type="text"
                       value={nweet}
                       onChange={onChange}
                       placeholder="what's on your mind"
                       maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet"/>
                {attachment &&
                    <div>
                        <img src={attachment} width="50px" height="50px" alt="no image"/>
                        <button onClick={onClearAttachment}>Clear Photo</button>
                    </div>
                }
            </form>
            <div>
                {nweets.map((nweet)=>(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}

export default Home;