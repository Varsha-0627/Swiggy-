import Reac from "react"
import ReactDOM from 'react-dom/client'
import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
import Footer from "./Footer"

function AppLayout(){
    return( <div>
        <Navbar/>
        <Outlet/>
    </div>)
}

export default AppLayout