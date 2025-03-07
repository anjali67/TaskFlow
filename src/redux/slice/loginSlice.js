import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utills/api";
import axios from "axios";
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`,userData)
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || 'Registered failed')
        }
    }       
)

const loginSlice = createSlice({
    name:'login',
    initialState:{
        token:null,
        loading:false,
        error:null,
        user:null,
    },
    reducers:{
        setToken: (state, action) => {
            state.token = action.payload;
          },
        clearError:(state) => {
            state.error = null
        },
        logOutUser: (state) => {
            state.user = null
            state.token = null
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending,(state) => {
            state.pending = true,
            state.error = null
        })
        .addCase(loginUser.fulfilled,(state,action) => {
            state.loading = false
            state.token = action.payload.token,
            state.user = action.payload
        })
        .addCase(loginUser.rejected,(state,action) => {
            state.loading = false
            state.error = action.payload || 'Register failed'
        })
    }
})

export const {setToken,clearError,logOutUser} = loginSlice.actions
export default loginSlice.reducer