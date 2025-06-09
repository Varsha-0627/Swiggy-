import React from 'react'
import ReactDOM from 'react-dom/client'
import AppLayout from './components/AppLayout'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import Search from './Pages/Search'
import Biryani from './Pages/Biryani'
import Dosa from './Pages/Dosa'
import Offers from './Pages/Offers'
import Help from './Pages/Help'
import Cart from './Pages/Cart'
import PageNotFound from './Pages/PageNotFound'
import RestoList from './components/RestoList'




function App(){
    return ( <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout/>}>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/search' element={<Search/>}>
                        <Route path='/search/biryani' element={<Biryani/>}></Route>
                        <Route path='/search/dosa' element={<Dosa/>}></Route>
                    </Route>
                    <Route path='/offers' element={<Offers/>}></Route>
                    <Route path='/help' element={<Help/>}></Route>
                    <Route path='/cart' element={<Cart/>}></Route>
                    <Route path='/resto-list/:id' element={<RestoList/>}></Route>
                </Route>
               
                <Route path='*' element={<PageNotFound/>}></Route>

            </Routes>
        </BrowserRouter>
    </div>)
}

export default App