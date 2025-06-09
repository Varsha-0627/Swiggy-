import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {addCart} from '../redux/ReduxSlice'
import { useDispatch } from 'react-redux'


function RestoList() {
    const [offersInfo, setOffersInfo] = useState(null)
    const [flatOffersArray, setFlatOffersArray] = useState([])
    const [listArray, setListArray] = useState([])
    const [count,setCount]=useState(0)
    const cart_data=[]
    const { id } = useParams()
    console.log(id)
    const data=useSelector((store)=>{
        return store.cartStore
    })
    const dispatch=useDispatch()

    useEffect(() => {
        async function swiggyRestoList() {
            const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.97530&lng=77.59100&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`)
            const result = await response.json()
            setOffersInfo(result?.data?.cards[2]?.card?.card)
            setFlatOffersArray(result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
            // setListArray(result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards)
            const menuCards = result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || []
            const itemCardContainer = menuCards.find(card => card?.card?.card?.itemCards)
            setListArray(itemCardContainer?.card?.card?.itemCards || [])
        }
        swiggyRestoList()
    }, [])




    return (
        <div className='resto_sec'>

            <div className='top-sec'>
                <div className='top-card'>
                    <Link to='/'><h5 className='home-heading'>Home /</h5></Link>
                    <h5 className='city-heading'>&nbsp; Banglore /</h5>
                    <h5 className='resto-heading'>&nbsp; {offersInfo?.info?.name}</h5>
                </div>
            </div>

            <div className='middle-sec'>
                <h1 className=''>{offersInfo?.info?.name}</h1>

                <div className='middle-card'>
                    <h4><i className="bi resto-icon bi-star-fill"></i>&nbsp;{offersInfo?.info?.avgRatingString} ({offersInfo?.info?.totalRatingsString}) • {offersInfo?.info?.costForTwoMessage}</h4>
                    <h4 style={{ color: 'RGB(255, 101, 55)', textDecoration: 'underline', cursor: 'pointer' }}>{offersInfo?.info?.cuisines?.join(', ')}</h4>
                    <div className='middle-outlet'>
                        <h4>Outlet &nbsp;&nbsp;</h4>
                        <h4 style={{ color: 'gray', }}>{offersInfo?.info?.areaName}▾</h4>
                    </div>
                    <h4>{offersInfo?.info?.sla?.slaString}</h4>
                </div>
            </div>

            <div className="offers-section">
                <h3>Deals for you</h3>
                <div className='offers-scroller'>
                    {
                        flatOffersArray.map((x)=>{
                            return (
                                <div className='offers-merge'>
                                    <div className='offers'>
                                        <img className='offers-img' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${x?.info?.offerLogo}`} alt=''/>
                                        <div className='offers-text'>
                                            <h3>{x?.info?.header}</h3> 
                                            <h4>{x?.info?.couponCode}</h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        })    
                    }
                </div>
            </div>

            <h4 className='menu-heading'><i className="bi bi-chevron-bar-left"></i><i className="bi bi-three-dots"></i> MENU <i className="bi bi-three-dots"></i><i className="bi bi-chevron-bar-right"></i></h4>
            <Link to='/search'><div className='resto-search'>
                <input className='resto-input' type="text" placeholder='Search for dishes'/>
                <i className="bi bi-search"></i>
            </div></Link>

            <h2 className='cart-heading'> Cart Items: {data.length}</h2>
            <div className='resto-menu'>
                {
                    listArray.map((x)=>{
                        return (
                            <div>
                                <div className='resto-list'>
                                    <div className='resto-list-items'>
                                        <div className="list-text">
                                            <h2>{x?.card?.info?.name}</h2>
                                            <h4><i className="bi bi-currency-rupee"></i>{x?.card?.info?.price/100} <i className="bi resto-menu-icon bi-tag-fill"></i></h4>
                                            <h5><i className="bi resto-menu-icon bi-star-fill"> {x?.card?.info?.ratings?.aggregatedRating?.rating}</i>({x?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</h5>
                                            <p>{x?.card?.info?.description}</p>
                                        </div>
                                        <img className='resto-menu-img' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${x?.card?.info?.imageId}`}  alt=''/>
                                    </div>
                                    <button className='add-btn' onClick={() => {
                                        dispatch(addCart({
                                            restaurant:offersInfo?.info?.name,
                                            area:offersInfo?.info?.areaName,
                                            name: x?.card?.info?.name,
                                            cost: x?.card?.info?.price / 100,
                                            img: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${x?.card?.info?.imageId}`
                                        }));
                                    }}>ADD</button>
                                </div>
                            </div>
                        )
                    })   
                }
            </div>
        </div>
    )
}


export default RestoList



