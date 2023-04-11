import React,{Component} from 'react';

import Navbar from './Navbar.component';
import WeatherCard from './WeatherCard.component';

class WeatherHome extends Component
{
    render() {
      return (
        <div>
          <Navbar></Navbar>
          <WeatherCard></WeatherCard>
          {/* <SavedCityWeatherData></SavedCityWeatherData> */}
        </div>
        
      )
    }
}

export default WeatherHome;
