import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import WeatherHome from './components/WeatherHome.component';
import WeatherInfo from './components/WeatherInfo.component';

function App() {
  return (
    
    <div className="App">
      <Router> 
        <div className="container">
          <Routes>
            <Route path="/" element={<WeatherHome />}/>
            <Route path="/getAllDetails" element={<WeatherInfo />}/>          
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
