// import React,{Component} from 'react';
// import { toast } from 'react-toastify';

// import Axios from 'axios';
// import "./css/card.css";
// import "./css/searchInput.css";
// import "./css/list.css";
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
//         console.log("props = ",props)
//         this.onChangeSearchQuery=this.onChangeSearchQuery.bind(this);
//         this.onSearchClick=this.onSearchClick.bind(this);
//         this.onClickDropdownCityListItem=this.onClickDropdownCityListItem.bind(this);
//     }
//     getWeatherDataWithCity(cityName){
//       Axios.get('http://localhost:9095',{
//         params: { 
//           query: cityName, 
//         },
//         headers: {
//           'Access-Control-Allow-Origin': '*'
//         }
//       })
//       .then((res)=>{
//         var status = false;
//         if(res.data!==null &&  res.data.status === "OK") {
//           status=true;
//         }
//         if(res.data!==null && res.data.weather_data!==null && res.data.weather_data.error!==null) {
//           toast.success(res.data.weather_data.error.message);
//         } else {
//           this.setState({
//             data : res.data.weather_data,
//             fetchedData: status
//           })
//           this.props.setWeatherData(res.data.weather_data)
//         }
//       })
//       .catch(err=>console.log("Error fetching city data :" + err)); 
//     }

//     onClickDropdownCityListItem(e){
//       e.preventDefault()
//       console.log(e);
//       document.getElementById("search-city-query").value = e.target.value
//       this.setState({
//           searchQuery:e.target.value
//         })
//     }

//     getWeatherData() {
//       console.log("kask = ",this.state.searchQuery)
//       this.getWeatherDataWithCity(this.state.searchQuery)
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
//           this.setState({
//             matchingCities:res.data
//           })
//         })
//         .catch(err=>console.log("Error fetching city data :" + err)); 
//     }

//     onSearchClick(e) {
//         e.preventDefault();
//         console.log("gsdbCJKXXJK")
//         this.getWeatherData();
//     }

//     render() {
//       return (
//         <div>
//           <div className="container">
//             <div className='row'>
//               <div className='col-sm'>
//                 <div className="dropdown">
//                   <div className='row'>
//                     <input className="form-control me-2 search-input dropdown-toggle col-sm-1" 
//                       id="search-city-query" 
//                       data-bs-toggle="dropdown" 
//                       type="search" 
//                       placeholder="Search (enter 2 or more character to search)" 
//                       aria-label="Search" onKeyUpCapture={this.onChangeSearchQuery}>
//                     </input>
//                     <button className="btn btn-outline-success search-btn col-sm-1" type="submit" onClick={this.onSearchClick}>Search</button>
//                     <div className="dropdown-menu search-list" aria-labelledby="dropdownMenuButton">
//                       {
//                         this.state.matchingCities.map(el => {
//                           return <button 
//                           className="dropdown-item"
//                               id={el.id}
//                               value={el.name}
//                               // onClick={()=>this.getWeatherDataWithCity(el.lat+","+el.lon)}
//                               onClick={this.onClickDropdownCityListItem}
//                               >
//                                 {el.name + ", "+el.region}
//                               </button>
//                         })
//                       }
//                     </div>
//                    </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//     }
// }

// export default Search;
