import React,{useState} from 'react';
import {dbService} from "../fbase";

const Nweet=({nweetObj,isOwner})=>{
    const [editing,setEditing]=useState(false);
    const [newNweet,setNewNweet]=useState(nweetObj.text);
    const onDeleteClick= async()=>{
        const ok=window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok);
        if(ok){
            //delete nweet;
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }

    }
    const toggleEditing=()=>{
        setEditing(prev=>!prev);

    }
    const onSubmit= async (event)=>{
        event.preventDefault();
        // console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        })
        setEditing(false);
    }
    const onChange=(event)=>{
        const {
            target:{value},
        }=event;
        setNewNweet(value);
    }
    return(
            <div>
                {editing? (
                    <>
                            <form>
                                <input type="text"
                                       placeholder="edit your nweet"
                                       value={newNweet}
                                       required
                                       onChange={onChange}

                                />
                                <input type="submit" value="Update Nweet" onClick={onSubmit}/>
                            </form>
                            <button onClick={toggleEditing}>Cancel</button>
                    </>
                        ):(
                        <>
                            <h4>{nweetObj.text}</h4>
                            { isOwner&&(
                                <>
                                    <button onClick={onDeleteClick}>Delete Nweet</button>
                                    <button onClick={toggleEditing}>edit Nweet</button>
                                </>
                            )}
                        </>
                    )
                }
            </div>

    )
}

export default Nweet;