import React from 'react'
import ReactDOM from 'react-dom/client'

function CardShimmer(){
    const cards=[1,2,3,4,5,6,7,8]   
    return(
    <div>
        <h2 className='heading-s-text'></h2>
        <div className='card-scroller-sec'>
            {
                cards.map((x)=>{
                    return (<div className='card'>
                        <div className='card-img card-img-bg'> </div>
                        <div className="card-text">
                            <h3 className='s-text'></h3>
                            <h4 className='s-text'></h4>
                            <p className='s-text'></p>
                            <p className='s-text'></p>
                        </div>
                    </div>)
                })
            }
        </div>
    </div>
    )

}

export default CardShimmer