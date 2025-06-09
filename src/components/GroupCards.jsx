import React from 'react'
import ReactDOM from 'react-dom/client'
import {useState,useEffect} from 'react'
import GroupCardsShimmer from './shimmerUI/GroupCardsShimmer'
import { Link } from 'react-router-dom'

function GroupCards(){
    const [groupCardsArray,setGroupCardsArray]=useState([])
    const [searchInput,setSearchInput]=useState("")
    useEffect(()=>{
        async function Swiggy(){
        const response=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.97530&lng=77.59100&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const result=await response.json()
        setGroupCardsArray(result?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }
    Swiggy()
    }, [])
    
    function handleFilter(){
        console.log("filter buttn is triggered")
    }
    function handleSorting(){
        console.log("sorting buttn is triggered")
    } 
    function handleDelivery(){
        const result=groupCardsArray.filter((x)=>{
            return x.info.sla.deliveryTime<30
        })
    setGroupCardsArray(result)
    } 
    function handleRatings(){
        const result=groupCardsArray.filter((x)=>{
            return x.info.avgRating>4.2
        })
    setGroupCardsArray(result)
    }
    function handleVegFood(){
        console.log("vegfood buttn is triggered")
    }
    function handleOffers(){
        const result=groupCardsArray.filter((x)=>{
            return x.info.aggregatedDiscountInfoV3
        })
    setGroupCardsArray(result)
    }
    function handleCost(){
        const result=groupCardsArray.filter((x)=>{
            return x.info.costForTwo>300
        })
    setGroupCardsArray(result)
    }
    function handleLessCost(){
        const result=groupCardsArray.filter((x)=>{
            return x.info.costForTwo<300
        })
    setGroupCardsArray(result)    
    }
    function handleSearch(){
        const result=groupCardsArray.filter((x)=>{
            return x.info.name.toLowerCase().includes(searchInput.toLowerCase())
        })
    setGroupCardsArray(result)
    }


    if(groupCardsArray.length==0){
        return <GroupCardsShimmer/>
    }else{
        return(
            <div>
                <h2>Restaurants with online food delivery in Bangalore</h2>
                <div className='filter-sec'>
                    <div className='filter-btn-sec'>
                        <button onClick={handleFilter}>Filter <i className="bi bi-sliders"></i></button>
                        <button onClick={handleSorting}>Sort By <i className="bi bi-chevron-down"></i></button>
                        <button onClick={handleDelivery}>Fast Delivery</button>
                        <button onClick={handleRatings}>Ratings 4.2+</button>
                        <button onClick={handleVegFood}>Pure Veg</button>
                        <button onClick={handleOffers}>Offers</button>
                        <button onClick={handleCost}>Rs.300-Rs.600</button>
                        <button onClick={handleLessCost}>Less than Rs.300</button>
                    </div>
                    <div className='filter-s-sec'>
                        <input type="text" value={searchInput} onChange={(x)=>{setSearchInput(x.target.value)}} placeholder="What you want" />
                        <button className='search' onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className='group-card-sec'>
                    {
                        groupCardsArray.map((x)=>{
                            return (
                                <Link to={`/resto-list/${x?.info?.id}`}>
                                    <div className='group-card'>
                                        <img className='group-card-img' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${x.info.cloudinaryImageId}`} alt="" />
                                        <h3 className="group-card-text">{x.info.name}</h3>
                                        <h4 className="group-card-text"><i className="bi group-card-icon bi-star-fill"></i> <span>{x.info.avgRating}</span> • <span>{x.info.sla.slaString}</span></h4>
                                        <p className="group-card-text">{x.info.cuisines.join(',')}</p>
                                        <p className="group-card-text">{x.info.areaName}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }


}

export default GroupCards
