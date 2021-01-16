import React, {useState} from 'react';
import {authService, firebaseInstance} from "../fbase";

const Auth=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState("");

    const onChange=(event)=>{
        const {target:{name,value}}=event;
        if(name === "email"){
            setEmail(value);
        }else if(name==="password"){
            setPassword(value);
        }
    }
    const onSubmit=async (event)=>{
        event.preventDefault();//default는 새로고침이라 입력된 값 싹다 날아감. 그래서 이거 적어놓는 거임.

        try{
            let data;
            if(newAccount){
                //create account
                data= await authService.createUserWithEmailAndPassword(
                    email,password
                )
            }else{
                //log in
                data= await authService.signInWithEmailAndPassword(
                    email,password
                )
            }
            console.log(data);

        }catch(error){
            setError(error.message);

        }
    }
    const toggleAccount=()=>{
        setNewAccount((prev)=>!prev);
    }
    const onSocialClick=async (event)=>{
        const {target:{name}}=event;
        let provider;
        if(name==='google'){
            provider=new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name==='github'){
            provider=new firebaseInstance.auth.GithubAuthProvider();
        }
        const data=await authService.signInWithPopup(provider);
        console.log(data);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" onChange={onChange} name="email" placeholder="Email" required value={email}/>
                <input type="password" onChange={onChange} name="password" placeholder="Password" required value={password}/>
                <input type="submit" value={newAccount? "Create Account":"Sign in"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount?"Sign in":"Create Account"}
                </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with google</button>
                <button onClick={onSocialClick} name="github">Continue with github</button>
            </div>
        </div>
    )
}

export default Auth;