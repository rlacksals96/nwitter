import React from 'react';

const Home=()=>{
    return(
        <div>
            <form>
                <input type="text" placeholder="what's on your mind" maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>
        </div>
    )
}

export default Home;