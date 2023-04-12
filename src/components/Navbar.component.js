import React,{Component} from 'react';
import Axios from 'axios';

class Navbar extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            searchQuery:'',
            matchingCities:[],
            data:null
        }
        this.onChangeSearchQuery=this.onChangeSearchQuery.bind(this);
        this.onSearchClick=this.onSearchClick.bind(this);
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
        .catch(err=>alert("Error fetching city data :" + err)); 
    }
    onSearchClick(e) {
        e.preventDefault();
        Axios.get('http://localhost:9095',{
          params: { 
            query: this.state.searchQuery, 
          }
        })
        .then((res)=>{
          this.data = res.data
        })
        .catch(err=>console.log("Error fetching city data :" + err)); 
    }
    render() {
      return (
        <div>
          <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <div className="navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item ">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/login">Login</a>
                  </li>
                </ul>
                {/* <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onKeyUp={this.onChangeSearchQuery}></input>
                  <button className="btn btn-outline-success" type="submit" onClick={this.onSearchClick}>Search</button>
                </form> */}
              </div>
            </div>
          </nav>
        </div>
      )
    }
}

export default Navbar;
