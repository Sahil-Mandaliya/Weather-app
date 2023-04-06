// import React,{Component} from 'react';

// import {Night, SunnyDay} from '../resources/resourceConst'
// import Axios from 'axios';
// import "./css/card.css";
// import "./css/searchInput.css";
// import "./css/bgswap.css";

// class Search extends Component
// {
//   constructor(props)
//     {
//         super(props);
//         this.state={
//             searchQuery:'',
//             matchingCities:[],
//             data:null,
//             fetchedData:false
//         }
//         this.onChangeSearchQuery=this.onChangeSearchQuery.bind(this);
//         this.onSearchClick=this.onSearchClick.bind(this);
//     }

//     getWeatherData() {
//       Axios.get('http://localhost:9095',{
//         params: { 
//           query: this.state.searchQuery, 
//         },
//         headers: {
//           'Access-Control-Allow-Origin': '*'
//         }
//       })
//       .then((res)=>{
//         console.log("Seccuss : ",res)
//         var status = false;
//         if(res.data!==null &&  res.data.status === "OK") {
//           status=true;
//         }
//         if(res.data!==null && res.data.weather_data!==null && res.data.weather_data.error!==null) {
//           alert(res.data.weather_data.error.message)
//         } else {
//           this.setState({
//             data : res.data.weather_data,
//             fetchedData: status
//           })
//         }
//       })
//       .catch(err=>console.log("Error fetching city data :" + err)); 
//     }

//     componentDidMount() {
//       this.getWeatherData();
//     }

//     onChangeSearchQuery(e)
//     {
//         this.setState({
//           searchQuery:e.target.value
//         })
//         Axios.get('http://api.weatherapi.com/v1/search.json',{
//           params: { 
//             key: 'd6380343be614533abb201619233003', 
//             q: this.state.searchQuery 
//           }
//         })
//         .then((res)=>{
//           this.matchingCities = res.data
//         })
//         .catch(err=>console.log("Error fetching city data :" + err)); 
//     }

//     onSearchClick(e) {
//         e.preventDefault();
//         this.getWeatherData();
//     }
    
//     render() {
//       var logo = SunnyDay;
//       var textClass = "text-black-bold"
//       if(this.state.fetchedData) {
//         if(this.state.data.current.is_day===0) {
//           logo = Night
//           textClass = "text-white-bold"
//         }
//       }
//       return (
//         <div>
//           <div>
//             <form className="d-flex" role="search">
//               <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" onKeyUp={this.onChangeSearchQuery}></input>
//               <button className="btn btn-outline-success search-btn" type="submit" onClick={this.onSearchClick}>Search</button>
//             </form>
//           </div>
//           <div className="row">
//             <div className="col-sm-6">
//               <div className={`card ${textClass}`}>
//                 {/* <div className="card-header card-header-style">
//                   <b>{ this.state.fetchedData ? this.state.data.location.name + "(" +this.state.data.location.region + ", " + this.state.data.location.country + ")": "City Name"}</b>
//                 </div> */}
//                 <img src={logo} className="card-img"  style={{"width":"100%","height":"60vh"}} alt="Card"></img>
//                 <div className="card-body card-img-overlay data-font">
//                     <div className={`card-title' ${textClass}`}><b>{ this.state.fetchedData ? this.state.data.location.name + " (" +this.state.data.location.region + ", " + this.state.data.location.country + ")": "City Name"}</b></div>
//                     <ul className="list-group list-group-flush align-items-center">
//                       <li className={`list-group-item list-group-flush ${textClass}`}>
//                         <ul className="list-group list-group-horizontal list-group-flush">
//                           <li className={`list-group-item temp-font ${textClass}`}>{ this.state.fetchedData ? this.state.data.current.temp_c:""}</li>
//                           <ul className="list-group list-group-flush">
//                             <li className={`list-group-item ${textClass}`}>°C</li>
//                             <li className={`list-group-item ${textClass}`}>{ this.state.fetchedData ? this.state.data.current.condition.text :""}</li>
//                           </ul>    
//                         </ul>
//                       </li>
//                       <li className="list-group-item list-group-flush">
//                         <ul className="list-group list-group-flush">
//                         <li className={`list-group-item ${textClass}`}>{ this.state.fetchedData ? "Humidity : " + this.state.data.current.humidity:""}</li>
//                         <li className={`list-group-item ${textClass}`}>{ this.state.fetchedData ? "Wind speed(mph) : " + this.state.data.current.wind_mph:""}</li>
//                         </ul>
//                       </li>
//                     </ul>
//                     <a href="/getAllDetails" className="btn btn-primary">Get More Details</a>
//                 </div>
//                 </div>
//               </div>
//           </div>
//           <div className="dropdown">
//             <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//               Dropdown button
//             </button>
//             <ul className="dropdown-menu">
//               <li><a className="dropdown-item" href="/">Action</a></li>
//               <li><a className="dropdown-item" href="/">Another action</a></li>
//               <li><a className="dropdown-item" href="/">Something else here</a></li>
//             </ul>
//           </div>
//         </div>
//       )
//     }
// }

// export default Search;