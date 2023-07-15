import {configureStore} from "@reduxjs/toolkit"
import YoutubeSlice from "./reducers/YoutubeSlice.jsx"
export default configureStore({
    reducer:{
        youtube:YoutubeSlice
    }
})