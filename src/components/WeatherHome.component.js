import React,{Component} from 'react';

import Navbar from './Navbar.component';
import WeatherCard from './WeatherCard.component';
import WatchList from './WatchList.component';
class WeatherHome extends Component
{
    render() {
      return (
        <div>
          <Navbar></Navbar>
          <div>
            <div style={{"float":"left"}}>
            <WeatherCard></WeatherCard>
            </div>      
            {/* <div style={{"float":"left"}}>     
            <WatchList></WatchList>
            </div>    */}
          </div>
        </div>
        
      )
    }
}

export default WeatherHome;
