import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import { Jobs } from "@/components/Jobs";
import jobSlice from "./jobSlice"

const store = configureStore({
    reducer:{
    
        auth: authSlice,
        job:jobSlice,        
    }
});

export default store