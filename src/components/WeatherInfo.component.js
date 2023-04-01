import React,{Component} from 'react';

import logo from '../resources/storm2.gif'

class WeatherInfo extends Component
{
    render() {
      return (
        <div className="card" style={{"width":"18rem"}}>
                <img src={logo} class="card-img-top" alt="..."></img>
                <div class="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="/" className="btn btn-primary">Go Home</a>
                </div>
        </div>
      )
    }
}

export default WeatherInfo;
