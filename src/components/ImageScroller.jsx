import React from 'react'
import ReactDOM from 'react-dom/client'
import {useState, useEffect} from 'react'
import ImageShimmer from './shimmerUI/ImageShimmer'

function ImageScroller(){
    const [imageArray,setImageArray]=useState([])
    useEffect(()=>{
        async function Swiggy(){
        const response=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.97530&lng=77.59100&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const result=await response.json()
        setImageArray(result.data.cards[0].card.card.imageGridCards.info)
    }
    Swiggy()
    }, [])  
    

    if(imageArray.length==0){
        return <ImageShimmer/>
    }else{
        return (
            <div>
                <h2>What's on your mind?</h2>
                <div className='scroller-sec'>
                    {
                        imageArray.map((x)=>{
                            return (
                                <img key={x.imageId} className='img-scroller' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${x.imageId}`} alt="" />
                            )
                        })
                    }
                </div>
            </div>
        )
   }
}

export default ImageScroller