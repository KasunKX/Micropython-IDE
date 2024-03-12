import {motion} from 'framer-motion';
import React from 'react';
import './styles/land.css'
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import { Http } from '@mui/icons-material';
import {useNavigate, useLocation} from 'react-router-dom'
import { useState, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useObserver from './useObserver'

const LandingPage = () => {

    const navigate = useNavigate()
    const [logging, setLogging] = useState(false)

    const userRef = useRef()
    const passRef = useRef()

    const userRefcon = useRef()
    const passRefcon = useRef()

    const mainLogo = useRef()
    const para = useRef()
    const botBtn = useRef()

    const headAnim = useObserver(mainLogo.current, "appear");
    const paraAnim = useObserver(para.current, "appearPara");
    const btmBtn = useObserver(botBtn.current, "appearPara");
    

    const login = () => {

        let userName = userRef.current.value 
        let passw = passRef.current.value 


            if (userName === "admin.magicbits" && passw === "devs@magicbit231"){ // Dumbest thing i've ever done
                console.log("OK") 
                setLogging(true)
                setTimeout(() => {
                    navigate("/app", {state: {authenticated : true}})
                }, 3000)

            }else{
                console.log(userName.current)
                
                userRefcon.current.style.border = '1px solid red'
                passRefcon.current.style.border = '1px solid red'

                setTimeout(() => {
                    userRefcon.current.style.border = '1px solid black'
                    passRefcon.current.style.border = '1px solid black'
                }, 1000)
            }
        


        // navigate('/app', {state: 'hello'})
    }

    return <>
        <div className="land">
            
            <div className="left">
                
                <div className="head" ref={mainLogo}>
                    <img src="https://magicbit.cc/wp-content/uploads/2023/06/magicbit-logo-footer.png" alt="" />
                    <h1 className="title">Robot as a Service</h1>
                    <h3 className="demo">Demo Version</h3>
                </div>
                
                <div className="body" ref={para}>
                    <h3 className="para">Magicbit Robot as a Service empowers easy access to robot programming through your web browser.  Write Python code and witness real-time execution on a physical Magicbit robot via a live video stream. This eliminates the need for physical setup, allowing you to focus on coding from the start.  Magicbit offers visual debugging and a user-friendly environment to turn your Python code into real-world robot actions.</h3>
                </div>

                <div className="foot">
                    <button className="btn" ref={botBtn}>Learn More</button>
                </div>

            </div>

            <div className="right">

                <div className="form">
                    <h2 className="title">Sign In</h2>

                    <div className="inputs">
                    
                        <div className="userName inp" ref={userRefcon}>
                            <PersonIcon/>
                            <input type="text" name="" placeholder='User ID' ref={userRef}/>
                        </div>

                        <div className="passw inp" ref={passRefcon}>
                            <HttpsIcon/>
                            <input type="password" name="" id="" placeholder='Password' ref={passRef}/>
                        </div>

                        <h3 className="fogot">Fogot Password ?</h3>

                    </div>

                    <div className="buttons">
                        <button className="login"
                            style={logging? 
                                {
                                    background: 'transparent',
                                    border: 'none'
                                } 
                            :
                                {
                                    background: 'orange',
                                    border: '2px solid black'
                                }
                                } 
                                onClick={() => {login()}}>
                            {logging ? <CircularProgress size={30}/> : "Sign In"}
                        </button>
                        <h3 className="noAcc">Dont have an account ? </h3>
                        <button className="create">Create New Account</button>
                    </div>

                </div>

               
            </div>

        </div>
    </>
}

export default LandingPage;