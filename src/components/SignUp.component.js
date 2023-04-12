import React,{Component} from 'react';
import { GoogleLogin } from '@react-oauth/google';

import "./css/loginCard.css";
import Navbar from './Navbar.component';

class SignUp extends Component
{
    render() {
        const onLoginSuccess = (response) => {
            console.log(response)
        }
        const onLoginError = (error) => {
            console.log(error)
        }
      return (
        <div>
            <Navbar></Navbar>
            <div className="card">
                <div className="card-body">
                <div className="card-title">
                    <h2>Sign Up</h2>
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
                    <input className="submit-btn" type="submit" name="submit" value="Sign Up" />
                    <a href="/login" id="signup">Already Have Account? Login here</a>
                    
                </form>
                <div id="card-title" className='btn'>
                    <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError}></GoogleLogin>
                </div>
                </div>
            </div>
        </div>
      )
    }
}

export default SignUp;
