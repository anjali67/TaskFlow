import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData,{rejectWithValue}) => {
        try {
            const response = await axios.post('http://192.168.156.74:5002/auth/signup',userData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Registration failed')
        }
    }
)

const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:false,
        error:null,
        userData:null,
        token:null
    },
    reducers:{
        clearError: (state) => {
            console.log("CLEAR ERROR CALLING ",state)
            state.error = null;
          },
    },
    extraReducers:(builder) => {
        builder
        .addCase(registerUser.pending,(state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(registerUser.fulfilled, (state,action) => { 
             state.userData = action.payload.user,
             state.loading = false,
             state.token = action.payload.token
        })
        .addCase(registerUser.rejected, (state,action) => {
             state.loading = false
             state.error = action.payload || 'Registerd Failed'
        })
    }
})

export const { clearError } = authSlice.actions;
export default authSlice.reducer