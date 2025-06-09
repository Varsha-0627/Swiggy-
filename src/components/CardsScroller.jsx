import React from 'react'
import ReactDOM from 'react-dom/client'
import {useState,useEffect} from 'react'
import CardShimmer from './shimmerUI/CardShimmer'

function CardsScroller(){
    const [cardsArray,setCardsArray]=useState([])
    useEffect(()=>{
        async function Swiggy(){
        const response=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.97530&lng=77.59100&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const result=await response.json()
        setCardsArray(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }
    Swiggy()
    }, [])
    
    if(cardsArray.length==0){
        return <CardShimmer/>
    }else{    
        return(
        <div>
            <h2>Top restaurant chains in Chhindwara</h2>
            <div className='card-scroller-sec'>
                {
                    cardsArray.map((x)=>{
                        return (<div className='card'>
                            <img className='card-img' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${x.info.cloudinaryImageId}`} alt="" />
                                <h3 className="card-text">{x.info.name}</h3>
                                <h4 className="card-text"><i className="bi card-icon bi-star-fill"></i> <span>{x.info.avgRating}</span> • <span>{x.info.sla.slaString}</span></h4>
                                <p className="card-text">{x.info.cuisines.join(',')}</p>
                                <p className="card-text">{x.info.areaName}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        )
    }

}

export default CardsScroller