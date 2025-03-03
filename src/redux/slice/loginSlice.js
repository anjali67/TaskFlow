import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://192.168.156.74:5002/auth/login',userData)
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || 'Registered failed')
        }
    }       
)

const loginSlice = createSlice({
    name:'login',
    initialState:{
        loading:false,
        error:null,
        user:null,
    },
    reducers:{
        clearError:(state) => {
            console.log("CLEARED ERROR CALL")
            state.error = null
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending,(state) => {
            console.log("PENDING CALL",state)
            state.pending = true,
            state.error = null
        })
        .addCase(loginUser.fulfilled,(state,action) => {
            console.log("Fulfiield call",state,action)
            state.loading = false
            state.user = action.payload
        })
        .addCase(loginUser.rejected,(state,action) => {
            console.log("Rejected call",state,action)
            state.loading = false
            state.error = action.payload || 'Register failed'
        })
    }
})

export const {clearError} = loginSlice.actions
export default loginSlice.reducer