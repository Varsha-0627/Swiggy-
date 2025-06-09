import React from 'react'
import ReactDOM from 'react-dom/client'

function GroupCardsShimmer(){
    const cards=[1,2,3,4,5,6,7,8]
    return(
    <div>
        <h2 className='heading-s-text'></h2>
        <div className='group-card-sec'>
            {
                cards.map((x)=>{
                    return (<div className='group-card'>
                            <div className='group-card-img group-card-img-bg' ></div>
                            <div className='group-card-text'>
                            <h3 className="group-card-s-text"></h3>
                            <h4 className="group-card-s-text"></h4>
                            <p className="group-card-s-text"></p>
                            <p className="group-card-s-text"></p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    )

}

export default GroupCardsShimmer
