import React from "react"
import ReactDOM from 'react-dom/client'
import { Outlet, Link } from "react-router-dom"

function Search() {
    return (
        <div>
            <h1>This is Search</h1>
            <Link to='/search/biryani'><li>Biryani</li></Link>
            <Link to='/search/dosa'><li>Dosa</li></Link>
            <Outlet/>
            <h1>This is Search Footer</h1>
        </div>
    )
}

export default Search
