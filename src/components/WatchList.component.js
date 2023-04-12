import React,{Component} from 'react';
import { toast } from 'react-toastify';

import BookMarkComponent from './BookMark.component'
import {Night, SunnyDay, getWeatherIcon} from '../resources/resourceConst'
import Axios from 'axios';
import "./css/card.css";
import "./css/bookmark.css";
import "./css/searchInput.css";
import "./css/list.css";
import "./css/watchlist.css";

function watchListFunctionCardComponent(city) {
    var logo = SunnyDay;
    var textClass = "watch-list-card-text-black-bold"
    if(city.current!==null && city.current.is_day===0) {
        logo = Night
        textClass = "watch-list-card-text-white-bold"
    }
    return (
        <li className='list-group-item list-group-flush' style={{"padding":"0%"}}>
            <div class="card watch-list-info-card-style" style={{"max-width":"100%","padding":"1%"}}>
                <img src={logo} className="card-img watch-list-info-card-img-style" alt="Card"></img>
                <div class="card-body card-img-overlay">
                    <div>
                        <div className={`card-title' ${textClass}`}>
                            <b>{city.location.name + " (" + city.location.region + ", " + city.location.country + ")"}</b>
                        </div>
                        </div>
                        
                        <ul className="list-group list-group-flush align-items-center">
                        <li className={`list-group-item list-group-flush ${textClass}`}>
                            <ul className="list-group list-group-flush list-group-horizontal">
                            <li className={`list-group-item list-group-flush watch-list-card-temp-font ${textClass}`}>{city.current.temp_c}</li>
                            <ul className="list-group list-group-flush">
                                <li className={`list-group-item list-group-flush temp-sign ${textClass}`}>°C</li>
                                <li className={`list-group-item list-group-flush ${textClass}`}>
                                    <div>{city.current.condition.text} {getWeatherIcon(city.current.condition.text,city.current.is_day)} 
                                    </div>
                                </li>
                            </ul>    
                            </ul>
                        </li>
                        <li className="list-group-item list-group-flush">
                            <ul className="list-group list-group-flush">
                            <li className={`list-group-item list-group-flush ${textClass}`}>{ "Humidity : " + city.current.humidity}</li>
                            <li className={`list-group-item list-group-flush ${textClass}`}>{ "Wind : " + city.current.wind_mph + "(mph)"}</li>
                            </ul>
                        </li>
                        </ul>
                {/* <ul className="list-group list-group-flush list-group-horizontal">
                    <li className="list-group-item list-group-flush temp-font">10</li>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item list-group-flush temp-sign">°C</li>
                        <li className="list-group-item list-group-flush">
                            <div>{getWeatherIcon("rainy",0)} </div>
                        </li>
                    </ul>    
                </ul> */}
                </div>
            </div>
        </li>
    )
}

class WatchList extends Component
{
  constructor(props)
    {
        super(props);
        this.state={
            user_id:4,
            list:[]
        }
    }

    getUserSavedCitiesData() {
        Axios.get('http://localhost:9095/user_saved_cities',{
            params: { 
                user_id:this.state.user_id
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then((res) => {
            if(res.data === null || res.data === undefined) {
                toast.error("Error wetching saved city data");
                return;
            }
            this.setState({
                list:res.data.city_data
            })
        }).catch((err) => {
            toast.error(err);
        });
    }

    componentDidMount() {
        this.getUserSavedCitiesData() 
    }

    render() {

      return (
        <div className="card watch-list-card">
            <div className="card-header">
                <span>Your Favorite Cities</span>
            </div>
            <div className="card-body d-flex flex-column" style={{"padding":"0%","overflow":"scroll"}}>
                <ul className='list-group list-group-flush'>
                    {
                        this.state.list.map((city) => {
                            return watchListFunctionCardComponent(city)
                        })
                    }
                </ul>
            </div>
        </div>
      )
    }
}

export default WatchList;
