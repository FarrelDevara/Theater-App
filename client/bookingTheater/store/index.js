import { configureStore } from '@reduxjs/toolkit'
import movies  from './movieSlice'
import tickets from './ticketSlice'

const store = configureStore({
    reducer :{
        movies,tickets
    }
})

export default store