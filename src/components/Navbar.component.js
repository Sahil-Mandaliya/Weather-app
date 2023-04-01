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
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <div className="navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><hr className="dropdown-divider"></hr></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled">Disabled</a>
                  </li> */}
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
