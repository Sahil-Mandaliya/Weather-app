import React,{Component, useEffect, useState} from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import Axios from 'axios';
import { refreshTokenSetup } from '../utils/refreshToken';

import "./css/loginCard.css";
import Navbar from './Navbar.component';


function addNewUser(profile) {
    Axios.post('http://localhost:9095/create_user',{
            name: profile.name,
            email:profile.email,
            password:profile.id
        },
        {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
      )
}

function GoogleLoginComponent() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
            refreshTokenSetup(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                Axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        addNewUser(res.data)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    return (
        // <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError}></GoogleLogin>
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
    )
}

class Login extends Component
{
    render() {
      return (
        <div>
            <Navbar></Navbar>
            <div className="login-card">
                <div className="login-card-body">
                <div className="login-card-title">
                    <h2>LOGIN</h2>
                    <div className="underline-title"></div>
                </div>
                <form method="post" className="form">
                    <label for="user-email" style={{"paddingTop":"13px"}}>
                        &nbsp;Email
                    </label>
                    <input id="user-email" className="form-content" type="email" name="email" autoComplete="on" required />
                    <div className="form-border"></div>
                    <label for="user-password" style={{"paddingTop":"22px"}}>&nbsp;Password
                    </label>
                    <input id="user-password" className="form-content" type="password" name="password" required />
                    <div className="form-border"></div>
                    {/* <a href="#"> */}
                    <legend id="forgot-pass">Forgot password?</legend>
                    {/* </a> */}
                    <input className="submit-btn" type="submit" name="submit" value="LOGIN" />
                    <a href="/signUp" id="signup">Don't have account yet?</a>
                    
                </form>
                <div id="login-card-title" className='btn'>
                    <GoogleLoginComponent></GoogleLoginComponent>
                </div>
                </div>
            </div>
        </div>
      )
    }
}

export default Login;
