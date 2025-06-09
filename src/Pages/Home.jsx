import React from 'react'
import ReactDOM from 'react-dom/client'
import ImageScroller from '../components/ImageScroller'
import CardsScroller from '../components/CardsScroller'
import GroupCards from '../components/GroupCards'



function Home(){
    return (
        <div className='home'>
            <ImageScroller/>
            <hr/>
            <CardsScroller/>
            <hr/>
            <GroupCards/>
            <hr/>
        </div>
    )
}

export default Home