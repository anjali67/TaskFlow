const { configureStore } = require("@reduxjs/toolkit");
import authReducer from '../slice/registerSlice'
import loginReducer from '../slice/loginSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        login:loginReducer
    }
})