import React,{Component} from 'react';
import { toast } from 'react-toastify';

import BookMarkComponent from './BookMark.component'
import {Night, SunnyDay, getWeatherIcon} from '../resources/resourceConst'
import WatchList from './WatchList.component';

import Axios from 'axios';
import "./css/card.css";
import "./css/bookmark.css";
import "./css/searchInput.css";
import "./css/list.css";
import "./css/bgswap.css";

class WeatherCard extends Component
{
  constructor(props)
    {
        super(props);
        this.state={
            userId:4,
            searchQuery:'',
            selectedCityData:null,
            matchingCities:[],
            data:null,
            fetchedData:false,
            isBookMarked:false
        }
        this.onChangeSearchQuery=this.onChangeSearchQuery.bind(this);
        this.onSearchClick=this.onSearchClick.bind(this);
        this.onClickDropdownCityListItem=this.onClickDropdownCityListItem.bind(this);
    }
    getWeatherDataWithCity(cityName, cityRegion){
      Axios.get('http://localhost:9095',{
        params: { 
          city_name: cityName, 
          city_region:cityRegion,
          user_id:this.state.userId
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
          toast.success(res.data.weather_data.error.message);
        } else {
          this.setState({
            data : res.data.weather_data,
            fetchedData: status,
            isBookMarked:res.data.weather_data.bookmarkedCity
          })
        }
      })
      .catch(err=>console.log("Error fetching city data :" + err)); 
    }

    onClickDropdownCityListItem(e, cityData){
      e.preventDefault()
      document.getElementById("search-city-query").value = e.target.value
      this.setState({
          searchQuery:cityData.name,
          selectedCityData:cityData.region
        })
    }

    getWeatherData() {
      let cityRegion = "";
      if(this.state.data !== null || this.state.data !== undefined) {
        cityRegion = this.state.selectedCityData;
      }
      this.getWeatherDataWithCity(this.state.searchQuery, cityRegion)
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
          this.setState({
            matchingCities:res.data
          })
        })
        .catch(err=>console.log("Error fetching city data :" + err)); 
    }

    onSearchClick(e) {
        e.preventDefault();
        this.getWeatherData();
    }

    setWeatherData(cityData) {
      this.setState({
        data:cityData
      })
    }

    render() {
      var logo = SunnyDay;
      var textClass = "text-black-bold"
      if(this.state.fetchedData) {
        if(this.state.data.current.is_day===0) {
          logo = Night
          textClass = "text-white-bold"
        }
      }
      return (
        <div>
          <div className="container">
            <div className='row'>
              <div className='col-sm'>
                {/* <Search setWeatherData={()=>this.setWeatherData}></Search> */}
                <div className="dropdown">
                  <div className='row'>
                    <input className="form-control me-2 search-input dropdown-toggle col-sm-1" 
                      id="search-city-query" 
                      data-bs-toggle="dropdown" 
                      type="search" 
                      placeholder="Search (enter 2 or more character to search)" 
                      aria-label="Search" onKeyUpCapture={this.onChangeSearchQuery}>
                    </input>
                    <button className="btn btn-outline-success search-btn col-sm-1" type="submit" onClick={this.onSearchClick}>Search</button>
                    <div className="dropdown-menu search-list" aria-labelledby="dropdownMenuButton">
                      {
                        this.state.matchingCities.map(el => {
                          return <button 
                              className="dropdown-item"
                              id={el.id}
                              value={el.name}
                              // onClick={()=>this.getWeatherDataWithCity(el.lat+","+el.lon)}
                              onClick={(e) => this.onClickDropdownCityListItem(e,el)}
                              >
                                {el.name + ", "+el.region}
                              </button>
                        })
                      }
                    </div>
                   </div>
                </div>
                <div className="card info-card-style">
                  <img src={logo} className="card-img info-card-img-style" alt="Card"></img>
                  <div className="card-body d-flex flex-column card-img-overlay data-font">
                      <div>
                      { this.state.fetchedData ?  
                        <div className={`card-title' ${textClass}`}>
                          <b>{ this.state.fetchedData ? this.state.data.location.name + " (" +this.state.data.location.region + ", " + this.state.data.location.country + ")": "City Name"}</b>
                          {
                            this.state.userId > 0 ? <BookMarkComponent
                              key = {this.state.data.location.name + " (" +this.state.data.location.region + ", " + this.state.data.location.country + ")"}
                              userId= {this.state.userId}
                              cityData = {this.state.data.location}
                              isBookMarked = {this.state.isBookMarked}
                            ></BookMarkComponent>:<></>
                          }
                        </div>: 
                        <div></div>
                        }
                      </div>
                      
                      <ul className="list-group list-group-flush align-items-center">
                        <li className={`list-group-item list-group-flush ${textClass}`}>
                          <ul className="list-group list-group-flush list-group-horizontal">
                            <li className={`list-group-item list-group-flush temp-font ${textClass}`}>{ this.state.fetchedData ? this.state.data.current.temp_c:""}</li>
                            <ul className="list-group list-group-flush">
                              <li className={`list-group-item list-group-flush temp-sign ${textClass}`}>°C</li>
                              <li className={`list-group-item list-group-flush ${textClass}`}>
                                { this.state.fetchedData ? 
                                  <div>{this.state.data.current.condition.text} {getWeatherIcon(this.state.data.current.condition.text,this.state.data.current.is_day)} 
                                  </div>:""
                                  }
                              </li>
                            </ul>    
                          </ul>
                        </li>
                        <li className="list-group-item list-group-flush">
                          <ul className="list-group list-group-flush">
                            <li className={`list-group-item list-group-flush ${textClass}`}>{ this.state.fetchedData ? "Humidity : " + this.state.data.current.humidity:""}</li>
                            <li className={`list-group-item list-group-flush ${textClass}`}>{ this.state.fetchedData ? "Wind : " + this.state.data.current.wind_mph + "(mph)":""}</li>
                          </ul>
                        </li>
                      </ul>
                      <a href="/getAllDetails" className={`btn btn-primary mt-auto info-card-details-button-style ${textClass}`}>Get More Details</a>
                  </div>
                </div>
                <WatchList></WatchList>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default WeatherCard;
