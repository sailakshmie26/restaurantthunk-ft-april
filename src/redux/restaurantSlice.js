import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API call or asynchronous fn call using Thunk
// The first argument is a combination of the name of slice+/+name of Thunk fn
export const fetchRestaurant = createAsyncThunk('restaurantSlice/fetchRestaurant',()=>{
    const result = axios.get('/restaurant.json').then(response=>response.data);
    console.log("Response from Thunk");
    console.log(result)
    return result;
})

const restaurantSlice = createSlice({
    name:'restaurantSlice',
    initialState:{
        loading: false,    // pending state which means, api call or any asynchronous operation is in progress
        allRestaurant:[],  // resolve stage 
        error:""           // rejected state - return error ; the above 3 are the states in promise.
    },
    extraReducers:(builder)=>{                                        // extraReducers - to provide the functions of thunk.
        builder.addCase(fetchRestaurant.pending,(state)=>{            // pending, fulfilled/resolve, rejected are the states inside promise
            state.loading = true;                                     
            
        })
        builder.addCase(fetchRestaurant.fulfilled,(state, action)=>{
            state.loading = false;
            state.allRestaurant= action.payload;
            state.searchRestaurant = action.payload;
            state.error = ""
        })
        builder.addCase(fetchRestaurant.rejected,(state, action)=>{
            state.loading= false;
            state.allRestaurant=[];
            state.error = action.error.message
        })
    },
    reducers:{
        searchRestaurant:(state,action)=>{
            state.allRestaurant.restaurants = 
            state.searchRestaurant?.restaurants.filter(item=>item.neighborhood.toLowerCase().includes(action.payload))   //toLowercase - to convert the names since it is case sensitive
        }    // creating a different array to store the values so that after the search the allRestaurant array isn't replaced and we can access it.
    }
})

//we are using 3 methods while executing thunk, thunk uses asynchronous operations so we are using promise at the back end.

export default restaurantSlice.reducer;
export const { searchRestaurant} = restaurantSlice.actions;

// Redux is a synchronous operation (executes line by line).
// But api call or file read or write, etc are Asynchronous operations (works in a different thread, executes only after all the synchronous fns). 
// To deal with asynchronous operations in redux, we are using Redux Thunk.
// Thunk is not a part of slice. It is a separate method in redux toolkit.