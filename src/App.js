import './App.css';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WeatherHome from './components/WeatherHome.component';
import WeatherInfo from './components/WeatherInfo.component';
import Login from './components/Login.component';
import SignUp from './components/SignUp.component';

function App() {
  return (
    <div className="App">
      <Router> 
        <div className="container">
          <ToastContainer position='bottom-center'></ToastContainer>
          <Routes>
            <Route path="/" element={<WeatherHome />}/>
            <Route path="/getAllDetails" element={<WeatherInfo />}/>          
            <Route path="/login" element={<Login />}/>    
            <Route path="/signUp" element={<SignUp />}/>          
          </Routes>
        </div>
      </Router>
      {/* <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError}></GoogleLogin> */}
    </div>
  );
}

export default App;
