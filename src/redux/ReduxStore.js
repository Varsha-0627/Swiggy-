import {configureStore} from '@reduxjs/toolkit'
import cart from './ReduxSlice'


const store=configureStore({

    reducer:{
        cartStore:cart
    }


})

export default store