import React,{Component} from 'react';

import {Night, Storm, SunnyDay} from '../resources/resourceConst'
import Axios from 'axios';

class WeatherCard extends Component
{
  constructor(props)
    {
        super(props);
        this.state={
            searchQuery:'',
            matchingCities:[],
            data:null,
            fetchedData:false
        }
        this.onChangeSearchQuery=this.onChangeSearchQuery.bind(this);
        this.onSearchClick=this.onSearchClick.bind(this);
    }

    getWeatherData() {
      Axios.get('http://localhost:9095',{
        params: { 
          query: this.state.searchQuery, 
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((res)=>{
        var status = false;
        if(res.data!==null &&  res.data.status === "OK") {
          status=true;
        }
        if(res.data!==null && res.data.weather_data!==null && res.data.weather_data.error!==null) {
          alert(res.data.weather_data.error.message)
        } else {
          this.setState({
            data : res.data.weather_data,
            fetchedData: status
          })
        }
      })
      .catch(err=>console.log("Error fetching city data :" + err)); 
    }

    componentDidMount() {
      this.getWeatherData();
    }

    onChangeSearchQuery(e)
    {
        this.setState({
          searchQuery:e.target.value
        })
        Axios.get('http://api.weatherapi.com/v1/search.json',{
          params: { 
            key: 'd6380343be614533abb201619233003', 
            q: this.state.searchQuery 
          }
        })
        .then((res)=>{
          this.matchingCities = res.data
        })
        .catch(err=>console.log("Error fetching city data :" + err)); 
    }

    onSearchClick(e) {
        e.preventDefault();
        this.getWeatherData();
    }
    
    render() {
      var logo = SunnyDay;
      if(this.state.fetchedData) {
        if(this.state.data.current.is_day===false) {
          logo = Night
        }
      }
      return (
        <div>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onKeyUp={this.onChangeSearchQuery}></input>
          <button className="btn btn-outline-success" type="submit" onClick={this.onSearchClick}>Search</button>
        </form>
        <div className="card" style={{"width":"36rem", "margin":"1%"}}>
                <img src={logo} className="card-img-top" width="400" height="300" alt="..."></img>
                <div className="card-body">
                        <h5 className="card-title">{ this.state.fetchedData ? this.state.data.location.name + "(" +this.state.data.location.region + ", " + this.state.data.location.country + ")": "City Name"}</h5>
                        <div class="container">
                          <div class="row">
                            <div class="col"> 
                              { this.state.fetchedData ? this.state.data.current.condition.text :""}
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              { this.state.fetchedData ? "Temprature :" + this.state.data.current.temp_c:""}
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              { this.state.fetchedData ? "Humidity : " + this.state.data.current.humidity:""}
                            </div>
                            <div class="col">
                              { this.state.fetchedData ? "Wind speed(mph) : " + this.state.data.current.wind_mph:""}
                            </div>
                          </div>
                        </div>
                        
                        {/* <p className="card-text">{ this.state.fetchedData ? this.state.data.current.condition.text :""}</p>
                        <p className="card-text">{ this.state.fetchedData ? "Temprature :" + this.state.data.current.temp_c:""}</p>
                        <p className="card-text">{ this.state.fetchedData ? "Humidity : " + this.state.data.current.humidity:""}</p>
                        <p className="card-text">{ this.state.fetchedData ? "Wind speed(mph) : " + this.state.data.current.wind_mph:""}</p> */}
                        <a href="/getAllDetails" style={{"margin":"1%"}} className="btn btn-primary">Get More Details</a>
                </div>
        </div>
        </div>
      )
    }
}

export default WeatherCard;
