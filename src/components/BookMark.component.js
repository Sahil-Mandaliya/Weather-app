import React,{Component} from 'react';
import { toast } from 'react-toastify';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import Axios from 'axios';
import "./css/card.css";
import "./css/bookmark.css";

class BookMarkComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            bookmark:this.props.isBookMarked,
            bookMarkStyle:this.props.isBookMarked === true ? "bookMarked" : "bookMark"
        }
        this.onClickBookMark =  this.onClickBookMark.bind(this);
    }
    
    changeBookmarkStatus(status) {
        let action="bookmark_city"
        if(status === "remove") {
            action = "remove_from_bookmark"
        }
        let cityData = this.props.cityData;
        if(cityData === null || cityData === undefined ) {
            toast.error("Please choose correct city");
            return;
        }
        Axios.post('http://localhost:9095/'+action,{
                user_id:this.props.userId,
                city_data: {
                    name:cityData.name,
                    region:cityData.region,
                    country:cityData.country,
                    latitude:cityData.latitude,
                    longitude:cityData.longitude
                }
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        )
        .then((res)=>{
            if(res.data!==null) {
                if(res.data.success === true) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            } else {
                toast.error("Something went wrong");
            }
        })
        .catch(err=>toast.error("Something went wrong! Error changing status")); 
    } 

    onClickBookMark(currentStatus) {
        if(currentStatus === true) {
            this.changeBookmarkStatus("remove")
            this.setState({
                bookmark:false,
                bookMarkStyle:"bookMark"
            })
        } else {
            // this.addBookmark(e);
            this.changeBookmarkStatus("add")
            this.setState({
                bookmark:true,
                bookMarkStyle:"bookMarked"
            })
        }
    }

    render() {
        if(this.state.bookmark === false) {
            return (
                <AiOutlineHeart 
                    className = {this.state.bookMarkStyle}
                    onClick = {()=>this.onClickBookMark(false)}
                >
                </AiOutlineHeart>
            )
        } else {
            return (
                <AiFillHeart 
                    className = {this.state.bookMarkStyle}
                    onClick = {()=>this.onClickBookMark(true)}
                >
                </AiFillHeart>
            )
        }
    }
}

export default BookMarkComponent;
