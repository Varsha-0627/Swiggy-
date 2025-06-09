import React from "react"
import ReactDOM from 'react-dom/client'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Navbar() {
    const data=useSelector((store)=>{
        return store.cartStore
    })

    return (
        <div className='navbar' >
            <div className="navbar-logo-sec">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACgAKAMBEQACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAABgMEBwH/xAAqEAABAwIEBQMFAAAAAAAAAAABAgMRAAQFEyExBxIUcZEVMlEiQUJSgf/EABsBAAMBAAMBAAAAAAAAAAAAAAAFBgMBAgQH/8QAKhEAAQQABAQFBQAAAAAAAAAAAgABAxEEBRIxEyFBcRQyUWHwBiKxwdH/2gAMAwEAAhEDEQA/AI6iV9KXdzA3rlCv+iYrk5vpt3yRM5RnxvW/hJ6vQ68vjsLq08Rr7qhsYO4rBepcrhCKEJ54c4Uy4h7E3kBS0Ly2ZHt0BJ76x5p3lMAuzyvvsyms+xRs7QC/Krf+J0euC3d27ISCHeaT8QJpw5UTN6qeENQEXpSSuI+GW7QYxFoJQ64vLcA059CQruIj+ik+bQCzNK2+yochxJk5QFzZmtvZI9JFSooQnzhrfoy7rDlqAXzZzYJ3BAB8QPNPcolbSUb91MfUGHfUMzbbP+k5XVnbXYSLllDoQZTzCYpsQCfma0gjlOPyPSQeINvhto7as2ls23cqBW4pP67AHuZ8UkzUYg0sLc1T5Gc8jERlY7N3+flJ9J0/RQhS2roYuWnlNIeShYUW1iUqHwa7xkwExO1rpKDmDiz1fValaOYTZ2SsctEssWirf6ktNhMmdjH5TpHzVOBQRhxwphpRMg4mWTwsluV9X+cuqzLFL53E7968f97qpidEj7AdhU3PMU0jmXVWeGw44eJoh6KrWK2RQhFCFN1T/SdJmr6fnzMudOaImtOKejRfJZ8GPicWvuqr9lDWa0RQhf/Z" alt="SWIGGY" />
            </div>
            <ul className="navbar-item-sec">
                <Link><li className="navbar-item-sec-item"><i className="bi bi-tv"></i> Swiggy Corporate</li></Link>
                <Link to='/search'><li className="navbar-item-sec-item"><i className="bi bi-search"></i> Search</li></Link>
                <Link to='/offers'><li className="navbar-item-sec-item"><i className="bi bi-percent"></i> Offers</li></Link>
                <Link to='/help'><li className="navbar-item-sec-item"><i className="bi bi-question-circle"></i> Help</li></Link>
                <Link to='/cart'><li className="navbar-item-sec-item"><i className="bi bi-cart-plus"></i> Cart {data.length}</li></Link>
            </ul>
        </div>)
}

export default Navbar
